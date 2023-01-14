import { useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { hideNotification, showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.filter
      ? state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
      : state.anecdotes
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(hideNotification()), 5000)
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
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList