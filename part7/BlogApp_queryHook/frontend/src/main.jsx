import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NotificationProvider } from "./contexts/notification.jsx";
import Notification from "./components/Notification.jsx";
import { UserProvider } from "./contexts/user.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <NotificationProvider>
        <App />
        <Notification />
      </NotificationProvider>
    </UserProvider>
  </StrictMode>
);
