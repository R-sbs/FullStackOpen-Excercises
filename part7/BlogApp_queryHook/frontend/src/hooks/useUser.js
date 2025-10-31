import { useContext } from "react";
import { userContext } from "../contexts/user.context";

export const useUser = () => {
  return useContext(userContext);
};
