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

  const onPersonFormSubmit = (event) => {
    event.preventDefault()

    const nameInput = newName.trim()
    const phoneInput = newPhone.trim()

    if (invalidInput(nameInput, phoneInput)) {
      alert("Both 'name' and 'phone' fields are required")
      resetInputs()
      return
    }
      
    const alreadyAdded = persons.find(person => person.name === nameInput)
    
    if (alreadyAdded) updatePersonNumber(alreadyAdded, phoneInput)

    else addNewPerson(newPerson(nameInput, phoneInput))
    
    resetInputs()
  }

  const invalidInput = (name, phone) => {
    return !name || !phone
  }

  const updatePersonNumber = (person, phoneNumber) => {
    const abortUpdate = !assertDifferentNumbers(person, phoneNumber) ||
                        !confirmUpdate(person.name)                        
    if(abortUpdate) 
      return

    personService
      .update({...person, number: phoneNumber})
      .then(updated => 
        setPersons(persons.map(person => 
          person.id !== updated.id 
            ? person
            : updated)))
  }

  const assertDifferentNumbers = (person, number) => {
    if(person.number !== number) 
      return true

    alert(`${person.name} with number ${number} already added to the phonebook`)
    return false
  }

  const confirmUpdate = (name) => {
    return window.confirm(
      `${name} is already added to the phonebook. Replace the old number?`
      )
  }

  const addNewPerson = (person) =>
    personService
      .create(person)
      .then(newPerson => setPersons(persons.concat(newPerson)))

  const newPerson = (personName, personPhone) => {
    return({
      name: personName,
      number: personPhone
    })
  }

  const personAlreadyAdded = (name) =>
    persons.filter(person => person.name === name).length > 0

  const numberAlreadyAdded = (number) => 
    persons.filter(person => person.number === number).length > 0
  
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
        onSubmit={onPersonFormSubmit} 
      />
      <h2>Numbers</h2>
      <PhoneBook persons={showPersons} onPersonsChange={setPersons} />
    </div>
  )
}

export default App