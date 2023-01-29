import { Button, Form, Modal } from 'react-bootstrap'
import { useState } from 'react'

const InputDialog = ({
  show, value = '', title, subtitle, buttonLabel = 'Submit',
  maxLength = -1, format = 'short', onClose, onCancel
}) => {

  const [ input, setInput ] = useState(value)
  const [ inputLength, setInputLength ] = useState(value.length)

  const inputChange = (event) => {

    let input = event.target.value
    if (maxLength !== -1 && input.length > maxLength)
      input = input.substring(0, maxLength)

    setInput(input)
    setInputLength(input.length)
  }

  const clear = () => {
    setInput('')
    setInputLength(0)
  }

  const close = () => {
    onClose(input)
    clear()
  }

  const cancel = () => {
    clear()
    onCancel()
  }

  const formInput = format === 'long'
    ? <Form.Control
      as='textarea'
      rows={ 3 }
      onChange={inputChange}
      value={input} />
    : <Form.Control
      onChange={inputChange}
      value={input} />

  return (
    <Modal centered show={ show } onHide={ cancel }>
      <Modal.Header closeButton>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>{ subtitle }</Form.Label>
            { formInput }
          </Form.Group>
        </Form>
        { maxLength !== -1 &&
          <div
            style={{ color: 'lightgrey', fontSize: '0.85em' }}
            className='float-end'>
            {`${inputLength} / ${maxLength}`}
          </div>
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={ cancel }>
          Cancel
        </Button>
        <Button variant="primary" onClick={ close }>
          { buttonLabel }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


export default InputDialog