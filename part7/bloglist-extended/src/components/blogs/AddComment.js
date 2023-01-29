import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../../reducers/blogsReducer'
import { Button, Form, Modal } from 'react-bootstrap'

const AddComment = ({ blog }) => {

  const [comment, setComment] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [commentLength, setCommentLength] = useState(0)

  const MAX_COMMENT_LENGTH = 150

  const dispatch = useDispatch()

  const inputChange = (event) => {
    let input = event.target.value

    if (input.length > MAX_COMMENT_LENGTH)
      input = input.substring(0, MAX_COMMENT_LENGTH)

    setComment(input)
    setCommentLength(input.length)
  }

  const addComment = () => {
    dispatch(addCommentToBlog(comment, blog))
    close()
  }

  const close = () => {
    setShowModal(false)
    setComment('')
    setCommentLength(0)
  }

  return (
    <div className='my-4'>
      <Button variant='secondary' onClick={ () => setShowModal(true) }>
        add comment
      </Button>

      <Modal centered show={ showModal } onHide={ close }>
        <Modal.Header closeButton>
          <Modal.Title>New Comment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your Comment</Form.Label>
              <Form.Control as="textarea" rows={ 3 } onChange={ inputChange }
                value={ comment }/>
            </Form.Group>
          </Form>
          <div style={{ color: 'lightgrey', fontSize: '0.85em' }}
            className='float-end'>
            { `${ commentLength } / ${ MAX_COMMENT_LENGTH }`}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={ close }>
            Cancel
          </Button>
          <Button variant="primary" onClick={ addComment }>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddComment
