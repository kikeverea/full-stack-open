import CountryInfo from './CountryInfo'
import Languages from './Languages'
import Flag from './Flag'
import './country.css'

const Country = ({country}) => 
    <>
        <CountryInfo country={country} />
        <Languages languages={country.languages} />
        <Flag src={country.flags.svg} />
    </>

export default Country