const Input = ({label, state, onStateChange}) => {
    const onChange = (event) =>
      onStateChange(event.target.value)
    
    return(
      <div>
        {label}: <input value={state} onChange={onChange} />
      </div>
    )
  }
  
  export default Input