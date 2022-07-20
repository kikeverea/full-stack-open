import Person from './Person'
import personService from '../services/personService'

const PhoneBook = ({persons, onPersonsChange}) =>

  persons.length === 0
    ? <p>No phones listed</p>
    : <table>
        <PhoneBookHead />
        <PersonList persons={persons} onPersonsChange={onPersonsChange} />
    </table>

const PhoneBookHead = () =>
  <thead>
    <tr>
      <th>Name</th>
      <th>Phone number</th>
    </tr>
  </thead>

const PersonList = ({persons, onPersonsChange}) => 
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

export default PhoneBook