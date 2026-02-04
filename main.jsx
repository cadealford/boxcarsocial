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
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    mountCursor();
    initSmoothScroll();
    initBgWordScroll();
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  };

  const trackPageView = () => {
    const endpoint = "https://script.google.com/macros/s/AKfycbydHz1gz8zphxtOcc3u7v7M4TViivy-RtpuP70g0TDQtDLLRooItLKv7IUFKeyvHvjgOw/exec";
    const params = new URLSearchParams({
      key: "fjIzrnNOvly2XjPRfiUFACs5OggLaPgr",
      path: window.location.pathname,
      ua: navigator.userAgent,
      ref: document.referrer || "",
    });
    fetch(`${endpoint}?${params.toString()}`).catch(() => {});
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

  trackPageView();
}
