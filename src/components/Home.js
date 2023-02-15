import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "./SideBar";
import MatchButton from "./MatchButton";
import StudyBuddyCard from "./StudyBuddyCard";
import Matched from "./Matched";

function Home() {
  const navigate = useNavigate();
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/");
    }

    if (!authToken) {
      navigate("/auth");
    }
  }, []);

  return (
    <div>
      <SideBar />
      {matched ? (
        <Matched matchData={{ username: "Burak" }} />
      ) : (
        <>
          <StudyBuddyCard />
          <MatchButton />
        </>
      )}
    </div>
  );
}

export default Home;
