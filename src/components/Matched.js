import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosClose, IoMdTrash } from "react-icons/io";

import { MatchContext } from "../context";
import { useEndMatch, useHandleLogout, useMatchChangeListener } from "../hooks";
import { endMatch, getUserInfo, getMessages } from "../firebase";

import ChatInput from "./ChatInput";
import Timer from "./Timer";
import ChatMessages from "./ChatMessages";

const Matched = () => {
  const radius = 90;
  const strokeWidth = 16;
  const circleSize = radius * 2 + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const navigate = useNavigate();
  const user = getUserInfo();
  const {
    matchedUser,
    matchId,
    removeMatchedUserWithCallback,
    messages,
    setMessages,
  } = useContext(MatchContext);
  const [time, setTime] = useState(1500);
  const progress = time / 1500;
  const [strokeColor, setStrokeColor] = useState("rgba(128, 0, 128, 0.2)");
  const [clearedTimestamp, setClearedTimestamp] = useState(null);

  useEffect(() => {
    const unsubscribe = getMessages(matchId, setMessages);
    return () => unsubscribe();
  }, [matchId]);

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

  const handleEndMatch = async () => {
    await endMatch(matchId);
    removeMatchedUserWithCallback(() => navigate("/"));
  };

  const clearMessages = () => {
    setMessages([]);
    setClearedTimestamp(Date.now());
  };

  useEndMatch(matchId, endMatch, removeMatchedUserWithCallback);
  useMatchChangeListener(matchId, removeMatchedUserWithCallback);
  useHandleLogout(handleEndMatch);

  if (!matchedUser) {
    return null;
  }

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
          <Timer initialTime={1500} onTimeEnd={handleEndMatch} />
        </text>
      </svg>
      <div className="mt-5 w-3/4 md:w-1/2 mx-auto">
        <ChatInput matchId={matchId} />
      </div>
      <ChatMessages
        messages={messages}
        clearedTimestamp={clearedTimestamp}
        clearMessages={clearMessages}
        user={user}
      />
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
