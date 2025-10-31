import React, { useState } from "react";
import Notification, { notify } from "./Notification.jsx";
import { ACTIONS } from "../contexts/user.context.jsx";
import { login } from "../services/login.js";
import { useNavigate } from "react-router-dom";

import { useNotification } from "../contexts/notification.jsx";
import { useUser } from "../hooks/useUser.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const { dispatch: userDispatch } = useUser();
  const { dispatch } = useNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      const res = await login(credentials);

      if (res.statusText === "OK") {
        userDispatch({ type: ACTIONS.LOGIN, payload: res.data });
        setTimeout(() => {
          navigate("/");
        }, 1500);
        notify(dispatch, "Logged in SuccessFully", "success");
      } else if (res.status === 401) {
        throw new Error(res.response.data.error);
      }
    } catch (error) {
      const message = error.toString();
      notify(dispatch, message, "error");
    }
  };
  return (
    <div className="card mt-12">
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username" className="font-semibold">
            Username :{" "}
          </label>
          <input
            type="text"
            name="Username"
            id="username"
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 border"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password" className="font-semibold">
            Password :{" "}
          </label>
          <input
            type="password"
            name="Password"
            id="password"
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 border"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <button
          type="submit"
          className="my-2 bg-blue-500 px-6 py-2 rounded-full text-base text-white font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
