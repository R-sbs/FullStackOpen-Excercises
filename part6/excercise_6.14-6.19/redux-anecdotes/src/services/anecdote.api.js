import axios from "axios";
import { getId } from "../reducers/anecdoteReducer";
import { useSelector } from "react-redux";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, id: getId(), votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateVote = async (anecdote) => {
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, {
    votes: anecdote.votes + 1,
  });

  return response.data;
};

export default { getAll, createNew, updateVote };
