const Person = ({name, phone, onDelete}) => 
  <tr>
    <td>
      {name}
    </td>
    <td>
      {phone}
    </td>
    <td>
      <button onClick={onDelete}>delete</button>
    </td>
  </tr>

export default Person