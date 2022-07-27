import React from "react";

import Task from "./Task";
import "./AllTasks.css";

const AllTasks = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <div className="all-tasks">
      {console.log(todos)}
      {todos.map((todo) => (
        <Task 
        todo={todo} 
        key={todo._id} 
        updateTodo={updateTodo} 
        deleteTodo={deleteTodo}
         />
      ))}
    </div>
  );
};

export default AllTasks;