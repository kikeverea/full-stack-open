import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../../reducers/blogsReducer'
import { Button } from 'react-bootstrap'
import InputDialog from './InputDialog'

const AddComment = ({ blog }) => {

  const [showModal, setShowModal] = useState(false)

  const MAX_COMMENT_LENGTH = 150

  const dispatch = useDispatch()

  const addComment = (comment) => {
    dispatch(addCommentToBlog(comment, blog))
    close()
  }

  const close = () =>
    setShowModal(false)

  return (
    <div className='my-4'>
      <Button variant='secondary' onClick={ () => setShowModal(true) }>
        add comment
      </Button>
      <InputDialog
        show={ showModal }
        title='New Comment'
        subtitle='Your Comment'
        buttonLabel='Add Comment'
        format='long'
        maxLength={ MAX_COMMENT_LENGTH }
        onClose={ addComment }
        onCancel={ close } />
    </div>
  )
}

export default AddComment
