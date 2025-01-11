import React from "react";
import ReactDOM from "react-dom/client";
import "@neo4j-ndl/base/lib/neo4j-ds-styles.css";
import "./index.css";
import App from "./App";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
