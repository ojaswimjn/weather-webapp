import React, {useEffect, useState} from 'react'
import WeatherBackground from './WeatherBackground';
import axios from "axios";

const searchComp = ({setWeather, setCondition}) => {
  const [ city, setCity] = useState('')
  const [ result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY= 'e5811a4e58a88a3c6c1422164cc93862'

  useEffect(() => {
    if(result){
      console.log(result)
    }
  }, [result])

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try{
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

    const data = res.data;
    setResult(data);
    if (setWeather) setWeather (data);

    const currentTime = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const isDay = currentTime > sunrise && currentTime < sunset;

    const conditionData =  {
      main: data.weather[0].main,
      isDay: isDay,
    };

    if(setCondition) setCondition(conditionData);
    }catch(err){
      console.error(err);
      setError("City not found. Please try again with a valid city name.");
    }
  }
  const formatTime = (unix, timezone) => {
    return new Date((unix + timezone) * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
    <div>
      <form onSubmit={handleSearch} action="" className='flex flex-col relative'>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter city or country (3 min letters' type="text"
        className='mb-4 p-3 rounded border border-whitebg-transparent text-white placeholder-white focus:outline-none focus:borser-blue-300 transition duration-300' />
            <button type='submit' className='bg-purple-700 hover:bg-blue-700 text-white rounded-2xl'> 
              Get Weather
            </button>
      </form>
      {error && (
        <div className='mt-4 p-3 bg-red-500/70 rounded text-white'>
          {error}
        </div>
      )}
      {result && result.main && (
        <div className="mt-4 p-4 bg-white/20 rounded text-white flex flex-col items-center">
          <h2 className="text-xl font-bold">{result.name}, {result.sys.country}</h2>

          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`}
            alt={result.weather[0].description}
            className="w-24 h-24"
          />

          <p className="text-lg">{result.weather[0].main}</p>
          <p className="italic">{result.weather[0].description}</p>

          <p>🌡 Temperature: {result.main.temp} °C</p>
          <p>Feels like: {result.main.feels_like} °C</p>
          <p>Humidity: {result.main.humidity}%</p>
          <p>Wind: {result.wind.speed} m/s</p>
          <p>Visibility: {result.visibility / 1000} km</p>
          <p>Sunrise: {formatTime(result.sys.sunrise, result.timezone)}</p>
          <p>Sunset: {formatTime(result.sys.sunset, result.timezone)}</p>
        </div>
      )}

      

    </div>
  )
}

export default searchComp