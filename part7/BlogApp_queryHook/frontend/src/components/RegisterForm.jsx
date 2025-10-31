import React, { useState } from "react";
import Notification from "./Notification.jsx";
import { register } from "../services/login.js";
import { useNavigate, useNavigation } from "react-router-dom";

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register(formData);

      if (res && res.username) {
        showNotification("Registration successful!", "success");
        if (onSuccess) onSuccess();
        navigate("/");
      } else {
        throw new Error(res?.error || "Registration failed");
      }
    } catch (error) {
      const message = error.toString();
      showNotification(message, "error");
    }
  };

  return (
    <div className="card mt-12 max-w-xs mx-auto">
      <form onSubmit={handleSubmit}>
        <p className="flex justify-between items-start">
          <label htmlFor="username" className="font-semibold">
            Username *
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 border"
            autoComplete="off"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </p>

        <p className="flex justify-between items-start">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 border"
            value={formData.name}
            onChange={handleChange}
          />
        </p>
        <p className="flex justify-between items-start">
          <label htmlFor="password" className="font-semibold">
            Password *
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-white rounded-sm text-gray-800 p-1 px-4 my-1 border"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </p>
        <button
          type="submit"
          className="my-2 bg-blue-500 px-6 py-2 rounded-full text-base text-white font-bold"
        >
          Register
        </button>
      </form>
      <Notification message={notification.message} type={notification.type} />
    </div>
  );
};

export default RegisterForm;
