import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "sonner";
import TodosProvider from "./providers/TodoProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TodosProvider>
      <App />
      <Toaster richColors />
    </TodosProvider>
  </React.StrictMode>
);
