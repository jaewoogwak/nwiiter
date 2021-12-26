import React, { useEffect } from "react";
import AppRouter from "components/Router";
import { useState } from "react";
import { authService } from "fbase";
import { updateProfile } from "@firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        if (user.displayName === null) {
          await updateProfile({
            displayName: "some user",
          });
        }
        setIsLoggedIn(true);
        setUserObj(user);
        console.log(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer> &copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
