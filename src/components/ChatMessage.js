import React from "react";

const ChatMessage = ({ message, isCurrentUser }) => {
  return (
    <div
      className={`p-2 rounded-lg mb-2 ${
        isCurrentUser ? "bg-purple-200 text-white" : "bg-gray-200"
      }`}
    >
      {message}
    </div>
  );
};

export default ChatMessage;
