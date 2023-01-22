import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <h1>Home</h1>
      <button onClick={handlelogout}>Log out</button>
    </div>
  );
}

export default Home;
