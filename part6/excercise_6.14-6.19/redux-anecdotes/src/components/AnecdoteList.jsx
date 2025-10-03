import { patchVote, upVote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterText = useSelector((state) => state.filter);
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  // const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);
  const filteredAnecdotes = !!filterText
    ? sortedAnecdotes.filter((anecdote) =>
        anecdote.content.includes(filterText)
      )
    : sortedAnecdotes;

  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    dispatch(patchVote(anecdote));
    dispatch(showNotification(`You have voted for ${anecdote.content}`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
