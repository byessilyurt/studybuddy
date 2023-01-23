import { motion } from "framer-motion";

const StudyBuddyCard = () => {
  return (
    <div className="md:pl-64 flex justify-center items-start my-12">
      <div className="w-full max-w-sm rounded-lg overflow-hidden bg-white shadow-md">
        <motion.p
          className="px-6 py-4 text-gray-700 leading-relaxed"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          StudyBuddy is an online platform that helps students connect with the
          right study partners. With StudyBuddy, you can easily find study
          partners who have similar goals, schedules, and study habits.
          <span className="text-indigo-500 font-medium">
            Click on the "Match" button to get started
          </span>
        </motion.p>
      </div>
    </div>
  );
};

export default StudyBuddyCard;
