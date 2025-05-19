import React, {  } from "react";
//type can either be 'success' or 'error'
const Notification = ({ message, type }) => {
  if (!message) return null;

  const styles = {
    border: type === "error" ? "red" : "green",
    color: type === "error" ? "red" : "green",
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-100 p-4 px-8 mx-auto rounded-xs bg-neutral-200 animate-slide"
      style={styles}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
