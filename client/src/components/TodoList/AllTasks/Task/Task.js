import React, { useContext, useState } from "react";

import { TodosContext } from "../../../../contexts/todosContext";
import "./Task.css";

const Task = ({ todo }) => {
  const { deleteTodo, updateTodo } = useContext(TodosContext);

  const { todo: name, completed, _id } = todo;

  const [editing, setEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    todo: "",
    completed: false,
  });

  const onEditClick = () => {
    setEditing(true);
    setUpdatedTodo(todo);
  };

  const onSaveClick = (e) => {
    e.preventDefault();

    console.log("updatedTodo: ", updatedTodo);
    updateTodo(_id, updatedTodo);
    setEditing(false);
  };

  const onCancelClick = () => setEditing(false);
  return (
    <div className="task">
      {editing ? (
        <>
          <form onSubmit={onSaveClick}>
            <input
              type="text"
              value={updatedTodo.todo}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, todo: e.target.value })
              }
            />
          </form>
          <span className="btns">
            <button className="edit-btn" onClick={onSaveClick}>
              Save
            </button>
            <button className="delete-btn" onClick={onCancelClick}>
              Cancel
            </button>
          </span>
        </>
      ) : (
        <>
          <span className="name-and-checkbox">
            <input
              type="checkbox"
              className="checkbox-btn"
              checked={completed ? "checked" : ""}
              onChange={() => {
                const toggleCheckbox =
                  completed === false
                    ? {
                        completed: true,
                      }
                    : {
                        completed: false,
                      };
                updateTodo(_id, toggleCheckbox);
              }}
            />
            <span
              style={{
                textDecoration: completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => {
                const toggleCheckbox =
                  completed === false
                    ? {
                        completed: true,
                      }
                    : {
                        completed: false,
                      };
                updateTodo(_id, toggleCheckbox);
              }}
            >
              {name}
            </span>
          </span>
          <span className="btns">
            <button className="edit-btn" onClick={onEditClick}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTodo(_id)}>
              Delete
            </button>
          </span>
        </>
      )}
    </div>
  );
};

export default Task;
