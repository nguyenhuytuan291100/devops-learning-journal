import React from "react";
import ReactDOM from "react-dom/client";
import App from "./frameworks/ui/App";
import { App as AntApp } from "antd";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AntApp><App /></AntApp>
  </React.StrictMode>
);
