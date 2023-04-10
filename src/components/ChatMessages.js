import { useContext } from "react";

import { MatchContext } from "../context";
import ChatMessage from "./ChatMessage";

function ChatMessages({ messages, clearedTimestamp, user }) {
  const { isSidebarOpen } = useContext(MatchContext);

  const filteredMessages = messages
    .filter((message) => {
      if (!clearedTimestamp) return true;
      return message.data.timestamp > clearedTimestamp;
    })
    .reverse();

  if (filteredMessages.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative flex flex-col w-full h-64 md:h-96 ${
        isSidebarOpen ? "md:pl-64" : "md:pl-auto"
      }mt-4 mb-4`}
    >
      <div className="pb-10 pr-4 pl-4 md:pl-12 flex-grow overflow-y-auto">
        {filteredMessages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.data.text}
            isCurrentUser={user.uid === message.data.userId}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatMessages;
