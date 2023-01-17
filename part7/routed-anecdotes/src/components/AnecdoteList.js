import { Link, useNavigate } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => {

  const navigate = useNavigate()
  const navigateToAnecdote = (anecdote) => {
    navigate(`/anecdotes/${ anecdote.id }`)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        { anecdotes.map(anecdote =>
          <li key={ anecdote.id }
            onClick={ () => navigateToAnecdote(anecdote) }>
            <Link to={ `/anecdotes/${ anecdote.id }` }>{ anecdote.content }</Link>
          </li>)
        }
      </ul>
    </div>
  )
}

export default AnecdoteList