import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ActivityProvider } from "./context/ActivityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ActivityProvider>
          <App />
        </ActivityProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
