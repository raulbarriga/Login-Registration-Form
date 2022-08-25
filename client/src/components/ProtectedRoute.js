// for react-router v6, source: https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

export const ProtectedRoute = ({ children }) => {
  const { userDetails } = useContext(AuthContext);

  if (!userDetails) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
