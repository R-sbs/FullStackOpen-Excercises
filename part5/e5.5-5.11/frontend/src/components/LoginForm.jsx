import React, { useState } from "react";
import Notification from "./Notification.jsx";
import { login } from "../services/login.js";

const LoginForm = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({message: null, type: null});

  const showNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => setNotification({ message: null, type: null}), 3000)
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      const res = await login(credentials);
      if (res.status === 200) {
        setLoggedIn(true);
        showNotification('Logged in SuccessFully', 'success')
        await navigation.navigate('/').finished;
      } else if( res.status === 401 ){
        throw new Error(res.response.data.error)
      }
    } catch (error) {
      const message = error.toString();
      showNotification(message, 'error');
    }
  };
  return (
    <div className="card mt-12">
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">Username </label>
          <input
            type="text"
            name="Username"
            id="username"
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="Password"
            id="password"
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <button type="submit" className="my-2">
          Login
        </button>
      </form>
      <Notification message={notification.message} type={notification.type} />
    </div>
  );
};

export default LoginForm;
