import React, { createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  register,
  logIn,
  getUserProfile,
  updateUserProfile,
} from "../api/index";
import { withRouter } from "../hooks/withRouter";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  // const [propertiesPerPage, setPropertiesPerPage] = useState(12);
  const [userDetails, setUserDetails] = useLocalStorage(
    "profile",
    JSON.stringify({})
  );

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("profile"));
    if (userInfo) {
      setUserDetails((prevState) => ({ ...prevState }));
    }
    
  }, []);

  const signUp = async (formData, navigate) => {
    try {
      const data = await register(formData);
      console.log("context signup userInfo data: ", data);

      setUserDetails(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (formData, navigate) => {
    try {
      const data = await logIn(formData);
      console.log("context signin data: ", data);

      setUserDetails(data);
      navigate("/todos");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async (id) => {
    try {
      const data = await getUserProfile(id);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetails = async (user) => {
    try {
      const data = await updateUserProfile(user);

      // return data;
      setUserDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, updateUserDetails, fetchUserDetails, userDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthProvider);
