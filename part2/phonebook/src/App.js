import { useState , useEffect} from 'react'
import "./App.css"

import PhoneBook from "./components/PhoneBook"
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const showPersons = 
    filter
      ? persons.filter(person =>
          person.name.toLowerCase().startsWith(filter.toLowerCase()))
      : persons
  
  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        console.log('persons', persons);
        setPersons(persons)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const nameInput = newName.trim()
    const phoneInput = newPhone.trim()

    if (validInput(nameInput, phoneInput)) {
      personService
        .create(newPerson(nameInput, phoneInput))
        .then(newPerson => setPersons(persons.concat(newPerson)))
    }
      
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

  const newPerson = (personName, personPhone) => {
    return({
      name: personName,
      number: personPhone
    })
  }

  const personAlreadyExists = (name) =>
    persons.filter(person => person.name === name).length > 0

  const resetInputs = () => {
    setNewName('')
    setNewPhone('')
  }

  const nameInput = {
    state: newName,
    onChange: setNewName  
  }

  const phoneInput = {
    state: newPhone,
    onChange: setNewPhone    
  }

  return (
    <div id='root'>
      <h2>Phonebook</h2>
      <Filter 
        state={filter} 
        onFilterChange={filter => setFilter(filter)} />
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