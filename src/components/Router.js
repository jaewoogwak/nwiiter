import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";
import Test from "routes/Test";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                exact={true}
                path={"/"}
                element={<Home userObj={userObj} />}
              ></Route>
              <Route
                exact={true}
                path={"/profile"}
                element={
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                }
              ></Route>
              <Route exatc={true} path={"/test"} element={<Test />}></Route>
              {/* <Route exact={true} path={"/"}></Route> */}
            </>
          ) : (
            <>
              <Route exact={true} path={"/"} element={<Auth />}></Route>
              <Route exact={true} path={"/"}></Route>
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
