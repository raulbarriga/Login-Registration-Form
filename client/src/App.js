import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* One route for both registration or log in */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
