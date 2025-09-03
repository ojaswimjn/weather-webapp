import React, {useState} from 'react'

import axios from "axios";

const searchComp = ({setWeather}) => {
  const [ city, setCity] = useState('')
  const [ result, setResult] = useState(null);
  const API_KEY= 'e5811a4e58a88a3c6c1422164cc93862'

  const handleSearch = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = res.data;
    setResult(data);
    if (setWeather) setWeather (data);

    console.log(data)


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

      

    </div>
  )
}

export default searchComp