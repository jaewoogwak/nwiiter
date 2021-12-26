import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">My profile</Link>
      </li>
      <li>
        <Link to="/test">test</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
