import { motion } from "framer-motion";

const MatchButton = () => {
  return (
    <div className="md:pl-64 flex justify-center items-start pt-8 h-screen">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="rounded-full w-48 h-48 bg-indigo-500 text-white flex justify-center items-center shadow-xl hover:shadow-2xl "
      >
        <i className="fas fa-plus fa-2x"></i>
        <p className="text-white text-xl font-medium">Match</p>
      </motion.button>
    </div>
  );
};

export default MatchButton;
