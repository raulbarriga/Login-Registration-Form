import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AuthProvider from "./contexts/authContext";

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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
