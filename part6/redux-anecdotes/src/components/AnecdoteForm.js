import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createNewAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
  }

  return (
    <form onSubmit={ createNewAnecdote }>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>)
}

export default AnecdoteForm