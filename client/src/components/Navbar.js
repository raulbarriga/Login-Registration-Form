import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { withRouter } from "../hooks/withRouter";
import { AuthContext } from "../contexts/authContext";

const Navbar = () => {
  const { userDetails } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/auth");

    localStorage.removeItem("profile");
  };

  useEffect(() => {
    const token = userDetails?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    // setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      {userDetails ? (
        <div>
          <span>
            <h6>{userDetails.name}</h6>
          </span>
          <button onClick={logout}>Logout</button>
          <Link to="todos">Todos</Link>
          <Link to="home">Home</Link>
          <Link to="profile">Profile</Link>
        </div>
      ) : (
        <Link to="/auth">Sign In</Link>
      )}
    </>
  );
};

export default withRouter(Navbar);
