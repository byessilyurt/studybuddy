import React, { useState } from "react";

import { motion } from "framer-motion";
import { handleMatchButtonClick } from "../utils";
const MatchButton = () => {
  const [matching, setMatching] = useState(false);
  const handleMatchClick = () => {
    setMatching(true);
    handleMatchButtonClick();
  };
  const handleCancelClick = () => {
    setMatching(false);
  };

  return (
    <div className="md:pl-64 flex justify-center items-start pt-8 h-screen">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
        disabled:pointer-events-none disabled:opacity-30 
 rounded-full w-48 h-48 bg-indigo-500 text-white flex justify-center items-center shadow-xl hover:shadow-2xl `}
        onClick={handleMatchClick}
        disabled={matching}
      >
        <i className="fas fa-plus fa-2x"></i>
        <p className="text-white text-xl font-medium">Match</p>
      </motion.button>
      {matching ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-full w-24 h-24 bg-red-500 text-white flex justify-center items-center shadow-xl hover:shadow-2xl"
          onClick={handleCancelClick}
        >
          <i className="fas fa-times fa-2x"></i>
          <p className="text-white text-xl font-medium">Cancel</p>
        </motion.button>
      ) : null}
      {matching ? (
        <motion.div
          className="loading-card text-center"
          animate={{
            scale: [1, 1.5, 1],
            transition: { duration: 1.5, ease: "easeInOut", loop: Infinity },
          }}
        >
          <div className="loading-text text-xl">Loading</div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default MatchButton;
