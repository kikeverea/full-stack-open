const Languages = ({languages}) =>
    <div>
        <h3>Languages:</h3>
        <ul>
            {Object.keys(languages).map(key =>
                <li key={key}>{languages[key]}</li>)
            }
        </ul>
    </div>

export default Languages