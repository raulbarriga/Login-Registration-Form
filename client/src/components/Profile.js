import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Profile = () => {
  const { updateUserDetails, userDetails, fetchUserDetails } =
    useContext(AuthContext);

  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // password: "",
    // confirmPassword: "",
    // pic: "",
  });
  const [image, setImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  //   const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    // we first check if the user is logged in
    if (!userDetails.token) {
      navigate("/auth");
    } else {
      // if (!userDetails.name) {
      //   fetchUserDetails(userDetails._id);
      // } else {
      console.log("for populating userDetails: ", userDetails);
      // populate firstName, lastName & email from localStorage user info
      // ***********************
      // setUpdatedUserInfo((prevState) => ({
      //   ...prevState,
      //   firstName: userDetails?.name.split(" ")[0],
      // }));
      // setUpdatedUserInfo((prevState) => ({
      //   ...prevState,
      //   lastName: userDetails?.name.split(" ")[1],
      // }));
      // setUpdatedUserInfo((prevState) => ({
      //   ...prevState,
      //   email: userDetails?.email,
      // }));
      // **********************
      // setUpdatedUserInfo((prevState) => ({
      //   ...prevState,
      //   pic: userDetails?.pic,
      // }));
      // }
    }
  }, [navigate, userDetails]);

  const submitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(updatedUserInfo)) {
      // if (key === "pic") {
      //   formData.append(JSON.stringify(key), value, "pic");
      // }
      formData.append(JSON.stringify(key), value);
    }

    formData.append("userId", userDetails._id);
    formData.append("pic", image);

    /* 
    // to console log formData
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    */
    console.log("...formData: ", ...formData);
    console.log("type formData: ", typeof formData);

    if (updatedUserInfo.password !== updatedUserInfo.confirmPassword) {
      setMessage("Passwords do not match");
      setSuccess(false);
    } else {
      updateUserDetails(formData);
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

  const handleChange = (e) => {
    // e.target.name === "pic" ? e.target.files[0] : 
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [e.target.name]:
        e.target.value,
    });
    console.log("updatedUserInfo.pic onChange: ", updatedUserInfo);
  };

  return (
    <div
      className="profile-wrapper"
      style={{ backgroundColor: "#1d1313", color: "white" }}
      enctype="multipart/form-data"
    >
      <h2>User Profile</h2>
      Name: {updatedUserInfo.firstName} {updatedUserInfo.lastName}
      <br />
      Email: {updatedUserInfo.email}
      <br />
      <img
        style={{ height: "200px", borderRadius: "50%" }}
        // src={
        //   updatedUserInfo.pic instanceof File
        //     ? userDetails.pic
        //     : updatedUserInfo.pic
        // }
        src={userDetails.pic}
        onError={({ currentTarget }) => {
          // source: https://stackoverflow.com/a/48222599/13463953
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = userDetails.pic;
        }}
        alt="user"
      />
      <br />
      {message && <span>{message}</span>}
      <br />
      {success && <span>Profile Updated</span>}
      <br />
      {/* <img src={updatedUserInfo.pic} alt="profile-img" /> */}
      <form onSubmit={submitHandler}>
        <label htmlFor="user-img">User Image</label>
        <input
          name="pic"
          id="user-img"
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          // alt="profile-image"
        />
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
