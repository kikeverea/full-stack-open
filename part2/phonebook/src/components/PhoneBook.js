import Person from './Person'

const PhoneBook = ({persons, onPersonDelete}) => 
    persons.length === 0
      ? <p>No phones listed</p>
      : <table>
          <PhoneBookHeader />
          <PersonsList persons={persons} onPersonDelete={onPersonDelete} />
        </table>

const PhoneBookHeader = () => 
  <thead>
    <tr>
      <th>Name</th>
      <th>Phone number</th>
    </tr>
  </thead>

const PersonsList = ({persons, onPersonDelete}) => 
  <tbody>
    {persons.map(person => 
      <Person key={person.name} 
              name={person.name} 
              phone={person.number}
              onDelete={()=> onPersonDelete(person)} />
    )}
  </tbody>  

export default PhoneBook