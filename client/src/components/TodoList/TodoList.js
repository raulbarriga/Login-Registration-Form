import React from "react";

import AddTask from "./AddTask/AddTask";
import AllTasks from "./AllTasks/AllTasks";

import "./TodoList.css";

const TodoList = () => {
  return (
    <div id="todo-list">
      <div className="app-wrapper">
        <header>
          <h1>To Do List</h1>
        </header>
        <AddTask />
        <AllTasks />
      </div>
    </div>
  );
};

export default TodoList;
