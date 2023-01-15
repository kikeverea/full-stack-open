import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import service from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value

    const created = await service.createNew(anecdote)
    dispatch(createAnecdote(created))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={ createNewAnecdote }>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm