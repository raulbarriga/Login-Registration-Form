import axios from "axios";

// server url
const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const logIn = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await API.post("/users/login", formData, config);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await API.post("/users/register", formData, config);

    // localStorage.setItem("profile", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
};

// // heroku server url
// const url = process.env.PRODUCTION_URL;

export const getTodos = async () => {
  try {
    const { data } = await API.get("/todos");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createTodo = async (newTodo) => {
  try {
    const todo = {
      todo: newTodo.todo,
      completed: newTodo.completed,
    };
    const { data } = await API.post("/todos", todo);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteATodo = async (_id) => {
  try {
    await API.delete(`"/todos"/${_id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const editTodo = async (_id, todoChange) => {
  try {
    console.log(todoChange);

    const data = await API.patch(`"/todos"/${_id}`, todoChange);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};