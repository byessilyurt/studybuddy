import { createContext, useState } from "react";

const MatchContext = createContext();
const MatchProvider = ({ children }) => {
  const [matched, setMatched] = useState(false);
  return (
    <MatchContext.Provider value={{ matched, setMatched }}>
      {children}
    </MatchContext.Provider>
  );
};

export { MatchProvider, MatchContext };
