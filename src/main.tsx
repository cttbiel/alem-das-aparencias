import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MediaKitApp from "./media_kit_alessandra";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MediaKitApp />
  </StrictMode>,
);
