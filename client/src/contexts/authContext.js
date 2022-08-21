import React, { createContext, useEffect, useState } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";
import {
  register,
  logIn,
  getUserProfile,
  updateUserProfile,
} from "../api/index";
import { withRouter } from "../hooks/withRouter";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});

  console.log(userDetails);
  useEffect(() => {
    async function init() {
      if (localStorage.getItem("profile")) {
        const data = await localStorage.getItem("profile");
        setUserDetails(JSON.parse(data));
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (Object.keys(userDetails).length !== 0)
      localStorage.setItem("profile", JSON.stringify(userDetails));
  }, [userDetails]);

  const signUp = async (formData, navigate) => {
    try {
      const data = await register(formData);
      console.log("context signup userInfo data: ", data);

      setUserDetails(data);
      localStorage.setItem("profile", JSON.stringify(userDetails));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (formData, navigate) => {
    try {
      console.log("formData: ", formData);
      const data = await logIn(formData);
      console.log("context signin data: ", data);

      setUserDetails(data);
      localStorage.setItem("profile", JSON.stringify(data));
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
      localStorage.setItem("profile", JSON.stringify(userDetails));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        updateUserDetails,
        fetchUserDetails,
        userDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthProvider);
