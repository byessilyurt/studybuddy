import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const MatchContext = createContext();
const MatchProvider = ({ children }) => {
  const [matching, setMatching] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [matchedUser, setMatchedUser] = useState([]);
  const [matchId, setMatchId] = useState("");

  const removeMatchedUserWithCallback = (callback) => {
    console.log("removeMatchedUser fired");
    setMatching(false);
    setIsMatched(false);
    setMatchedUser(null);
    setMatchId(null);
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
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export { MatchProvider, MatchContext };
