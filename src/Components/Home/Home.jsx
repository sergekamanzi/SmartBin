import React from 'react';
import './Home.css';

const Hero = () => {
  return (
    <div className="" id="b-image">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-12 sm:py-24 lg:py-32">
          <div className="text-left lg:-ml-40  sm:text-left ">
            <h1 className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-xl leading-8 text-gray-500 font-semibold">
              WELCOME TO Smart Bin
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold tracking-tight text-gray-50">
              Next Generation
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold tracking-tight text-gray-50">
              Smart <span className="text-[#37af65]">Waste</span> Management
            </h1>

            <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-xl leading-8 text-gray-400">
              Enhance waste collection, recycling, and resource management
              through intelligent technologies
            </p>
            <div className="mt-6 flex items-center justify-center sm:justify-start gap-4">
              <a
                href="#"
                className="rounded-md bg-[#37af65] px-4 py-3 text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold text-white shadow-sm hover:bg-[#468d5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#37af65]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
