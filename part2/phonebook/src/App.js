import { useState } from 'react'
import "./App.css"

import PhoneBook from "./components/PhoneBook"
import Input from "./components/Input"
import Button from "./components/Button"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault();

    const nameInput = newName.trim();
    const phoneInput = newPhone.trim();

    if (invalidInput(nameInput, phoneInput)) {
      resetInputs()
      return
    }

    const personToAdd = newPerson(nameInput, phoneInput)
    
    setPersons(persons.concat(personToAdd));
    resetInputs();
  }

  const invalidInput = (name, phone) => {
    if (!name || !phone)
      return true;

    if(phoneAlreadyExists(phone)) {
      alert(`Phone number ${phone} is already added to phone book`)
      return true
    }

    return false
  }

  const newPerson = (personName, personPhone) => {
    return({
      name: personName,
      phone: personPhone
    })
  }

  const phoneAlreadyExists = (phone) =>
    persons.filter(person => person.phone === phone).length > 0

  const resetInputs = () => {
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          <Input label="name" 
                 state={newName} 
                 onStateChange={setNewName} />
          
          <Input label="phone" 
                 state={newPhone} 
                 onStateChange={setNewPhone} />
        </div>
        <Button label="add" />
      </form>
      <h2>Numbers</h2>
      <PhoneBook persons={persons} />
    </div>
  )
}

export default App