import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// REGISTER ERROR OVERLAY
const showErrorOverlay = (err: any) => {
  // must be within function call because that's when the element is defined for sure.
  const ErrorOverlay = customElements.get("vite-error-overlay");
  // don't open outside vite environment
  if (!ErrorOverlay) {
    return;
  }
  console.log(err);
  const overlay = new ErrorOverlay(err);
  document.body.appendChild(overlay);
};

window.addEventListener("error", showErrorOverlay);
window.addEventListener("unhandledrejection", ({ reason }) =>
  showErrorOverlay(reason)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
