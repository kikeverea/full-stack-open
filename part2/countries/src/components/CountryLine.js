const CountryLine = ({country, showCountry}) => {
  const onClick = () => {
    showCountry(country)
  }

  const name = country.name;

  return (
    <tr>
      <td>
          {name.common}
      </td>
      <td>
          <button onClick={onClick}>Show</button>
      </td>
    </tr>
  )
}

export default CountryLine