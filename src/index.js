import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Link } from "react-router-dom";

import "./index.css";
import App from "./App";
import { MatchProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MatchProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MatchProvider>
);
