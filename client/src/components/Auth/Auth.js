import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";
import { withRouter } from "../../hooks/withRouter";
import "./Auth.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const Auth = () => {
  const navigate = useNavigate();

  const { signUp, signIn } = useContext(AuthContext);

  const [form, setForm] = useState(initialState);
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsRegisterScreen((prevIsRegistered) => !prevIsRegistered);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // can also pass in a 2nd argument to send the history which allows to change the page to something else after submitting
    if (isRegisterScreen) {
      // check if password & confirm passwords match when registering, if they do submit
      if (initialState.password !== initialState.confirmPassword) {
        // check where to display this message
        setMessage("Passwords do not match");
      } else {
        // submit registration
        signUp(form, navigate);
      }
    } else {
      // submit login form here
      // console.log("form: ", form);
      signIn(form, navigate);
    }
  };

  //
  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log("on change form: ", form);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {isRegisterScreen && (
            <>
              <label htmlFor="First-Name">First Name</label>
              <input
                name="firstName"
                id="First-Name"
                onChange={handleChange}
                // autoFocus
              />
              <label htmlFor="Last-Name">Last Name</label>
              <input name="lastName" id="Last-Name" onChange={handleChange} />
            </>
          )}
          <label htmlFor="Email-Address">Email Address</label>
          <input
            name="email"
            id="Email-Address"
            onChange={handleChange}
            type="email"
          />
          <label htmlFor="Password">Password</label>
          <input
            name="password"
            id="Password"
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            // handleShowPassword={handleShowPassword}
          />

          {isRegisterScreen && (
            <>
              <label htmlFor="Password">Confirm Password</label>
              <input
                name="confirmPassword"
                label="Repeat Password"
                onChange={handleChange}
                type="password"
              />
            </>
          )}

          <button type="submit">
            {isRegisterScreen ? "Register" : "Log In"}
          </button>
        </form>
        <button onClick={switchMode}>
          {isRegisterScreen
            ? "Already have an account? Log In"
            : "Don't have an account? Register"}
        </button>
      </div>
    </>
  );
};

export default withRouter(Auth);
