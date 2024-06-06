import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Gerstarted/Signup";
import Login from "./Components/Gerstarted/Login"
import Landingpage from "./Components/Landingpage";
const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
