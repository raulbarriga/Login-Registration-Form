import mongoose from "mongoose";
import Todo from "../models/todoModel.js";

export const getUserTodos = async (req, res) => {
  try {
    // get todos list based on each signed up user
    const todos = await Todo.find({ user: req.user._id });
    // console.log("user's todos in the backend:", todos);
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUserTodos = async (req, res) => {
  const todo = req.body; // the whole todo
  const { _id } = req.user;

  const newTodo = new Todo({ ...todo, user: _id });
  // console.log("new todo: ", newTodo);

  try {
    await newTodo.save();
    // console.log("new todo: ", typeof newTodo);
    //status 201 = new creation successful
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editUserTodos = async (req, res) => {
  const { id: _id } = req.params;
  const todo = req.body; // the whole todo

  //check if the id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  const editedTodo = await Todo.findByIdAndUpdate(_id, todo, {
    new: true,
  }); // new true is so we can receive the updated version of the post

  res.json(editedTodo);
};

export const deleteUserTodos = async (req, res) => {
  const { id } = req.params;

  //check if the id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Todo.findByIdAndRemove(id);

  res.json({ message: "Todo deleted successfully." });
};
