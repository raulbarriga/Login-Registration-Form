import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Profile = () => {
  const { updateUserDetails, userDetails } = useContext(AuthContext);

  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // pic: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  //   const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    // we first check if the user is logged in
    if (!userDetails) {
      navigate("/auth");
    } else {
      // populate firstName, lastName & email from localStorage user info
      setUpdatedUserInfo((prevState) => ({
        ...prevState,
        firstName: userDetails.name.split(" ")[0],
      }));
      setUpdatedUserInfo((prevState) => ({
        ...prevState,
        lastName: userDetails.name.split(" ")[1],
      }));
      setUpdatedUserInfo((prevState) => ({
        ...prevState,
        email: userDetails.email,
      }));
      // setUpdatedUserInfo((prevState) => ({
      //   ...prevState,
      //   pic: userDetails.pic,
      // }));
    }
  }, [navigate, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // if (updatedUserInfo.pic) {
    //   formData.append("file", updatedUserInfo.pic);
    //   formData.append("fileName", updatedUserInfo.pic.name);
    //   console.log("form data variable: ", formData);
    // }

    if (updatedUserInfo.password !== updatedUserInfo.confirmPassword) {
      setMessage("Passwords do not match");
      setSuccess(false);
    } else {
      updateUserDetails({ id: userDetails._id, ...updatedUserInfo });
      setMessage(null);
      setSuccess(true);
      setUpdatedUserInfo((prevState) => ({
        ...prevState,
        password: "",
      }));
      setUpdatedUserInfo((prevState) => ({
        ...prevState,
        confirmPassword: "",
      }));
    }
  };

  // e.target.name === "pic" ? e.target.files[0] :
  const handleChange = (e) =>
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [e.target.name]: e.target.value,
    });

  return (
    <div className="profile-wrapper">
      <h2>User Profile</h2>
      Name: {updatedUserInfo.firstName} {updatedUserInfo.lastName}
      <br />
      Email: {updatedUserInfo.email}
      <br />
      {message && <span>{message}</span>}
      <br />
      {success && <span>Profile Updated</span>}
      <br />
      {/* <img src={updatedUserInfo.pic} alt="profile-img" /> */}
      <form onSubmit={submitHandler}>
        <label htmlFor="First-Name">First Name</label>
        <input
          name="firstName"
          value={updatedUserInfo.firstName}
          id="First-Name"
          onChange={handleChange}
        />
        <label htmlFor="Last-Name">Last Name</label>
        <input
          name="lastName"
          id="Last-Name"
          value={updatedUserInfo.lastName}
          onChange={handleChange}
        />
        <label htmlFor="Email-Address">Email Address</label>
        <input
          name="email"
          id="Email-Address"
          value={updatedUserInfo.email}
          onChange={handleChange}
          type="email"
        />
        <label htmlFor="Password">Password</label>
        <input
          name="password"
          id="Password"
          value={updatedUserInfo.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          // handleShowPassword={handleShowPassword}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          name="confirmPassword"
          id="confirmPassword"
          value={updatedUserInfo.confirmPassword}
          onChange={handleChange}
          type="password"
        />
        {/* <label htmlFor="user-img">User Image</label>
        <input
          name="pic"
          id="user-img"
          // value={updatedUserInfo.pic}

          onChange={handleChange}
          type="file"
          // alt="profile-image"
        /> */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Profile;
