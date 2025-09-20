import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CommentContextProvider } from "./context/CommentContext.jsx";

createRoot(document.getElementById("root")).render(
  <CommentContextProvider>
    <App />
  </CommentContextProvider>
);
