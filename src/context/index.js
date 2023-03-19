import { createContext, useState } from "react";

const MatchContext = createContext();
const MatchProvider = ({ children }) => {
  const [matching, setMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [matchedUser, setMatchedUser] = useState([]);
  const [matchId, setMatchId] = useState("");

  const removeMatchedUser = () => {
    setMatching(false);
    setIsMatched(false);
    setMatchedUser(null);
    setMatchId(null);
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
        removeMatchedUser,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export { MatchProvider, MatchContext };
