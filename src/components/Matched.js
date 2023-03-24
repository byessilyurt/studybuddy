import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  const [time, setTime] = useState(0);
  const [bgColor, setBgColor] = useState("rgba(128, 0, 128, 1)");

  useEffect(() => {
    const changeColor = () => {
      const currentColor = bgColor.match(/\d+/g).map(Number);
      const randomIndex = Math.floor(Math.random() * 3);
      const randomStep =
        (Math.random() * 0.1 - 0.05) * (Math.random() < 0.5 ? -1 : 1);

      currentColor[randomIndex] = Math.min(
        Math.max(currentColor[randomIndex] + randomStep, 0),
        255
      );

      setBgColor(
        `rgba(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]}, 1)`
      );
    };

    const timer = setInterval(() => {
      changeColor();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [bgColor]);

  const handleEndMatch = async () => {
    await endMatch(matchId);
    removeMatchedUserWithCallback(() => navigate("/"));
  };

  useEndMatch(matchId, endMatch, removeMatchedUserWithCallback);
  useMatchChangeListener(matchId, removeMatchedUserWithCallback);
  useTimer(setTime);
  useHandleLogout(handleEndMatch);

  if (!matchedUser) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center p-10"
    >
      <div className="flex justify-between w-full items-start">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={matchedUser.photoURL || "https://via.placeholder.com/48"}
            alt={matchedUser.displayName}
          />
          <span className="ml-2 text-2xl">{matchedUser.displayName}</span>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={`rounded-full w-20 h-20 flex items-center justify-center text-white text-2xl`}
          style={{ backgroundColor: bgColor }}
        >
          {time} s
        </motion.div>
      </div>
      <div className="mt-5 w-full">
        <div className="bg-gray-200 p-2 rounded-lg mb-2">
          {/* Message box */}
        </div>
        <div className="bg-white p-2 rounded-lg">
          <input
            className="w-full p-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            type="text"
            placeholder="Type your message..."
          />
        </div>
      </div>
      <button
        className="bg-red-600 text-white px-6 py-2 mt-4 rounded-full focus:outline-none hover:bg-red-700 transition-colors"
        onClick={handleEndMatch}
      >
        End Match
      </button>
    </motion.div>
  );
};

export default Matched;
