import { Form } from 'react-bootstrap'

const FormField = ({ name, type = 'text', value, inputChange }) => {

  return (
    <Form.Group className="mb-3">
      <Form.Label>{ name }</Form.Label>
      <Form.Control
        id={ name }
        type={ type }
        value={ value }
        onChange={ ({ target }) => inputChange(target.value) }/>
    </Form.Group>
  )
}

export default FormField