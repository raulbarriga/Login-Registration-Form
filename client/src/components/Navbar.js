import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { withRouter } from "../hooks/withRouter";
import { AuthContext } from "../contexts/authContext";

const Navbar = () => {
  const { userDetails, logout } = useContext(AuthContext);

  return (
    <>
      {userDetails && Object.keys(userDetails).length !== 0 ? (
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
