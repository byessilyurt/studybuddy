function ChatMessage({ message, isCurrentUser }) {
  return (
    <div
      className={`w-full flex my-1 ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`bg-gray-200 px-4 py-2 rounded-lg inline-block max-w-full ${
          isCurrentUser ? "bg-purple-300" : "bg-gray-200"
        } max-w-3/4 md:max-w-1/2`}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatMessage;
