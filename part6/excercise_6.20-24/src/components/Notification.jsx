import { useEffect } from "react";
import { useNotification } from "../contexts/notifications.context";

const NotificationDisplay = () => {
  const { notifications, hideNotification } = useNotification();

  const Notification = ({ id, message, type, duration }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        hideNotification(id);
      }, duration);
      return () => clearTimeout(timer);
    }, [id, duration]);

    const style = {
      border: "solid",
      padding: 10,
      borderWidth: 1,
      marginBottom: 5,
    };

    //  const baseStyle = 'p-3 m-2 rounded shadow-lg text-white transition-all duration-300';
    //   let typeStyle = 'bg-blue-500'; // info default
    //   if (type === 'error') typeStyle = 'bg-red-600';
    //   if (type === 'success') typeStyle = 'bg-green-600';

    return (
      <div style={style}>
        <span>{message}</span>
      </div>
    );
  };

  if (notifications.length === 0) return null;

  return (
    <>
      {notifications.map((n) => (
        <div key={n.id} className="pointer-events-auto">
          <Notification {...n} />
        </div>
      ))}
    </>
  );
};

export default NotificationDisplay;
