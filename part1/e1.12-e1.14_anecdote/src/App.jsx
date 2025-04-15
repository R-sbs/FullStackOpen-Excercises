import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const { highestVoteNumber, indexOfHVN } = getMostVotedAnecdote();

  function getRandomInt(max) {
    const randomNum = Math.floor(Math.random() * max);
    return randomNum;
  }

  function getMostVotedAnecdote() {
    const highestVoteNumber = Math.max(...votes);
    const indexOfHVN = votes.indexOf(highestVoteNumber);
    return { highestVoteNumber, indexOfHVN };
  }

  const handleNextAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length));
  };

  const handleVoteAnecdote = () => {
    const updatedArr = [...votes];
    updatedArr[selected] += 1;
    setVotes(updatedArr);
  };

  return (
    <div style={{ maxWidth: "520px", margin: "50px auto" }}>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{votes[selected]} Votes</p>
      <div style={{ display: "flex", gap: "20px", justifyContent: "start" }}>
        <button onClick={handleVoteAnecdote}>Vote</button>
        <button onClick={handleNextAnecdote}>Next Anecdote</button>
      </div>
      <hr></hr>
      <h1>Most Voted Anecdote All Time</h1>
      <p>{highestVoteNumber} Votes</p>
      {anecdotes[indexOfHVN]}
    </div>
  );
};

export default App;

// Generating Random Number between 0 and X genrated from console.
// const randomNumber = Number((Math.random()*X).toFixed(0));

//as per mdn docs
// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
