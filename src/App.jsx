import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landingpage from "./Components/Landingpage";
import HouseholdMerge from "./Components/Household User/HouseholdMerge";
import Createaccount from "./Components/Gerstarted/Signup/Createaccount";
import Signin from "./Components/Gerstarted/Login/Signin";
import ProfileSection from "./Components/Household User/Profile/ProfileSection";
import RecyclingMerge from "./Components/Household User/Boxes/RecyclingTracker/RecyclingMerge";
import Wastemerge from "./Components/Household User/Boxes/WasteSchedule.jsx/Wastemerge";
import WasteServiceMerge from "./Components/Waste Collection Service/WasteServiceMerge";
import RouteManagementmerge from "./Components/Waste Collection Service/RouteManagement/RouteManagementmerge";
const App = () => {
  return (
    <div className="overflow-x-hidden ">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/Signup" element={<Createaccount />} />
        <Route path="/home" element={<HouseholdMerge />} />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/recycling" element={<RecyclingMerge/>} />
        <Route path="/schedule" element={<Wastemerge />} />
        <Route path="/dashboard" element={<WasteServiceMerge />} />
        <Route path="/RouteManagement" element={<RouteManagementmerge />} />

      </Routes>
    </div>
  );
};

export default App;
