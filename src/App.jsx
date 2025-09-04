import React, { useState } from 'react'
import SearchComp from './components/Search'
import WeatherBackground from './components/WeatherBackground'

const App = () => {
  const [weather, setWeather]= useState(null);
  const [condition, setCondition] =useState(null);

  
  return (
    <div classNa  me='min-h-screen'>
      <WeatherBackground condition={condition}/>
      <div className='flex items-center justify-center p-6 min-h-screen'>
        <div className='bg-transparent backdrop-filter backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md text-white w-full border border-white/30 relative z-10'>
          <h1 className='text-4xl font-extrabold text-center mb-3'> Weather </h1>
          <SearchComp setWeather={setWeather} setCondition={setCondition}/>
          {/* <ResultComp/> */}
        </div>
      </div>
    </div>
    
  )
}

export default App