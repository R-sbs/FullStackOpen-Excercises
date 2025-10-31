import { createContext } from "react";
import { useContext } from "react";
import { useReducer } from "react";

const NotificationContext = createContext();

const initialState = {
  message: null,
  type: null, // 'success', 'error', 'info'
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        message: action.payload.message,
        type: action.payload.type || "info",
      };
    case "HIDE":
      return initialState;
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
