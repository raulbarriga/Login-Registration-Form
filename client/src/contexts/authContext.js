import React, { createContext, useState } from "react";
import { register, logIn } from "../api/index";
import { withRouter } from "../hooks/withRouter";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  // const [propertiesPerPage, setPropertiesPerPage] = useState(12);

  const signUp = async (formData, navigate) => {
    try {
      const data = await register(formData);
      console.log("context signup data: ", data);

      localStorage.setItem("profile", JSON.stringify(data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (formData, navigate) => {
    try {
        const data = await logIn(formData);
        console.log("context signin data: ", data);

        localStorage.setItem("profile", JSON.stringify(data));
        navigate('/');
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthProvider);
