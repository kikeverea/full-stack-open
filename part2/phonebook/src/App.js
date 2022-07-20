import { useState , useEffect} from 'react'
import "./App.css"

import PhoneBook from "./components/PhoneBook"
import NewPersonForm from './components/NewPersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
      .then(updated => {
        setPersons(persons.map(person => person.id !== updated.id 
                                        ? person
                                        : updated))
        displayNotification(
          `Updated ${updated.name} number to ${updated.number}`, 'success')
      })
      .catch(error => 
        updateFailed(persons, person) 
      )
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

  const updateFailed = (persons, removed) => {
    alert(`${removed.name} was previously removed from the phone book. Update failed`)
    setPersons(persons.filter(person => person.id !== removed.id))
  }

  const addNewPerson = (person) =>
    personService
      .create(person)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        displayNotification(
          `Added ${newPerson.name} (${newPerson.number})`,'success')
      })

  const displayNotification = (message, type) => {
    setNotification({
      message: message,
      type: type
    })
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }

  const newPerson = (personName, personPhone) => {
    return({
      name: personName,
      number: personPhone
    })
  }

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
      <Notification notification={notification} />
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