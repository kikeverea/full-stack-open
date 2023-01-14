import { useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    anecdotes.map(anecdote =>
      <div
        key={anecdote.id}
        style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '8px 0 8px 0' }}>
        <div>
          {anecdote.content}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList