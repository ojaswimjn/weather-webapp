import React from 'react'
import SearchComp from './components/Result'
import ResultComp from './components/Search'
import WeatherBackground from './components/WeatherBackground'

const App = () => {
  return (
    <div className='flex'>
      <div className=''><WeatherBackground/></div>
      <div className='h-14 flex-auto'><SearchComp/></div>
      <div className='h-32 flex-auto'><ResultComp/></div>
    </div>
  )
}

export default App