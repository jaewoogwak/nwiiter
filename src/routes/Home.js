import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "fbase";
import { storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import {
  addDoc,
  getDocs,
  collection,
  onSnapshot,
  where,
  orderBy,
  query,
  doc,
} from "firebase/firestore";
import { v4 } from "uuid";

import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      // 파일 참조 경로 만들기
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      //storage 참조 경로로 파일 업로드 하기
      const uploadFile = await uploadString(fileRef, attachment, "data_url");
      console.log(uploadFile);
      // storage에 있는 파일 URL로 다운로드 받기
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }

    // 트윗할 때, 메시지와 사진도 같이 firestore에 생성
    const nweetPosting = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    if (attachmentUrl !== "") console.log(attachmentUrl);
    const docRef = await addDoc(collection(dbService, "nweets"), nweetPosting);
    setNweet("");
    setAttachment("");

    // try {
    //   const docRef = await addDoc(collection(dbService, "nweets"), {
    //     text: nweet,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  };

  const onChange = (event) => {
    const { value } = event.target;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const { files } = event.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      console.log(result);
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
    console.log(theFile);
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      //where(),
      orderBy("createdAt")
    );
    onSnapshot(q, (snapShot) => {
      const nweetArr = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          autoFocus
        />
        <input type="submit" value="nweet" />
        <div>
          <input
            type="file"
            //value={file}
            onChange={onFileChange}
            accept="image/*"
          />
        </div>
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        nweets
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            // attachmentUrl={attachmentUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
