import React, { createContext, useEffect, useState, useContext } from "react";

import { getTodos, createTodo, deleteATodo, editTodo } from "../api/index";
import { AuthContext } from "./authContext";

export const TodosContext = createContext({});

const TodosProvider = ({ children }) => {
  const { userDetails } = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem('profile'));

  const [todos, setTodos] = useState(null);

  useEffect(() => {
    // if a logged in user exists, fetch his todos list
    if (userDetails) {
      fetchTodos(userDetails._id);
    }
  }, []);

  const fetchTodos = async (userID) => {
    try {
      const data = await getTodos(userID);
      // console.log("fetched user todos: ", data);
      setTodos(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveTodo = async (e, newTodo, setNewTodo) => {
    e.preventDefault();

    try {
      const data = await createTodo(newTodo, userDetails._id);
      // console.log(data);

      setTodos([...todos, data]);
      // console.log("todos: ", todos);
      // console.log("todos type: ", typeof todos);
    } catch (error) {
      console.log(error.message);
    }
    setNewTodo({
      todo: "",
      completed: false,
    });
  };

  const deleteTodo = async (id) => {
    try {
      await deleteATodo(id);

      return setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTodo = async (_id, editedTodo) => {
    try {
      const { data } = await editTodo(_id, editedTodo);

      setTodos(todos.map((todo) => (todo._id === data._id ? data : todo)));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TodosContext.Provider
      value={{ fetchTodos, saveTodo, deleteTodo, updateTodo, todos }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
