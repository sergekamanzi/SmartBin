import React from "react";
import { LuCalendarCheck2 } from "react-icons/lu";
import projectImage from "../../assets/project-3.jpg";
import projectImages from "../../assets/project-1.jpg";
import projectimg from "../../assets/service-2.jpg";
import { FaDumpster } from "react-icons/fa6";
import { MdRecycling } from "react-icons/md";
export default function Features() {
  return (
    <section className="text-gray-900 bg-[#f5fef9] body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-[#37af65] text-center text-2xl font-bold ">
          We offer{" "}
        </h1>
        <h1 className="sm:text-3xl lg:text-5xl font-bold title-font text-center text-blue mb-20">
          A wide range of waste <br /> disposal services
        </h1>
        <div className="flex justify-between items-center">
          <a href="">
            <div className="max-w-sm mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
              <div className="px-5 ">
                <img
                  src={projectImage}
                  alt="Waste Collection"
                  className=" object-cover rounded-b-full "
                />
              </div>
              <div className="p-6">
                <LuCalendarCheck2 className="bg-[#f5fef9] absolute shadow-2xl text-[#37af65] text-7xl ml-32 -mt-16 rounded-3xl  p-2"  />
                <div>
                  <h1 className="text-2xl font-bold mt-2 mb-2 text-center">
                    Waste Collection Schedule
                  </h1>
                  <p className="text-gray-700 text-center">
                    The Waste Collection Schedule feature allows household users
                    to schedule waste pickups conveniently and receive timely
                    notifications, ensuring consistent and efficient waste
                    management.
                  </p>
                </div>
              </div>
            </div>
          </a>
          <a href="">
            <div className="max-w-sm mx-auto bg-white shadow-2xl rounded-lg overflow-hidden pb-6">
              <div className="px-5 ">
                <img
                  src={projectImages}
                  alt="Waste Collection"
                  className=" object-cover rounded-b-full "
                />
              </div>
              <div className="p-6">
                <MdRecycling className="bg-[#f5fef9] absolute shadow-2xl text-[#37af65] text-7xl ml-32 -mt-16 rounded-3xl  p-2" />
                <div>
                  <h1 className="text-2xl font-bold mb-2 mt-2 text-center">
                    Recycling Tracker
                  </h1>
                  <p className="text-gray-700 text-center">
                    The Recycling Tracker helps users monitor their recycling
                    efforts and view their environmental impact, providing
                    insights into their habits and encouraging sustainable
                    practices.
                  </p>
                </div>
              </div>
            </div>
          </a>
          <a href="">
            <div className="max-w-sm mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
              <div className="px-5 ">
                <img
                  src={projectimg}
                  alt="Waste Collection"
                  className=" object-cover rounded-b-full "
                />
              </div>
              <div className="p-6">
                <FaDumpster className="bg-[#f5fef9] absolute  shadow-2xl text-[#37af65] text-7xl ml-32 -mt-16 rounded-3xl  p-2" />
                <div>
                  <h1 className="text-2xl font-bold mb-2 mt-2 text-center">
                    Waste Collection Services Management
                  </h1>
                  <p className="text-gray-700 text-center">
                    This enables service providers to manage routes, schedules,
                    and track performance, optimizing operations and improving
                    service quality.
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
