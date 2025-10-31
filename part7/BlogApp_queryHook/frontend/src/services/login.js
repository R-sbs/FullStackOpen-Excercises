import axios from "axios";

const login = async (credentials) => {
  try {
    const response = await axios.post("/api/login", credentials);
    return response;
  } catch (error) {
    return error;
  }
};

const register = async (userData) => {
  try {
    const response = await axios.post("/api/register", userData);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Registration failed" };
  }
};

const getUser = async (id) => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { login, getUser, register };
