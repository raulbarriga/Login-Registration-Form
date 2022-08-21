import express from "express";
import multer from "multer";

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
// it'll be /users/register etc.
router.post("/register", registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, upload.single("pic"), updateUserProfile);

export default router;
