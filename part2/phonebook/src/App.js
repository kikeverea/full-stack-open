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

    const nameInput = newName.trim();

    if (!nameInput) {
      setNewName('')
      return
    }

    if(nameIsPresent(nameInput)) {
      alert(`${nameInput} is already added to phone book`)
      return
    }

    const personToAdd = {
      name: nameInput
    }
    
    setPersons(persons.concat(personToAdd));
    setNewName('');
  }

  const nameIsPresent = (name) =>
    persons.filter(person => person.name === name).length > 0

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

const PhoneBook = ({persons}) =>
  persons.map(person =>
    <p key={person.name}>{person.name}</p>)

export default App