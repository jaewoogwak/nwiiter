import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService } from "fbase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import AuthForm from "components/AuthForm";

const Auth = () => {
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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
