import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "fbase";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { onIdTokenChanged } from "firebase/auth";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        nweet,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setNweet("");
  };
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    dbNweets.forEach((doc) => {
      const nweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
      console.log(doc.data());
    });
  };
  const onChange = (event) => {
    const { value } = event.target;
    setNweet(value);
  };

  useEffect(() => {
    getNweets();
  }, []);
  // fadsdsafffdsasda
  console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="nweet" />
      </form>
      <div>
        nweets
        {nweets.map((v) => (
          <div key={v.id}>{v.nweet}</div>
        ))}
      </div>
    </div>
  );
};
export default Home;
