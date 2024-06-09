import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landingpage from "./Components/Landingpage";
import Createaccount from "./Components/Gerstarted/Createaccount";
import Singin from "./Components/Gerstarted/Singin";
const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Singin />} />
        <Route path="/Signup" element={<Createaccount />} />
      </Routes>
    </div>
  );
};

export default App;
