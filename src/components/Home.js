import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SideDrawer from "./SideDrawer";
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
      <SideDrawer />
      <h1>Welcome to App</h1>
      <button onClick={handlelogout}>Log out</button>
    </div>
  );
}

export default Home;
