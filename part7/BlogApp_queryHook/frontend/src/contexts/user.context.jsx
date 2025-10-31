import { createContext, useEffect, useReducer } from "react";

export const userContext = createContext();

export const ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  INIT: "init",
};

//userReducer function for managing user state
function userReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return action.payload;
    case ACTIONS.LOGOUT:
      return null;
    case ACTIONS.INIT:
      return action.payload;
    default:
      return state;
  }
}

//provider component
export function UserProvider({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, dispatch] = useReducer(userReducer, storedUser);

  //sync user, whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.clear();
    }
  }, [user]);

  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
}
