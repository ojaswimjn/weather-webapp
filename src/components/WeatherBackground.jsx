import React from 'react'
import Sun from '../assets/sunny.gif';
import Rainfall from '../assets/rainfall.gif';
import Thunderstorm from '../assets/storm.gif';
import DrizzleRain from '../assets/drizzler.gif';
import Snow from '../assets/snow-16129_256.gif';
import ClearDay from '../assets/sun.gif';
import ClearNight from '../assets/night.gif';
import Weather from '../assets/weather.webp';
import Haze from '../assets/haze.gif';
import CloudDay from '../assets/cloudyday.gif';
import CloudNight from '../assets/cloudynight.gif'


const WeatherBackground = ({condition}) => {
  const gifs = {
    Thunderstorm ,
    Drizzler: DrizzleRain,
    Rain: Rainfall,
    Snow,
    Clear: {day: ClearDay, night: ClearNight},
    Clouds: {day: CloudDay, night: CloudNight},
    Mist: Haze,
    Smoke: Haze,
    Haze,
    Fog: Haze,
    default: Weather
  }


  const getBackground = () => {
    if (!condition) return gifs.default;
    const weatherType = condition.main;
    const asset = gifs[weatherType];

    if(!asset) return gifs.default;
    if (typeof async == 'object')
      return condition.isDay? asset.day : asset.night;

    return asset;


  }


  const background = getBackground();

  return (
    <div className='fixed inset-0 x-0 overflow-hidden'>
      {background === Weather ? (
        <img src={Weather} alt='weather-bg' className='w-full h-full object-cover opacity-100 pointer-events-auto animate-fade-in'>
        </img>
      ): (
        <img src={background} alt='weather-bg' className='w-full h-full object-cover opacity-100 pointer-events-auto animate-fade-in'>
        </img>
      )
      }
      <div className=' absolute inset-0 bg-black/30'></div>
      </div>
  )
}

export default WeatherBackground