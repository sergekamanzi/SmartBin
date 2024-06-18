import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landingpage from "./Components/Landingpage";
import HouseholdMerge from "./Components/Household User/HouseholdMerge";
import Signin from "./Components/Gerstarted/Login/Signin";
import ProfileSection from "./Components/Household User/Profile/ProfileSection";
import RecyclingMerge from "./Components/Household User/Boxes/RecyclingTracker/RecyclingMerge";
import Wastemerge from "./Components/Household User/Boxes/WasteSchedule.jsx/Wastemerge";
import WasteServiceMerge from "./Components/Waste Collection Service/WasteServiceMerge";
import RouteManagementmerge from "./Components/Waste Collection Service/RouteManagement/RouteManagementmerge";
import CreateaccountHoushold from "./Components/Gerstarted/Signup/CreateaccountHoushold";
import CreateaccountWasteCollectionService from "./Components/Gerstarted/Signup/CreateaccountWasteCollectionService";
import Schedulesmerge from "./Components/Waste Collection Service/Schedules/Schedulesmerge";
import Performance from "./Components/Waste Collection Service/Performance/Performance";
import ProfileCompany from "./Components/Waste Collection Service/Profile/ProfileCompany";
import AdminMerge from "./Components/Admin/AdminMerge";
import UsersMerge from "./Components/Admin/Box/Users/UsersMerge";
const App = () => {
  return (
    <div className="overflow-x-hidden ">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/Signup" element={<CreateaccountHoushold />} />
        <Route
          path="/SignupCompany"
          element={<CreateaccountWasteCollectionService />}
        />

        <Route path="/home" element={<HouseholdMerge />} />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/recycling" element={<RecyclingMerge />} />
        <Route path="/schedule" element={<Wastemerge />} />
        <Route path="/dashboard" element={<WasteServiceMerge />} />
        <Route path="/RouteManagement" element={<RouteManagementmerge />} />
        <Route path="/schedules" element={<Schedulesmerge />} />
        <Route path="/perfomance" element={<Performance />} />
        <Route path="/companyprofile" element={<ProfileCompany />} />
        <Route path="/admin" element={<AdminMerge />} />
        <Route path="/users" element={<UsersMerge />} />
      </Routes>
    </div>
  );
};

export default App;
