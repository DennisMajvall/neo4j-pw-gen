import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@neo4j-ndl/base/lib/neo4j-ds-styles.css";
import { PasswordGeneratorDialog } from "./components/password-generator-dialog";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PasswordGeneratorDialog />
  </React.StrictMode>
);
