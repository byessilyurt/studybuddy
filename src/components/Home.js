import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MatchContext } from "../context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideBar from "./SideBar";
import MatchButton from "./MatchButton";
import StudyBuddyCard from "./StudyBuddyCard";
import Matched from "./Matched";

function Home() {
  const navigate = useNavigate();
  const { isMatched } = useContext(MatchContext);
  const authorisedUser = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    showWarningNotification();
  }, []);

  const showWarningNotification = () => {
    toast.warning("⚠️ Don't close or switch the tab during a match!", {
      position: "bottom-right",
      autoClose: 10000, // 5 seconds
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <SideBar />
      <ToastContainer />
      {isMatched ? (
        <Matched />
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
