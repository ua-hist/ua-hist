import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App1 } from "./App1.tsx";

import "./utils/i18n.ts";
import "leaflet-arrowheads";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App1 />
  </React.StrictMode>,
);
