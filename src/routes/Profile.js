import { authService, dbService } from "fbase";
import { collection, where, query, getDocs, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", `${userObj.uid}`),
      orderBy("createdAt")
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.id, "=> ", doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const { value } = event.target;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
      // setProfileName(newDisplayName);
    }
  };
  return (
    <>
      <h1>{userObj.displayName}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
