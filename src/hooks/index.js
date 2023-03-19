import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

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

const useMatchChangeListener = (matchId, removeMatchedUser) => {
  useEffect(() => {
    if (!matchId) return;
    console.log("match change listener fired");
    const matchDocRef = doc(db, "matches", matchId);

    const unsubscribe = onSnapshot(matchDocRef, (docSnapshot) => {
      if (!docSnapshot.exists()) {
        removeMatchedUser();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [matchId, removeMatchedUser]);
};

export { usePageVisibility, useEndMatch, useMatchChangeListener };
