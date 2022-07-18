import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';
import './App.css';

function App() {
  const[filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])

  const dataHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setShowCountries(response.data)
      })    
  }

  const filterCountries = filter => {
    setFilter(filter)
    setShowCountries(filter
      ? countries.filter(country => 
          country.name.common.toLowerCase().includes(filter.toLowerCase()))
      : countries)
  }

  useEffect(dataHook, [])

  return (
    <div className="App">
      <Filter state={filter} onStateChange={filterCountries} />
      <Countries countries={showCountries} />
    </div>
  );
}

export default App;
