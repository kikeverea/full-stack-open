import { useState } from 'react'
import "./App.css"

import PhoneBook from "./components/PhoneBook"
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [showPersons, setShowPersons] = useState([]);

  const addNewPerson = (event) => {
    event.preventDefault()

    const nameInput = newName.trim()
    const phoneInput = newPhone.trim()

    if (validInput(nameInput, phoneInput)) 
      addPerson(newPerson(nameInput, phoneInput))

    resetInputs()
  }

  const validInput = (name, phone) => {
    if (!name || !phone)
      return false

    if(personAlreadyExists(name)) {
      alert(`${name} is already added to phone book`)
      return false
    }

    return true
  }

  const personAlreadyExists = (name) =>
    persons.filter(person => person.name === name).length > 0

  const addPerson = (person) => {
    setPersons(persons.concat(person))
    setShowPersons(filterByName(showPersons.concat(person), filter))
  }

  const resetInputs = () => {
    setNewName('')
    setNewPhone('')
  }

  const newPerson = (personName, personPhone) => {
    return({
      name: personName,
      phone: personPhone
    })
  }
  
  const nameInput = {
    state: newName,
    onChange: setNewName  
  }

  const phoneInput = {
    state: newPhone,
    onChange: setNewPhone    
  }

  const onFilterChange = (personName) => {
    setFilter(personName);
    setShowPersons(filterByName(persons, personName))
  }

  const filterByName = (array, name) => {
    return (
      name
      ? array.filter(person =>
          person.name.toLowerCase().startsWith(name.toLowerCase()))
      : array)
  }

  return (
    <div id='root'>
      <h2>Phonebook</h2>
      <Filter 
        state={filter} 
        onFilterChange={onFilterChange} />
      <NewPersonForm 
        nameInput={nameInput} 
        phoneInput={phoneInput} 
        onSubmit={addNewPerson} 
      />
      <h2>Numbers</h2>
      <PhoneBook persons={showPersons} />
    </div>
  )
}

export default App