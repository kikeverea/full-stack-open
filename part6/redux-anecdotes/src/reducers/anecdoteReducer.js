import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

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
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew({ content, votes: 0 })
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer