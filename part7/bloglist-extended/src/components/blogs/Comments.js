import AddComment from './AddComment'
import { DeleteButtonX, FlexRow } from '../styled'
import { useDispatch, useSelector } from 'react-redux'
import { removeCommentFromBlog } from '../../reducers/blogsReducer'

const Comments = ({ blog }) => {

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  const deleteComment = (comment) =>
    dispatch(removeCommentFromBlog(comment, blog, loggedInUser))

  return (
    <>
      <h3>Comments</h3>
      <AddComment blog={ blog }/>
      <div>
        { blog.comments.map(comment =>
          <FlexRow key={ comment.id } style={{ alignItems: 'center' }}>
            <DeleteButtonX onClick={ () => deleteComment(comment) }>X</DeleteButtonX>
            <div>{ comment.comment }</div>
          </FlexRow>
        )}
      </div>
    </>
  )
}

export default Comments