import React from "react";
import SidebarHousehold from "./SidebarHousehold";
import Dashboard from "./Dashboard/Dashboard";
import MainHousehold from "./MainHousehold";


const HouseholdMerge = () => {
  return (
    <div className="flex bg-[#eeeeee] ">
      <SidebarHousehold />
      <div>
        
        <Dashboard/>
        <MainHousehold/>
      </div>
      
    </div>
  );
};

export default HouseholdMerge;
