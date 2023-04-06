import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";

import { MatchContext } from "../context";
import {
  useAuthChangeListener,
  useEndMatch,
  useHandleLogout,
  useMatchChangeListener,
  useTimer,
} from "../hooks";
import { endMatch } from "../firebase";

const Matched = () => {
  const navigate = useNavigate();
  const { matchedUser, matchId, removeMatchedUserWithCallback } =
    useContext(MatchContext);
  const [time, setTime] = useState(1500);
  const [strokeColor, setStrokeColor] = useState("rgba(128, 0, 128, 0.2)");

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}m ${seconds}s`;
  };

  const handleEndMatch = async () => {
    await endMatch(matchId);
    removeMatchedUserWithCallback(() => navigate("/"));
  };

  const radius = 90;
  const strokeWidth = 16;
  const circleSize = radius * 2 + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progress = time / 1500;

  useEndMatch(matchId, endMatch, removeMatchedUserWithCallback);
  useMatchChangeListener(matchId, removeMatchedUserWithCallback);
  useHandleLogout(handleEndMatch);

  if (!matchedUser) {
    return null;
  }

  const firstName = matchedUser?.displayName?.split(" ")[0] || "Stranger";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen p-10"
    >
      <svg
        className="w-full max-w-xs"
        width={circleSize}
        height={circleSize}
        viewBox={`0 0 ${circleSize} ${circleSize}`}
      >
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke="rgba(128, 0, 128, 0.2)"
        />
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="purple-500"
          fontSize="2rem"
          fontWeight="bold"
        >
          {formatTime(time)}
        </text>
      </svg>
      <div className="mt-5 w-3/4 md:w-1/2 mx-auto">
        <input
          className="w-full p-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder={`Say hi to ${firstName}`}
        />
      </div>

      <button
        className="absolute top-4 right-4 text-red-500 opacity-60 hover:opacity-100 transition-opacity focus:outline-none text-3xl"
        onClick={handleEndMatch}
      >
        <IoIosClose />
      </button>
    </motion.div>
  );
};

export default Matched;
