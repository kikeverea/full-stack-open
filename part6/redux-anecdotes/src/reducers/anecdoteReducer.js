import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const voteAnecdoteId = action.payload
      return state.map(
        anecdote =>
          anecdote.id === voteAnecdoteId
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote)
        .sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)
    },
    createAnecdote(state, action) {
      state.concat(asObject(action.payload))
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer