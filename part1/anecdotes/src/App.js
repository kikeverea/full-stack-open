import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    let newSelected = selected;
    while(newSelected === selected) {
      newSelected = randomInt(anecdotes.length);
    }

    setSelected(newSelected);
  }
  const voteForAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }
  
  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={voteForAnecdote} text="vote" />
      <Button onClick={nextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <WinnerAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  )
}

const WinnerAnecdote = ({anecdotes, votes}) => {
  let winnerInd = determineWinnerIndex(votes);

  if(winnerInd >= 0) {
      return (<Anecdote anecdote={anecdotes[winnerInd]} votes={votes[winnerInd]} />)
  }
  else {
    return (<p>No votes yet</p>)
  }
}
 
const randomInt = (max) => Math.floor(Math.random() * max)

const determineWinnerIndex = (votes) => {
  let winner = 0;
  let hasVotes = false;

  for(let i = 1; i < votes.length; i++) {
    let winnerVotes = votes[winner];
    let compareVotes = votes[i];

    if (compareVotes > winnerVotes) {
      winner = i;
    }

    hasVotes = hasVotes || (winnerVotes + compareVotes) > 0;
  }

  return (hasVotes ? winner : -1)
}

const Anecdote = ({anecdote, votes}) => 
    <div>
      {anecdote}
      <VoteCount count={votes} />
    </div>

const VoteCount = ({count}) =>
  <h4>Has {count > 0 ? count : 'no'} votes</h4>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

export default App
