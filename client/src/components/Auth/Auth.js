import React, { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isRegistered, setIsRegistered] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsRegistered((prevIsRegistered) => !prevIsRegistered);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistered) {
      //   dispatch(signup(form, history));
    } else {
      //   dispatch(signin(form, history));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={handleSubmit}>
      {isRegistered && (
        <>
          <input
            name="firstName"
            label="First Name"
            handleChange={handleChange}
            // autoFocus
          />
          <input
            name="lastName"
            label="Last Name"
            handleChange={handleChange}
          />
        </>
      )}

      <input
        name="email"
        label="Email Address"
        handleChange={handleChange}
        type="email"
      />
      <input
        name="password"
        label="Password"
        handleChange={handleChange}
        type={showPassword ? "text" : "password"}
        handleShowPassword={handleShowPassword}
      />

      {isRegistered && (
        <input
          name="confirmPassword"
          label="Repeat Password"
          handleChange={handleChange}
          type="password"
        />
      )}

      <button type="submit">{isRegistered ? "Register" : "Log In"}</button>

      <button onClick={switchMode}>
        {isRegistered
          ? "Already have an account? Log In"
          : "Don't have an account? Register"}
      </button>
    </form>
  );
};

export default Auth;
