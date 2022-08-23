import React, { useState, useContext } from "react";

import { TodosContext } from "../../../contexts/todosContext";

import "./AddTask.css";

const initialState = {
  todo: "",
  completed: false,
};
const AddTask = () => {
  const { saveTodo } = useContext(TodosContext);

  const [newTodo, setNewTodo] = useState(initialState);

  const handleForm = (e) => setNewTodo({ ...newTodo, todo: e.target.value });

  return (
    <div className="add-task">
      <form onSubmit={(e) => saveTodo(e, newTodo, setNewTodo)}>
        <input
          type="text"
          placeholder="Add New Task"
          onChange={handleForm}
          value={newTodo.todo}
        />
        <button>&#43;</button>
      </form>
    </div>
  );
};

export default AddTask;
