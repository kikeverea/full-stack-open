import InfoEntry from "./InfoEntry"

const CountryInfo = ({country}) => 
    <div>
        <h1>{country.name.common}</h1>
        <table>
            <tbody>
                <InfoEntry label="Capital" info={country.capital} />
                <InfoEntry label="Area" info={country.area} />
            </tbody>
        </table>
    </div>

export default CountryInfo