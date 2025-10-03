import { useSelector } from "react-redux";

export const Notification = () => {
  const notificationID = useSelector((state) => state.notification);
  const anecdotes = useSelector((state) => state.anecdotes);

  const notification = anecdotes.filter((each) => each.id === notificationID);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    notification.length > 0 && (
      <div
        style={style}
      >{`You have Voted for ${notification[0]?.content}`}</div>
    )
  );
};
