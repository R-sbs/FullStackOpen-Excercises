import axios from "axios";

export const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createAnecdote = (data) => {
  const response = axios.post(baseUrl, data).then((res) => res.data);
  return response;
};

export const updateVote = (data) => {
  const response = axios.put(`${baseUrl}/${data.id}`, data);
  return response;
};
