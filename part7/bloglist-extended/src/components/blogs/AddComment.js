import { FlexRow } from '../styled'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../../reducers/blogsReducer'

const AddComment = ({ blog }) => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const addComment = (event) => {
    event.preventDefault()
    dispatch(addCommentToBlog(comment, blog))
    setComment('')
  }

  const inputChange = (event) =>
    setComment(event.target.value)

  return (
    <form onSubmit={ addComment }>
      <FlexRow>
        <input type='text' value={ comment } onChange={ inputChange }/>
        <input type='submit' value='add comment'/>
      </FlexRow>
    </form>
  )
}

export default AddComment
