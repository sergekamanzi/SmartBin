import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FiLogOut, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import { CgPerformance } from "react-icons/cg";

function SidebarWaste() {
  const [isHovered, setIsHovered] = useState({});
  const [isActive, setIsActive] = useState({});
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMouseEnter = (key) => () =>
    setIsHovered((prev) => ({ ...prev, [key]: true }));
  const handleMouseLeave = (key) => () =>
    setIsHovered((prev) => ({ ...prev, [key]: false }));
  const handleClick = (key) => () =>
    setIsActive((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleToggleMinimize = () => setIsMinimized((prevState) => !prevState);

  return (
    <div
      className={`flex h-screen bg-[#064f32] ${
        isMinimized ? "w-20" : "w-56"
      } duration-300`}
    >
      <div className="p-5 pt-8 relative">
        <button
          className="absolute top-4 duration-500 right-11 text-gray-950 bg-white rounded-full"
          onClick={handleToggleMinimize}
        >
          {isMinimized ? (
            <FiChevronRight
              className="text-gray-950 bg-white rounded-full absolute top-4 duration-500 right-0"
              size={24}
            />
          ) : (
            <FiChevronLeft
              className="text-gray-950 bg-white rounded-full absolute top-4 duration-500 -right-3 "
              size={24}
            />
          )}
        </button>
        <div>
          <a href="/dashboard">
            {isMinimized ? (
              <p className="text-3xl text-zinc-50 font-bold mt-5 mb-20">
                SB <span className="text-[#37af65] -ml-1">.</span>
              </p>
            ) : (
              <p className="text-3xl font-bold text-white mt-0 mb-20 text-center">
                Smart <span className="font-light">Bin</span>
                <span className="text-[#37af65] text-6xl ml-1">.</span>
              </p>
            )}
          </a>
        </div>
        <div
          className={`px-8 font-normal flex flex-col justify-between ${
            isMinimized ? "mt-4 -ml-11" : "-ml-5"
          } gap-2`}
        >
          <Link to="/dashboard">
            <div
              className={`rounded-lg shadow-xl duration-500 flex items-center w-full px-5 py-2 ${
                isActive.dashboard || isHovered.dashboard
                  ? "bg-[#38725a] text-white"
                  : "text-[#b1b8be]"
              }`}
              onMouseEnter={handleMouseEnter("dashboard")}
              onMouseLeave={handleMouseLeave("dashboard")}
              onClick={handleClick("dashboard")}
            >
              <GoHomeFill className="text-2xl w-auto mr-2.5" />
              {!isMinimized && <h1 className="text-xl">Dashboard</h1>}
            </div>
          </Link>
          <Link to="/RouteManagement">
            <div
              className={`rounded-lg shadow-xl duration-500 flex items-center w-full px-5 py-2 mt-2 ${
                isActive.schedule || isHovered.schedule
                  ? "bg-[#38725a] text-white"
                  : "text-[#b1b8be]"
              }`}
              onMouseEnter={handleMouseEnter("schedule")}
              onMouseLeave={handleMouseLeave("schedule")}
              onClick={handleClick("schedule")}
            >
              <FaRoute className="text-2xl w-auto mr-2" />
              {!isMinimized && <h1 className="text-xl">Route Mgt.</h1>}
            </div>
          </Link>
          <Link to="/">
            <div
              className={`rounded-lg shadow-xl duration-500 flex items-center w-full px-5 py-2 mt-2 ${
                isActive.tracker || isHovered.tracker
                  ? "bg-[#38725a] text-white"
                  : "text-[#b1b8be]"
              }`}
              onMouseEnter={handleMouseEnter("tracker")}
              onMouseLeave={handleMouseLeave("tracker")}
              onClick={handleClick("tracker")}
            >
              <CgPerformance className="text-2xl w-auto mr-2" />
              {!isMinimized && <h1 className="text-xl">Performance</h1>}
            </div>
          </Link>
          <Link to="/profile">
            <div
              className={`rounded-lg shadow-xl duration-500 flex items-center w-full px-5 py-2 mt-2 ${
                isActive.profile || isHovered.profile
                  ? "bg-[#38725a] text-white"
                  : "text-[#b1b8be]"
              }`}
              onMouseEnter={handleMouseEnter("profile")}
              onMouseLeave={handleMouseLeave("profile")}
              onClick={handleClick("profile")}
            >
              <MdAccountCircle className="text-2xl w-auto mr-2" />
              {!isMinimized && <h1 className="text-xl">Profile</h1>}
            </div>
          </Link>
          <Link to="/settings">
            <div
              className={`rounded-lg shadow-xl duration-500 flex items-center w-full px-5 py-2 mt-2 ${
                isActive.settings || isHovered.settings
                  ? "bg-[#38725a] text-white"
                  : "text-[#b1b8be]"
              }`}
              onMouseEnter={handleMouseEnter("settings")}
              onMouseLeave={handleMouseLeave("settings")}
              onClick={handleClick("settings")}
            >
              <IoIosSettings className="text-2xl w-auto mr-2" />
              {!isMinimized && <h1 className="text-xl">Settings</h1>}
            </div>
          </Link>
          <Link to="/login">
            <div
              className={`rounded-lg shadow-xl duration-500 flex items-center w-full px-5 py-2 mt-2 ${
                isActive.logout || isHovered.logout
                  ? "bg-[#38725a] text-white"
                  : "text-[#b1b8be]"
              }`}
              onMouseEnter={handleMouseEnter("logout")}
              onMouseLeave={handleMouseLeave("logout")}
              onClick={handleClick("logout")}
            >
              <FiLogOut className="text-2xl w-auto mr-2" />
              {!isMinimized && <h1 className="text-xl">Log out</h1>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SidebarWaste;
