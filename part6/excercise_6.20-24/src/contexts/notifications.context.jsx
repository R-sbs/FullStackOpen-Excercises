import { useReducer } from "react";
import { createContext } from "react";
import notificationReducer from "./notifications.reducer";
import { useContext } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const notify = (message, type, duration = 3000) => {
    const id = Date.now();
    const newNotification = { id, message, type, duration };

    dispatch({
      type: "SHOW",
      payload: newNotification,
    });
  };

  const hideNotification = (id) => {
    dispatch({
      type: "HIDE",
      payload: { id },
    });
  };

  const contextValue = { notifications, notify, hideNotification };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  return useContext(NotificationContext);
};

export { NotificationProvider, useNotification };
