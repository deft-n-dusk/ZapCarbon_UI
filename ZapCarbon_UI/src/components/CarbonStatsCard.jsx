import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CarbonStatsCard = ({ emission, activityType, onReset }) => {
  const monthlyTarget = 500; // Used just for visual scale
  const percentage = Math.min((emission / monthlyTarget) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-[#87bc71] to-[#447c62] px-4 py-4 rounded-2xl shadow-lg text-white w-full max-w-[550px] transition-transform duration-500 hover:scale-[1.04]">
      <h2 className="text-lg md:text-xl font-semibold mb-1">
        Activity : {activityType}
      </h2>
      <p className="text-sm mb-5">
        You emitted {emission.toFixed(2)} kg CO₂
      </p>

      <div className="w-[10rem] h-[10rem] md:w-[12.5rem] md:h-[12.5rem] mx-auto mb-5">
        <CircularProgressbarWithChildren
          strokeWidth={6}
          value={percentage}
          styles={buildStyles({
            pathColor: "#0f0f0f",
            trailColor: "#d6d6d6",
            strokeLinecap: "round",
          })}
        >
          <div className="text-center text-white">
            <div className="text-xl md:text-2xl font-bold">
              {emission.toFixed(1)} kg
            </div>
            <div className="text-sm">CO₂</div>
            <div className="text-xs opacity-80">from this activity</div>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      <div className="flex justify-center md:justify-between items-center px-2">
        <button
          className="bg-white text-green-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-[#03473c] hover:text-white"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CarbonStatsCard;
