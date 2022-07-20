import Person from './Person'
import personService from '../services/personService'

const PhoneBook = ({persons, onPersonsChange}) => {
  
  const deletePerson = (person, persons, setPersons) => {
    const doDelete = window.confirm(`Delete ${person.name} ?`)
    if (doDelete) {
      personService
        .remove(person)
        .then(success => {
          if (success) 
            setPersons(removePersonFromList(persons, person))
        })
        .catch(error => {
          setPersons(removePersonFromList(persons, person))
        })
    }
  }
  
  const removePersonFromList = (persons, remove) =>
    persons.filter(person => person.id !== remove.id)

  return (
    persons.length === 0
    ? <p>No phones listed</p>
    : <table>
        <PhoneBookHeader />
        <tbody>
          {persons.map(person => 
            <Person key={person.name} 
                    name={person.name} 
                    phone={person.number}
                    onDelete={()=>
                          deletePerson(person, persons, onPersonsChange)
                    } />
          )}
        </tbody>
    </table>
  )
}

const PhoneBookHeader = () => 
  <thead>
    <tr>
      <th>Name</th>
      <th>Phone number</th>
    </tr>
  </thead>

export default PhoneBook