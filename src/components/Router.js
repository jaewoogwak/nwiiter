import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact={true} path={"/"} element={<Home />}>
                        </Route>
                    </>
                ) : (
                    <Route exact={true} path={"/"} element={<Auth />}>
                    </Route>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;