import React, { useState, useContext } from "react";

import { MatchContext } from "../context";
import { firstNameMatchedUser } from "../utils";
import { addNewMessage, getUserInfo } from "../firebase";

const ChatInput = React.memo(({ matchId, className }) => {
  const [message, setMessage] = useState("");
  const { matchedUser } = useContext(MatchContext);
  const userId = getUserInfo().uid;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await addNewMessage(matchId, userId, message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSendMessage} className={className}>
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-4 py-2 bg-white border-2 border-purple-100 focus:border-purple-500 rounded-lg focus:outline-none"
      />
    </form>
  );
});
export default ChatInput;
