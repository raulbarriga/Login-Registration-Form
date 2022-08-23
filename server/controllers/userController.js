import bcrypt from "bcryptjs";
import imagemin from "imagemin";
import mozjpeg from "imagemin-mozjpeg";
import isJpg from "is-jpg";
import sharp from "sharp";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { connectToS3 } from "../utils/s3.js";

const bucketName = process.env.BUCKET_PROJECT_NAME;

// Description: Register a new user
// Route: POST /users/register
// Access: Public
const registerUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  console.log("server registration req.body: ", req.body);
  // console.log("server registration req.file: ", req.files);
  // console.log("server registration body parsed: ", JSON.parse(req.body));
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
      // pic: user.pic
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Description: Update user profile
// Route: PUT /users/profile
// Access: Private
const updateUserProfile = async (req, res) => {
  // const { firstName, lastName, email, password, id } = req.body;
  // pic was the whole file object, but the actual image is buffer
  console.log("req.body: ", req.body);
  console.log("req.file: ", req.file);
  // const { originalname, buffer, mimetype } = req.file;


  /*
  // get user by id from the frontend request
  // const user = await User.findById(id);
  if (user) {
    //************** image logic (only if user is found) **************
    // modify/edit image here using buffer
    const convertToJpg = async (input) => {
      if (isJpg(input)) {
        return input;
      }
      const buffer = sharp(input).jpeg().toBuffer();

      return buffer;
    };

    const miniBuffer = await imagemin.buffer(buffer, {
      plugins: [convertToJpg, mozjpeg({ quality: 85 })],
    });

    // key is the image's name (pass unique names to not overwrite same file name), but we choose to overwrite to not have unused stored images
    // `${originalname}'-'${Date.now() + Math.random()}` // unique name
    const params = {
      Bucket: bucketName,
      Key: originalname,
      Body: miniBuffer,
      ContentType: mimetype,
    };
    const command2 = new PutObjectCommand(params);
    // sends the file to the s3 bucket
    await connectToS3.send(command2);

    // now that the file's stored we can get its url
    const getObjectParams = {
      Bucket: bucketName,
      Key: originalname,
    };

    const command1 = new GetObjectCommand(getObjectParams);
    // pass this url to user.pic
    // expiresIn is in seconds, 3600 is 1hr
    const url = await getSignedUrl(connectToS3, command1, { expiresIn: 3600 });
    // ************************************************

    // if any of these are not in the requested update, then the defaults will remain (i.e. user.name, etc.)
    user.name = firstName && lastName ? `${firstName} ${lastName}` : user.name;
    user.email = email || user.email;
    user.pic = url || user.pic; // pass the s3 url or leave the default
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
      pic: updatedUser.pic,
      token: generateToken(updatedUser.email, updatedUser._id),
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
  */
  res.status(200).json({ message: "file sent" });
};
// to see a delete request for an s3 bucket file if a user wants to delete their own account (@35 minutes): https://www.youtube.com/watch?v=eQAIojcArRY&list=PL0X6fGhFFNTeGDRuMlQBO1fs4vvQA48tM&index=2

export { authUser, registerUser, getUserProfile, updateUserProfile };
