import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Auth from "./components/Auth";
import Home from "./components/Home";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let userStorage = localStorage.getItem("User");
    if (userStorage) {
      navigate("/");
    } else {
      console.log("fired auth");
      navigate("/auth");
    }
  }, [localStorage.getItem("User")]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};
export default App;
