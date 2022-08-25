import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Home from "./components/Home";
import TodoList from "./components/TodoList/TodoList";

import AuthProvider from "./contexts/authContext";
import TodosProvider from "./contexts/todosContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();
  return (
    <AuthProvider>
      <div className="App">
        {location.pathname !== "/auth" && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* One route for both registration or log in */}
          <Route path="auth" element={<Auth />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="todos"
            element={
              <ProtectedRoute>
                <TodosProvider>
                  <TodoList />
                </TodosProvider>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
