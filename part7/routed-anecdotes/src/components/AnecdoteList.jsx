import { Link } from "react-router-dom";

export const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2 className="text-lg font-semibold uppercase mb-2">Anecdotes</h2>
    <ul className="list-disc list-inside">
      {anecdotes.map((anecdote) => (
        <Link
          key={anecdote.id}
          to={`/anecdotes/${anecdote.id}`}
          className="my-2 hover:underline"
        >
          <li>{anecdote.content}</li>
        </Link>
      ))}
    </ul>
  </div>
);
