import React, { useEffect, useState } from "react";

// todo: maybe prefill name fields for user (see Task component)
const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  //   const handleShowPassword = () => setShowPassword(!showPassword);
  //   useEffect(() => {
  //     first;

  //     return () => {
  //       second;
  //     };
  //   }, [third]);
  const submitHandler = (e) => {
    e.preventDefault();

    if (userInfo.password !== userInfo.confirmPassword) {
      setMessage("Passwords do not match");
      setSuccess(false);
    } else {
        // need to send any/all changes
        // moving to the backend to set up the work there too
      setSuccess(true);
    }
  };
  const handleChange = (e) =>
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  return (
    <div className="profile-wrapper">
      <h2>User Profile</h2>
      Name: {userInfo.firstName} {userInfo.lastName}
      Email: {userInfo.email}
      {message && <span>{message}</span>}
      {success && <span>Profile Updated</span>}
      <form onSubmit={submitHandler}>
        <label htmlFor="First-Name">First Name</label>
        <input
          name="firstName"
          value={userInfo.firstName}
          id="First-Name"
          onChange={handleChange}
        />
        <label htmlFor="Last-Name">Last Name</label>
        <input
          name="lastName"
          id="Last-Name"
          value={userInfo.lastName}
          onChange={handleChange}
        />
        <label htmlFor="Email-Address">Email Address</label>
        <input
          name="email"
          id="Email-Address"
          value={userInfo.email}
          onChange={handleChange}
          type="email"
        />
        <label htmlFor="Password">Password</label>
        <input
          name="password"
          id="Password"
          value={userInfo.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          // handleShowPassword={handleShowPassword}
        />
        <label htmlFor="Password">Confirm Password</label>
        <input
          name="confirmPassword"
          label="Repeat Password"
          value={userInfo.confirmPassword}
          onChange={handleChange}
          type="password"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Profile;
