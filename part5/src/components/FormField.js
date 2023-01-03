const FormField = ({ name, value, inputChange }) => {

  const style = {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  }

  return (
    <div style={ style }>
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        type="text"
        value={value}
        onChange={({target}) => inputChange(target.value)}
      />
    </div>
  )
}

export default FormField