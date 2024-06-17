import React from "react";

import SidebarWaste from "../SidebarWaste";
import PerformanceLogsManager from "./PerformanceLogsManager";

const Performance = () => {
  return (
    <div className="flex">
      <SidebarWaste />
      <div>
        <PerformanceLogsManager />
      </div>
    </div>
  );
};

export default Performance;
