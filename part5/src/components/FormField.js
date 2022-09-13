const FormField = ({ name, value, inputChange }) => (
  <tr>
    <td>
      <label htmlFor={ name }>{ name }</label>
    </td>
    <td />
    <td>
      <input
        id={ name } 
        type="text"
        value={ value }
        onChange={({ target }) => inputChange(target.value)}
      />
    </td>
  </tr>
)

export default FormField