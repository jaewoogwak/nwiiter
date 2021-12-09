import React from "react";
import { useState } from "react";
import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
// import google_provider from "fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        console.log("create new account mode ", data);
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
        console.log("log in mode", data);
      }
    } catch (error) {
      setError(error.message);
      // console.log(error.message);
    }
  };

  const onToggleChange = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = (event) => {
    const { name } = event.target;
    console.log(name);
    if (name === "google") {
      //google
      let google_provider = new GoogleAuthProvider();
      console.log("google_provider : ", google_provider);
      signInWithPopup(authService, google_provider).then((result) => {
        const user = result.user;
        console.log("user : ", user);
      });
    } else if (name === "github") {
      // github
      let github_provider = new GithubAuthProvider();
      console.log("github_provider : ", github_provider);
      signInWithPopup(authService, github_provider).then((result) => {
        const user = result.user;
        console.log("user : ", user);
      });
    }
  };

  return (
    <div>
      <p> Error message : {error}</p>
      <button onClick={onToggleChange}>
        {newAccount ? "-> Sign In" : "-> Create Account"}
      </button>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
      </form>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
