import { createContext, useState } from "react";

const MatchContext = createContext();
const MatchProvider = ({ children }) => {
  const [matching, setMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [matchedUser, setMatchedUser] = useState([]);
  return (
    <MatchContext.Provider
      value={{
        matching,
        setMatching,
        isMatched,
        setIsMatched,
        matchedUser,
        setMatchedUser,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export { MatchProvider, MatchContext };
