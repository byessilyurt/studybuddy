import { useState, useEffect } from "react";
import { getBrowserVisibilityProp, getIsDocumentHidden } from "../utils";

const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp();

    document.addEventListener(visibilityChange, onVisibilityChange, false);

    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange);
    };
  });

  return isVisible;
};

const useEndMatch = (matchId, endMatch, removeMatchedUser) => {
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        await endMatch(matchId);
        removeMatchedUser();
      }
    };

    const handleEndMatch = async (e) => {
      e.preventDefault();
      await endMatch(matchId);
      removeMatchedUser();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    window.addEventListener("beforeunload", handleEndMatch);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleEndMatch);
    };
  }, [matchId, endMatch, removeMatchedUser]);
};

export { usePageVisibility, useEndMatch };
