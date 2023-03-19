import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { MatchContext } from "../context";
import { useEndMatch } from "../hooks";
import { endMatch } from "../firebase";

const Matched = () => {
  const navigate = useNavigate();
  const { matchedUser, matchId, removeMatchedUser } = useContext(MatchContext);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!matchedUser) {
      navigate("/");
    } else {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [matchedUser, navigate]);

  useEndMatch(matchId, endMatch, removeMatchedUser);
  const handleEndMatch = async () => {
    await endMatch(matchId);
    removeMatchedUser();
  };

  // If matchedUser is null, do not render the component
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
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-purple-500 rounded-full w-64 h-64 flex items-center justify-center text-white text-5xl"
      >
        {time} s
      </motion.div>
      <p className="text-2xl mt-5">You are matched with {matchedUser.email}</p>
      <button
        className="bg-red-600 text-white px-6 py-2 mt-4 rounded-full focus:outline-none hover:bg-red-700 transition-colors"
        onClick={handleEndMatch}
      >
        End Match
      </button>
      <div className="mb-4 w-full mt-10">
        <h3 className="text-lg font-medium mb-2">Chat:</h3>
        <textarea
          className="p-2 bg-gray-200 rounded-lg w-full h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          placeholder="Start typing here..."
        />
      </div>
    </motion.div>
  );
};

export default Matched;
