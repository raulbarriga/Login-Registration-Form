import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Description: Register a new user
// Route: POST /users/register
// Access: Public
const registerUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  // Check if email already exists
  const userExists = await User.findOne({
    email,
  });
  if (userExists) {
    res.status(400).json({ message: "User already exists." });
  }

  // don't need this anymore since the .pre("save") method
  // hash password
  // const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: `${firstName} ${lastName}`,
    email,
    password,
  });

  // logs the user in by generating a jwt token
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.email, user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Description:
// 1st) Authenticate the user
// 2nd) Send back a data token to save on the client (used to access protected routes)
// Route: POST /users/login
// Access: Public
const authUser = async (req, res) => {
  //1st) get data from the body via Postman to mimic sending a form
  //The JSON email & password on the Postman body'll be received here via req.body
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  // if user is first not found, throws error, otherwise compares passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.email, user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Description: Get user profile
// Route: GET /users/profile
// Access: Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Description: Update user profile
// Route: PUT /users/profile
// Access: Private
const updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, password, id } = req.body;

  // get user by id from the frontend request
  const user = await User.findById(id);
  if (user) {
    // if any of these are not in the requested update, then the defaults will remain (i.e. user.name, etc.)
    user.name = firstName && lastName ? `${firstName} ${lastName}` : user.name;
    user.email = email || user.email;
    // if a password change was sent from the frontend
    if (password) {
      user.password = password;
    }

    // run the .pre("save",...) function to hash the password anytime we use .save() from mongoose/mongodb
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser.email, updatedUser._id),
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export { authUser, registerUser, getUserProfile, updateUserProfile };
