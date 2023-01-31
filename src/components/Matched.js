import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Matched = ({ matchData }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
      <p className="text-2xl mt-5">You are matched with {matchData.username}</p>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Chat:</h3>
        <textarea
          className="p-2 bg-gray-200 rounded-lg w-full h-32"
          placeholder="Start typing here..."
        />
      </div>
    </motion.div>
  );
};

export default Matched;
