import Person from './Person'

const PhoneBook = ({persons}) =>
  persons.length === 0
  ? <p>No phones listed</p>
  : <table>
      <thead>
        <tr>
        <th>Name</th>
        <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
      {persons.map(person =>
        <Person key={person.phone} name={person.name} phone={person.phone} />
      )}
      </tbody>
    </table>

export default PhoneBook