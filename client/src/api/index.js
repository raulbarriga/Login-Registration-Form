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
