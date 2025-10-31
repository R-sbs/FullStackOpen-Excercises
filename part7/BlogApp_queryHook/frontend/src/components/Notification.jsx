import React from "react";
import { useNotification } from "../contexts/notification";
import { useEffect } from "react";

const Notification = () => {
  const { state, dispatch } = useNotification();

  const styles = {
    border: state.type === "error" ? "red" : "green",
    color: state.type === "error" ? "red" : "green",
  };

  useEffect(() => {
    if (state.message) {
      const timeout = setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [state.message]);

  if (!state.message) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-100 p-4 px-8 mx-auto rounded-xs bg-neutral-200 animate-slide"
      style={styles}
    >
      <p>{state.message}</p>
    </div>
  );
};

export default Notification;

export const notify = (dispatch, message, type = "info") => {
  dispatch({
    type: "SHOW",
    payload: { message, type },
  });

  setTimeout(() => {
    dispatch({ type: "HIDE" });
  }, 4000);
};
