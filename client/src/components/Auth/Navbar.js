import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    history.push("/auth");

    setUser(null);
  };

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
      {user?.result ? (
        <div>
          <span>
            <h6>{user?.result.name}</h6>
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/auth">Sign In</Link>
      )}
    </>
  );
};

export default Navbar;
