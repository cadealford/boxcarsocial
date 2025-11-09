import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { initBgWordScroll, initSmoothScroll, mountCursor } from "./interactions.js";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (typeof window !== "undefined") {
  const bootInteractions = () => {
    mountCursor();
    initSmoothScroll();
    initBgWordScroll();
  };

  if (document.readyState === "complete") {
    requestAnimationFrame(bootInteractions);
  } else {
    window.addEventListener(
      "load",
      () => requestAnimationFrame(bootInteractions),
      { once: true }
    );
  }
}
