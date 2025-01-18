import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@neo4j-ndl/base/lib/neo4j-ds-styles.css";
import "./index.css";
import { PasswordGeneratorDialog } from "./components/password-generator-dialog/password-generator-dialog.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PasswordGeneratorDialog />
  </StrictMode>
);
