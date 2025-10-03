import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    if (content === "") return;
    dispatch(createAnecdote(content));
    dispatch(showNotification(`new anecdote '${content}' added.`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
