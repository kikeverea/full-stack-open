import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault();

    if (!newName.trim())
      return;

    const personToAdd = {
      name: newName
    }
    setPersons(persons.concat(personToAdd));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: 
            <input 
              value={newName} 
              onChange={onNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneBook persons={persons} />
    </div>
  )
}

// const PersonForm = () =>
//   <form>
//     <div>
//       name: <Input value={newName} onChange={onInputChange}/>
//     </div>
//     <div>
//       <button type="submit">add</button>
//     </div>
//   </form>

const PhoneBook = ({persons}) =>
  persons.map(person =>
    <p key={person.name}>{person.name}</p>)

export default App