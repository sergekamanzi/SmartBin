import React from "react";

import SidebarWaste from "../SidebarWaste";
import PerformanceLogManager from '../Performance/PerformanceLogsManager'
const Performance = () => {
  return (
    <div className="flex bg-[#eee] ">
      <SidebarWaste />
      <div>
        <PerformanceLogManager/>
      </div>
    </div>
  );
};

export default Performance;
