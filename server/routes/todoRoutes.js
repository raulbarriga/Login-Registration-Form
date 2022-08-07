import express from "express";

import {
  getUserTodos,
  createUserTodos,
  editUserTodos,
  deleteUserTodos,
} from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// add protect middleware to only access them if user has authorization
router.route("/").get(protect, getUserTodos).post(protect, createUserTodos);

// fetch individually user by user
router
  .route("/:id")
  .get(protect, getUserTodos)
  .patch(protect, editUserTodos)
  .delete(protect, deleteUserTodos);

export default router;
