import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";
import { ModalProvider } from "./context/Modal";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ModalProvider>
    <App />
  </ModalProvider>
);
