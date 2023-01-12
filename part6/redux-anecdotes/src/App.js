import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const createNewAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      { anecdotes.map(anecdote =>
        <div key={anecdote.id} style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '8px 0 8px 0' }}>
          <div>
            {anecdote.content}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={ createNewAnecdote }>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App