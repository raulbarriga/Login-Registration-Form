import express from "express";
import { authUser, registerUser } from "../controllers/userController.js";

const router = express.Router();
// it'll be /users/register etc.
router.post("/register", registerUser);
router.post("/login", authUser);

export default router;
