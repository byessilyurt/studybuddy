import React, { useState, useContext } from "react";

import { MatchContext } from "../context";
import { firstNameMatchedUser } from "../utils";
import { addNewMessage, getUserInfo } from "../firebase";

const ChatInput = React.memo(({ matchId }) => {
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
    <form onSubmit={handleSendMessage}>
      <input
        className="w-full p-2 focus:outline-none ring-1 ring-purple-100 rounded-sm focus:ring-2 focus:ring-purple-500"
        type="text"
        placeholder={`Say Hi! to ${firstNameMatchedUser(matchedUser)}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </form>
  );
});
export default ChatInput;
