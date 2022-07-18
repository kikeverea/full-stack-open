import Country from './Country'

const Countries = ({countries}) => {
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
        return countries.map(country => 
            <p key={country.name.official}>{country.name.common}</p>
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