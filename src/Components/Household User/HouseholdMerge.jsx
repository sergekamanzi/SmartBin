import React from "react";
import SidebarHousehold from "./SidebarHousehold";
import Dashboard from "./Dashboard/Dashboard";
import MainHousehold from "./MainHousehold";

const HouseholdMerge = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#eeeeee]">
      <SidebarHousehold />
      <div className="flex-1">
        <Dashboard />
        <MainHousehold />
      </div>
    </div>
  );
};

export default HouseholdMerge;
