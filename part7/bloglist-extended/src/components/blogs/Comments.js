import { FlexRow } from '../styled'
import { useDispatch, useSelector } from 'react-redux'
import { removeCommentFromBlog } from '../../reducers/blogsReducer'
import AddComment from './AddComment'
import { CloseButton, ListGroup } from 'react-bootstrap'

const Comments = ({ blog }) => {

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  const deleteComment = (comment) =>
    dispatch(removeCommentFromBlog(comment, blog, loggedInUser))

  return (
    <>
      <h5>Comments</h5>
      <AddComment blog={ blog }/>
      <ListGroup variant='flush'>
        { blog.comments.map(comment =>
          <ListGroup.Item key={ comment.id } className='py-3'>
            <FlexRow style={{ justifyContent: 'space-between' }}>
              <div>{ comment.comment }</div>
              <CloseButton onClick={ () => deleteComment(comment) } />
            </FlexRow>
          </ListGroup.Item>
        )}
      </ListGroup>
      {/*<div>*/}
      {/*  { blog.comments.map(comment =>*/}
      {/*    <FlexRow key={ comment.id } style={{ alignItems: 'center' }}>*/}
      {/*      <CloseButton onClick={ () => deleteComment(comment) } />*/}
      {/*      <div>{ comment.comment }</div>*/}
      {/*    </FlexRow>*/}
      {/*  )}*/}
      {/*</div>*/}
    </>
  )
}

export default Comments