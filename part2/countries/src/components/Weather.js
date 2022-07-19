import { useEffect , useState} from "react";
import axios from "axios";

const Weather = ({place}) => {
  const [weather, setWeather] = useState({
    main: {
      temp: '--'
    },
    wind: {
      speed: '--'
    }
  })
  const [icon, setIcon] = 
    useState('http://openweathermap.org/img/wn/01n@2x.png')

  const weatherHook = () => {
    const apiKey = process.env.REACT_APP_API_KEY
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather?' +
                      `q=${place}&appid=${apiKey}&units=metric`
    axios
      .get(endpoint)
      .then(response => {
          const weather = response.data
          const iconCode = weather.weather[0].icon
          setWeather(weather)
          setIcon(`http://openweathermap.org/img/wn/${iconCode}@2x.png`)
      })    
  }

  useEffect(weatherHook, [])
  
  return(
    <>
      <h2>Weather in {place}</h2>
      <p>Temperature {weather.main.temp} °C</p>
      <img src={icon} alt='weather icon' />
      <p>Wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default Weather
