import { IoMdTrash } from "react-icons/io";
import ChatMessage from "./ChatMessage";

function ChatMessages({ messages, clearedTimestamp, clearMessages, user }) {
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
    <div className="relative flex flex-col w-full h-64 md:h-96 md:pl-64 mt-4 mb-4">
      <div className="pb-10 pr-4 flex-grow overflow-y-auto">
        {filteredMessages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.data.text}
            isCurrentUser={user.uid === message.data.userId}
          />
        ))}
      </div>
      <button
        className="absolute -top-12 right-10 text-red-500 opacity-60 hover:opacity-100 transition-opacity focus:outline-none text-2xl"
        onClick={clearMessages}
      >
        <IoMdTrash />
      </button>
    </div>
  );
}

export default ChatMessages;
