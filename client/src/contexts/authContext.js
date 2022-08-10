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
  // () => {
  //   const localData = localStorage.getItem("profile");
  //   return localData ? JSON.parse(localData) : {};
  // }

  // useLocalStorage("profile", "");
  // JSON.stringify({})

  // console.log(localStorage.getItem("profile"));
  // useEffect(() => {
  //   // if (localStorage.getItem("profile")) {
  //     const userInfo = JSON.parse(localStorage.getItem("profile"));

  //     // (prevState) =>
  //     setUserDetails(userInfo);
  //   // }
  // }, [userDetails]);

  /*
if (localStorage.getItem("profile")) {
      const userInfo = JSON.parse(localStorage.getItem("profile"));
      // if (userInfo) {
        // (prevState) => 
      setUserDetails(({ ...userDetails, profile: userInfo }));

      // }
    }

  */

  const signUp = async (formData, navigate) => {
    try {
      const data = await register(formData);
      console.log("context signup userInfo data: ", data);

      setUserDetails(data);
      // localStorage.setItem("profile", data);
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
      // localStorage.setItem("profile", data);
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
      // localStorage.setItem("profile", data);
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
