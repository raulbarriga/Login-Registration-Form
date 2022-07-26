import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// Description: Register a new user
// Route: POST /users/register
// Access: Public
const registerUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
console.log("server registration body: ", req.body);

  // Check if email already exists
  const userExists = await User.findOne({
    email,
  });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: `${firstName} ${lastName}`,
    email,
    password: hashedPassword,
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
    res.status(400);
    throw new Error("Invalid user data");
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
    res.status(401);

    throw new Error("Invalid email or password");
  }
};

export { authUser, registerUser };
