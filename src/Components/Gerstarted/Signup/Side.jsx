import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
const Side = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-green-900 text-white w-1/2 rounded-l-3xl shadow-2xl">
      <div className="pl-10">
        <a href="/">
          <p className="text-3xl font-bold">
            Smart <span className="font-light ">Bin</span>{" "}
            <span className="text-[#37af65] text-7xl -ml-1 ">.</span>{" "}
          </p>
        </a>
      </div>
      <div className="text-center mt-16">
        <h1 className="text-5xl font-bold">Welcome Back</h1>
        <h1 className="text-xl mt-5 font-light">
          {" "}
          To keep connected with us please <br /> Login with your personal info
        </h1>
        <button
          className="border border-white rounded-full py-2 px-10 text-2xl mt-5 hover:bg-white hover:text-black  "
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Side;
