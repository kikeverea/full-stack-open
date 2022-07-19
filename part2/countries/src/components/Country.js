import CountryInfo from './CountryInfo'
import Languages from './Languages'
import Flag from './Flag'
import Weather from './Weather';

import './country.css'

const Country = ({country}) => 
    <>
        <CountryInfo country={country} />
        <Languages languages={country.languages} />
        <Flag src={country.flags.svg} />
        <Weather place={country.capital[0]}/>        
    </>

export default Country