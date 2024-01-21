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

  // Generate a random integer between 0 and n (excluding n)
  const randomInt = (n) => Math.floor(Math.random() * n);
  console.log(selected);

  const handleVotes = () => {
    const updateVotes = [...votes];
    updateVotes[selected] += 1;
    setVotes(updateVotes);
  };

  return (
    <div>
      {anecdotes[selected]} <br />
      Votes: {votes[selected]} <br />
      <button onClick={handleVotes}>vote</button>
      <button onClick={() => setSelected(randomInt(anecdotes.length))}>
        Next anecdote
      </button>
    </div>
  );
};

export default App;
