import { authService } from "fbase";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
