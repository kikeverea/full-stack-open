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
      .then(persons => setPersons(persons))
  }, [])

  const onPersonFormSubmit = (event) => {
    event.preventDefault()

    const nameInput = newName.trim()
    const phoneInput = newPhone.trim()

    if (invalidInput(nameInput, phoneInput)) {
      displayError("Both 'name' and 'phone' fields are required")
      resetInputs()
      return
    }
      
    const alreadyAdded = persons.find(
      person => person.name.toLowerCase() === nameInput.toLowerCase())
    
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
      .then(updated => updateSucceeded(updated))
      .catch(error => updateFailed(error, person))
  }

  const assertDifferentNumbers = (person, number) => {
    if(person.number !== number) 
      return true

    displaySuccess(`${person.name} with number ${number} already in the phonebook`)
    return false
  }

  const confirmUpdate = (name) => {
    return window.confirm(
      `${name} is already added to the phonebook. Replace the old number?`
      )
  }

  const updateSucceeded = (updated) => {
    setPersons(persons.map(person => person.id !== updated.id 
                                      ? person
                                      : updated))
    displaySuccess(`Updated ${updated.name} number to ${updated.number}`)
  }

  const updateFailed = (error, removed) => {

    if (error.response.status === 404) {
      setPersons(persons.filter(person => person.id !== removed.id))
      displayError(`${removed.name} was previously removed from the phone book.\
                                    Update failed`)
    }
    else {
      displayError(formatErrorMessage(error))
    }
  }

  const addNewPerson = (person) =>
    personService
      .create(person)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        displaySuccess(`Added ${newPerson.name} (${newPerson.number})`)
      })
      .catch(error => {
        displayError(formatErrorMessage(error))
      })

  const formatErrorMessage = (error) => {
    const message = error.response.data.error.split(":")
    return message[message.length - 1]
  }

  const deletePerson = (person) => {
    const doDelete = window.confirm(`Delete ${person.name} ?`)
    if (doDelete) {
      personService
        .remove(person)
        .then(()=> deleteSucceeded(person))
        .catch(() => deleteSucceeded(person)) //we want same behaviour as if succeeded 
    }
  }

  const deleteSucceeded = (person) => {
    removeFromPersons(person)
    displaySuccess(`${person.name} removed from phone book`)
  }

  const removeFromPersons = (remove) =>
    setPersons(persons.filter(person => person.id !== remove.id))

  const displayNotification = (message, type) => {
    setNotification({
      message: message,
      type: type
    })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const displayError = (message) => {
    console.log(message)
    displayNotification(message, 'error')
  }

  const displaySuccess = (message) =>
    displayNotification(message, 'success')

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
      <PhoneBook persons={showPersons} onPersonDelete={deletePerson} />
    </div>
  )
}

export default App