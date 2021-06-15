import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients',
  ];

  //  Generate array base 0 = anecdotes.length
  const points = Array.apply(null, new Array(anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  );

  // indexOf array anecdotes
  const [selected, setSelected] = useState(0);
  // array number of votes
  const [votes, setVotes] = useState(points);

  // random number index
  const generateQuote = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  };

  const handleVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <button onClick={handleVote}>vote</button>
      <button onClick={generateQuote}>next anecdote</button>

      <h1>Anecdote with the most votes</h1>
      {anecdotes[votes.indexOf(Math.max(...votes))]}
    </>
  );
};

export default App;
