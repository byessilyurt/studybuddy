import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MatchContext } from "../context";

import SideBar from "./SideBar";
import MatchButton from "./MatchButton";
import StudyBuddyCard from "./StudyBuddyCard";
import Matched from "./Matched";

function Home() {
  const navigate = useNavigate();
  const { isMatched } = useContext(MatchContext);

  return (
    <div>
      <SideBar />
      {isMatched ? (
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
