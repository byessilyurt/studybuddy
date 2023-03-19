import { useContext, useEffect } from "react";
import { motion } from "framer-motion";

import { usePageVisibility } from "../hooks";
import { handleMatchButtonClick, handleCancelButtonClick } from "../utils";
import { MatchContext } from "../context";
import { matchUsers } from "../firebase";
const MatchButton = () => {
  const isVisible = usePageVisibility();
  const { setIsMatched, setMatchedUser, setMatchId, matching, setMatching } =
    useContext(MatchContext);

  useEffect(() => {
    if (!isVisible && matching) {
      handleCancelButtonClick()
        .then(() => {
          setMatching(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isVisible]);

  const handleMatchClick = async () => {
    setMatchedUser(null);
    setMatchId(null);
    setIsMatched(false);
    setMatching(true);
    const added = await handleMatchButtonClick();
    if (added) {
      try {
        const { matchedUser, matchId } = await matchUsers();
        setIsMatched(true);
        setMatchedUser(matchedUser);
        setMatchId(matchId);
      } catch (error) {
        console.log(error);
      }
    } else {
      // error
    }
  };
  const handleCancelClick = () => {
    handleCancelButtonClick();
    setMatching(false);
  };
  return (
    <div className="md:pl-64 flex justify-center items-start pt-8 h-screen">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
        disabled:pointer-events-none disabled:opacity-50 
 rounded-full w-48 h-48 bg-indigo-500 text-white flex justify-center items-center shadow-2xl hover:shadow-3xl `}
          onClick={handleMatchClick}
          disabled={matching}
        >
          <i className="fas fa-plus fa-2x"></i>
          <p
            className={`text-white text-xl font-medium ${
              matching ? "none" : "animate-pulse"
            }`}
          >
            Match
          </p>
        </motion.button>
        {matching ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -top-4 -right-8 rounded-full w-12 h-12 bg-red-500 text-white flex justify-center items-center shadow-xl hover:shadow-2xl"
            onClick={handleCancelClick}
          >
            <i className="fas fa-times fa-2x"></i>
            <p className="text-white text-xs font-medium">Cancel</p>
          </motion.button>
        ) : null}
        {matching ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-10 w-64 "
          >
            <i className="fas fa-times fa-2x"></i>
            <p className="text-black text-md font-medium animate-pulse">
              Looking for a studybuddy...
            </p>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};
export default MatchButton;
