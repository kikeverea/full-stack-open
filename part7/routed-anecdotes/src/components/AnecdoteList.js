import { Link, useNavigate } from 'react-router-dom'
import Notification from './Notification'

const AnecdoteList = ({ anecdotes, notification }) => {

  const navigate = useNavigate()

  const navigateToAnecdote = (anecdote) => {
    navigate(`/anecdotes/${ anecdote.id }`)
  }

  return (
    <div>
      <Notification notification={ notification }/>
      <h2>Anecdotes</h2>
      <ul>
        { anecdotes.map(anecdote =>
          <li
            key={ anecdote.id }
            style={{ padding: '4px 0 4px 0' }}
            onClick={ () => navigateToAnecdote(anecdote) }>
            <Link to={ `/anecdotes/${ anecdote.id }` }>{ anecdote.content }</Link>
          </li>)
        }
      </ul>
    </div>
  )
}

export default AnecdoteList