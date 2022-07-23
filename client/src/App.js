import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/authContext";

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          {/* One route for both registration or log in */}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
