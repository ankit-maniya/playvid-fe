import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const HeroInfo = ({ title }) => {
  return (
    <>
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center break-all">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-pink-500 to-yellow-500">
          Download {title} Video <br/> From Link!
        </span>
      </div>

      <div className="w-full lg:w-2/3 text-center m-auto">
        <div className="flex justify-evenly flex-col items-center lg:flex-row text-sm text-white font-extrabold text-center mt-5 lg:mt-10">
          <div className="flex items-center ">
            <CheckCircleIcon className="h-6 w-6" title="Unlimited Downloads" />
            <span>Unlimited Downloads!</span>
          </div>
          <div className="flex items-center">
            <CheckCircleIcon className="h-6 w-6" />
            <span>No Watermark!</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroInfo;
