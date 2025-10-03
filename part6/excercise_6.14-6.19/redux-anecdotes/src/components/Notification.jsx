import { useSelector } from "react-redux";

export const Notification = () => {
  const notificationMessage = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: "20px 0",
  };
  return (
    notificationMessage && (
      <div style={style}>{`You have Voted for - ${notificationMessage}`}</div>
    )
  );
};
