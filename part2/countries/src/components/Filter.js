const Filter = ({state, onStateChange}) => {
    const onChange = event => 
        onStateChange(event.target.value)

    return (
        <>
        Find countries: <input value={state} onChange={onChange} />
        </>
    )
}

    export default Filter