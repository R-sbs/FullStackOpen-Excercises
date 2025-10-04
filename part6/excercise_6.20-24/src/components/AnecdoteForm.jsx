import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests/anecdotes.api";
import { useNotification } from "../contexts/notifications.context";

const AnecdoteForm = () => {
  const { notify } = useNotification();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
      notify(`Added New Anecdote ${content}`, "success", 3000);
    },
    onError: (err) => {
      const errMessage = err.response.data.error;
      notify(`${errMessage}`, "error", 3000);
      return errMessage;
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (!content) return;
    newAnecdoteMutation.mutate({ content });
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
