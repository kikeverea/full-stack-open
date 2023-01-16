import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from "react-redux";

const AnecdoteForm = (props) => {

  const createNewAnecdote = async (event) => {

    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    event.target.anecdote.value = ''
    props.showNotification(`new anecdote '${ content }'`, 5)
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

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: content => {
      return dispatch(createAnecdote(content))
    },
    showNotification: (content, duration) => {
      return dispatch(showNotification(content, duration))
    }
  }
}


export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)