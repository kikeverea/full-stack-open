import Country from './Country'
import CountryLine from './CountryLine'

const Countries = ({countries, showCountry}) => {
  const count = countries.length;
  if (count === 0) {
      return (
          <p>No countries listed</p>
      )
  }
  else if (count === 1) {
      return ( 
        <Country country={countries[0]} />
      )
  }
  else if (count <= 10) {
    return (
      <table>
        <tbody>
          {countries.map(country => 
              <CountryLine country={country} showCountry={showCountry}/>
          )}
        </tbody>    
      </table>
    )
  }
  else {
      // more than 10 countries
      return(
        <p>Too many matches, specify another filter</p>
      )
  }
}
export default Countries