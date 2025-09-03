import React, {useEffect, useState} from 'react'

import axios from "axios";

const searchComp = ({setWeather}) => {
  const [ city, setCity] = useState('')
  const [ result, setResult] = useState(null);
  const API_KEY= 'e5811a4e58a88a3c6c1422164cc93862'

  useEffect(() => {
    if(result){
      console.log(result)
    }
  }, [result])

  const handleSearch = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = res.data;
    setResult(data);
    if (setWeather) setWeather (data);



    }catch(err){
      console.error(err);
    }
  }
  return (
    <div>
      <form onSubmit={handleSearch} action="" className='flex flex-col relative'>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter city or country (3 min letters' type="text"
        className='mb-4 p-3 rounded border border-whitebg-transparent text-white placeholder-white focus:outline-none focus:borser-blue-300 transition duration-300' />
            <button type='submit' className='bg-purple-700 hover:bg-blue-700 text-white'>
              Get Weather
            </button>
      </form>
      {result && result.main && (
        <div className="mt-4 p-4 bg-white/20 rounded text-white">
          <h2 className="text-xl font-bold">{result.name}, {result.sys.country}</h2>
          <p> Temperature: {result.main.temp} °C</p>
          <p>Feels like: {result.main.feels_like} °C</p>
          <p>Condition: {result.weather[0].description}</p>
          <p>Humidity: {result.main.humidity} °C</p>
          <p>Wind: {result.wind.speed} °C</p>
          <p>Visibility: {result.visibility} °C</p>
          <p>Sunrise: {result.sys.sunrise} °C</p>
          <p>Sunset: {result.sys.sunset} °C</p>



        </div>
      )}

      

    </div>
  )
}

export default searchComp