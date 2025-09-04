import React, {use, useEffect, useState} from 'react'
import WeatherBackground from './WeatherBackground';
import axios from "axios";

const searchComp = ({setWeather, setCondition}) => {
  const [ city, setCity] = useState('')
  const [ result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('celsius');
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

  const toggleUnit = () => {
    setUnit((prev) => ( prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }

  const convertTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return (temp * 9/5 + 32).toFixed(1);
    }
    return temp;
  }
  const formatTime = (unix, timezone) => {
    return new Date((unix + timezone) * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
    <div className='w-full'>
      <form onSubmit={handleSearch} action="" className='flex flex-col relative'>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter city or country' type="text"
        className='mb-4 p-3 rounded border border-whitebg-transparent text-white placeholder-white focus:outline-none focus:borser-blue-300 transition duration-300' />
            <div className="flex gap-2">
            <button type='submit' className=' flex-1 bg-purple-700 hover:bg-blue-700 text-white rounded-2xl'> 
              Get Weather
            </button>
            {result && (
        <button type='button' onClick={toggleUnit} className='bg-gray-700 hover:bg-gray-600 text-white rounded-2xl px-4 py-2'>
          {unit === 'celsius' ? 'F' : 'C'}
        </button>
      )}
      </div>
      </form>
      
      {error && (
        <div className='mt-4 p-3 bg-red-500/70 rounded text-white'>
          {error}
        </div>
      )}
      {result && result.main && (
        <div className="mt-4 p-4 bg-white/20 rounded text-white flex flex-col items-center">
          <h2 className="text-xl font-bold">{result.name}, {result.sys.country}</h2>

          <img
            src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`}
            alt={result.weather[0].description}
            className="w-24 h-24"
          />

          <p className="text-lg">{result.weather[0].main}</p>
          <p className="italic">{result.weather[0].description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 w-full">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="font-semibold">Temperature</p>
              <p>{convertTemp(result.main.temp)}°{unit === 'celsius' ? 'C' : 'F'}</p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="font-semibold">Feels Like</p>
              <p>{convertTemp(result.main.feels_like)}°{unit === 'celsius' ? 'C' : 'F'}</p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="font-semibold">Humidity</p>
              <p>{result.main.humidity}%</p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="font-semibold">Wind</p>
              <p>{result.wind.speed} m/s</p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="font-semibold">Visibility</p>
              <p>{result.visibility / 1000} km</p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="font-semibold">Sunrise</p>
              <p>{formatTime(result.sys.sunrise, result.timezone)}</p>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left lg:col-span-3">
              <p className="font-semibold">Sunset</p>
              <p>{formatTime(result.sys.sunset, result.timezone)}</p>
            </div>
          </div>

        </div>

      )}

      

    </div>
  )
}

export default searchComp