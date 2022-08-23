import React, { useContext } from "react";

import Task from "./Task/Task";
import { TodosContext } from "../../../contexts/todosContext";

import "./AllTasks.css";

const AllTasks = () => {
  const { todos } = useContext(TodosContext);

  // console.log("AllTasks todos: ", todos);
  return (
    <div className="all-tasks">
      {todos ? todos.map((todo) => <Task todo={todo} key={todo._id} />) : null}
    </div>
  );
};

export default AllTasks;
