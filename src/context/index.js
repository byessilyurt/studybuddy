import { createContext, useState } from "react";

const MatchContext = createContext();
const MatchProvider = ({ children }) => {
  const [matching, setMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const [matchId, setMatchId] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const removeMatchedUserWithCallback = (callback) => {
    setMatching(false);
    setIsMatched(false);
    setMatchedUser(null);
    setMatchId(null);
    setMessages([]);
    if (typeof callback === "function") {
      callback();
    }
  };

  return (
    <MatchContext.Provider
      value={{
        matching,
        setMatching,
        isMatched,
        setIsMatched,
        matchedUser,
        setMatchedUser,
        matchId,
        setMatchId,
        removeMatchedUserWithCallback,
        messages,
        setMessages,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export { MatchProvider, MatchContext };
