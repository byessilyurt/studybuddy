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
  const authorisedUser = localStorage.getItem("User");

  return (
    <div>
      <SideBar />
      {isMatched ? (
        <Matched matchData={{ username: "Burak" }} />
      ) : (
        <>
          {authorisedUser ? (
            <h1 className="text-2xl text-center">
              Welcome {JSON.parse(authorisedUser).email}
            </h1>
          ) : (
            <h1 className="text-2xl text-center">Welcome</h1>
          )}

          <StudyBuddyCard />
          <MatchButton />
        </>
      )}
    </div>
  );
}

export default Home;
