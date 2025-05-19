import axios from "axios";

const login = async (credentials) => {
  try {
    const response = await axios.post("/api/login", credentials);
    const JSONData = JSON.stringify(response.data)
    localStorage.setItem("token", JSONData);
    return response;
  } catch (error) {
    return error;
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

export { login, getUser };
