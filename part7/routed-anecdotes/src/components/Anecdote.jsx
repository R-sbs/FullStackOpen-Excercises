import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Anecdote = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const anecdote = props.anecdotes.find((item) => item.id === parseInt(id));

  if (!anecdote) return <p>Not Found</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold">{anecdote.content}</h2>
      <p className="py-4">
        Has <span className="font-semibold">{anecdote.votes}</span> Votes
      </p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Anecdote;
