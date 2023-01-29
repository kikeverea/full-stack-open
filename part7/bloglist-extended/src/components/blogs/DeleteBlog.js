import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'

const DeleteBlog = ({ blog, deleteBlog, className }) => {

  const [showAlert, setShowAlert] = useState(false)

  return (
    <>
      <Button
        variant='outline-danger' className={ className }
        onClick={ () => setShowAlert(true) }>
        remove
      </Button>

      <Modal show={ showAlert }>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ `Delete blog '${ blog.title }'?` }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ () => setShowAlert(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={ () => deleteBlog()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteBlog