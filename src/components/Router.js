import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";
import Test from "routes/Test";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact={true} path={"/"} element={<Home />}></Route>
            <Route exact={true} path={"/profile"} element={<Profile />}></Route>
            <Route exatc={true} path={"/test"} element={<Test />}></Route>
            <Route exact={true} path={"/"}></Route>
          </>
        ) : (
          <>
            <Route exact={true} path={"/"} element={<Auth />}></Route>
            <Route exact={true} path={"/"}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
