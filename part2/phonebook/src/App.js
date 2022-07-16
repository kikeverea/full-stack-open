import { useState } from 'react'
import "./App.css"

import PhoneBook from "./components/PhoneBook"
import NewPhoneForm from './components/NewPhoneForm'
import Input from './components/Input'

const App = ({initData}) => {
  const [persons, setPersons] = useState(initData)
  const [showPersons, setShowPersons] = useState(initData)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    setShowPersons(persons.concat(personToAdd));
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

  const nameInputState = {
    state: newName,
    onChange: setNewName  
  }

  const phoneInputState = {
    state: newPhone,
    onChange: setNewPhone    
  }

  const filterByName = (personName) => {
    setNewFilter(personName);
    setShowPersons(personName
      ? persons.filter(person =>
        person.name.toLowerCase().startsWith(personName.toLowerCase()))
      : persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input 
        label="filter by name" 
        state={newFilter} 
        onStateChange={filterByName} />
      <NewPhoneForm 
        nameInput={nameInputState} 
        phoneInput={phoneInputState} 
        onSubmit={addNewPerson} 
      />
      <h2>Numbers</h2>
      <PhoneBook persons={showPersons} />
    </div>
  )
}

export default App