import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const toUpdate = action.payload
      return state.map(
        anecdote =>
          anecdote.id === toUpdate.id
            ? toUpdate
            : anecdote)
        .sort(sortByVotes)
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    }
  }
})

const sortByVotes = (anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    anecdotes.sort(sortByVotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew({ content, votes: 0 })
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const voted = await anecdotesService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(updateAnecdote(voted))
  }
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer