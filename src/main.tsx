import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DiagnosticoComprador from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DiagnosticoComprador />
  </StrictMode>
);