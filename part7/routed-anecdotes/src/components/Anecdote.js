const Anecdote = ({ anecdote }) => {
  return(
    <>
      <h1>{ `${ anecdote.content } by ${ anecdote.author }` }</h1>
      <p>{ `has ${ anecdote.votes } votes`}</p>
      <p>for more info see <a href={ anecdote.info }>{ anecdote.info }</a></p>
    </>
  )
}

export default Anecdote