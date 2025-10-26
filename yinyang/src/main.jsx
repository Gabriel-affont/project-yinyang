import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SkillProvider } from "./context/SkillContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <SkillProvider>
      <App/>
    </SkillProvider>
    </AuthProvider>
  </React.StrictMode>
);