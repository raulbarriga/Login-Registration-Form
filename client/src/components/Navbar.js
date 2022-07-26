import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { withRouter } from "../hooks/withRouter";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/auth");

    setUser(null);
    localStorage.removeItem("profile")
  };
console.log("navbar user: ", user)
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      {user ? (
        <div>
          <span>
            <h6>{user.name}</h6>
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/auth">Sign In</Link>
      )}
    </>
  );
};

export default withRouter(Navbar);
