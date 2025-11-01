import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = async (apiUrl) => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const create = async (apiUrl, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(apiUrl, newObject, config);
  return response.data;
};

// const update = async (id, newObject) => {
//   const response = await axios.put(`${baseUrl}/${id}`, newObject);
//   return response.data;
// };

export default { getAll, create, setToken };
