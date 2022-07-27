import React, { useState } from "react";
import "./Task.css";

const Task = ({ todo, deleteTodo, updateTodo }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    todo: "",
    completed: false,
  });
  const { todo: name, completed, _id } = todo;

  const RenderName = () =>
    editing ? (
      <form onSubmit={onSaveClick}>
        {/* <input
            type="checkbox"
            className="checkbox-btn"
            checked={completed ? "checked" : ""}
            value={completed}
            onChange={(e) => {
              // const toggleCheckbox =
              //   completed === false
              //     ? {
              //         completed: true,
              //       }
              //     : {
              //         completed: false,
              //       };
              // updateTodo(_id, toggleCheckbox);
              setUpdatedTodo({ ...updatedTodo, completed: e.target.value })
            }}
          /> */}
        <input
          type="text"
          defaultValue={name}
          onChange={(e) =>
            setUpdatedTodo({ ...updatedTodo, todo: e.target.value })
          }
        />
      </form>
    ) : (
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
    );

  const RenderBtns = () =>
    editing ? (
      <span className="btns">
        <button className="edit-btn" onClick={onSaveClick}>
          Save
        </button>
        <button className="delete-btn" onClick={onCancelClick}>
          Cancel
        </button>
      </span>
    ) : (
      <span className="btns">
        <button className="edit-btn" onClick={onEditClick}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => deleteTodo(_id)}>
          Delete
        </button>
      </span>
    );

  const onEditClick = () => setEditing(true);

  const onSaveClick = (e) => {
    e.preventDefault();
    console.log(updatedTodo);
    updateTodo(_id, updatedTodo);
    setEditing(false);
  };

  const onCancelClick = () => setEditing(false);

  return (
    <div className="task">
      {editing ? <RenderName /> : null}
      {editing ? <RenderBtns /> : null}
    </div>
  );
};

export default Task;
