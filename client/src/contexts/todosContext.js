import React, { createContext, useEffect, useState } from "react";

import { getTodos, createTodo, deleteATodo, editTodo } from "../api/index";

export const TodosContext = createContext({});

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveTodo = async (e, newTodo, setNewTodo) => {
    e.preventDefault();

    try {
      const data = await createTodo(newTodo);
      console.log(data);

      setTodos([...todos, data]);
      console.log(todos);
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
