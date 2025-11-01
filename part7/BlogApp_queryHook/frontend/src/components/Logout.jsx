import React from "react";
import {
  ArrowDownLeftFromSquareIcon,
  ArrowUpLeftFromSquareIcon,
  ArrowUpRightFromSquareIcon,
} from "lucide-react";
import { notify } from "./Notification";
import { useNotification } from "../contexts/notification";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { dispatch } = useNotification();
  const { dispatch: userDispatch } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure about logging out?");
    if (confirmed) {
      localStorage.clear();
      userDispatch({ type: ACTIONS.LOGOUT });
      notify(dispatch, "Logged Out Successfully", "success");
      navigate("/auth");
    }
  };
  return (
    <button
      className="flex  items-center gap-2 text-red-500 px-4 py-2 rounded-md"
      onClick={handleLogout}
    >
      Logout
      <ArrowUpRightFromSquareIcon size={14} />
    </button>
  );
};

export default Logout;
