import Input from "./Input"

const Filter = ({state, onFilterChange}) => 
    <Input 
    label='filter by name' 
    state={state} 
    onStateChange={onFilterChange} />
  
  export default Filter