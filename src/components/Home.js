import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "./SideBar";
import MatchButton from "./MatchButton";
import StudyBuddyCard from "./StudyBuddyCard";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/");
    }

    if (!authToken) {
      navigate("/auth");
    }
  }, []);

  const handlelogout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/auth");
  };

  return (
    <div>
      <SideBar />
      <StudyBuddyCard />
      <MatchButton />
    </div>
  );
}

export default Home;
