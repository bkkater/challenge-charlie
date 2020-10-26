import React, { FormEvent, useEffect, useState } from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi'
import { WiDayFog } from 'react-icons/wi'


import compass from '../../assets/icons/compass.svg';
import sunnyDay from '../../assets/icons/sunny-day.svg';
import Header from '../../components/Header';
import openCageApi from '../../services/openCage-api';
// import bingApi from '../../services/bing-api';
import openWeatherApi from '../../services/openWeather-api';
import { key } from '../../utils/apiKey';


import './styles.css';

interface cityWheatherData {
  name: string
  main: {
    temp: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    description: string
  }>
  wind: {
    speed: number
  }
}

interface openCageData {
  city: string
  state: string
  country_code: string
}

const Landing: React.FC = () => {
  const [cityInput, setCityInput] = useState('');

  const [city, setCity] = useState<cityWheatherData>();
  const [coordinate, setCoordinate] = useState<openCageData>()


  const [latitude, setLatitude] = useState<Number>();
  const [longitude, setLongitude] = useState<Number>();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(cityInput)
  }


  // OpenWeather API
  useEffect(() => {
    console.log(coordinate?.city)
    openWeatherApi.get(`/weather/?units=metric&lang=pt_br&q=${coordinate?.city},${coordinate?.country_code}&appid=${key.openWeatherKey}`).then(response => {
      setCity(response.data)
    })
  }, [coordinate])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;

      if (lat && lon) {
        setLongitude(lon);
        setLatitude(lat); 
      }
    });

    openCageApi.get(`/json?key=${key.openCageKey}&q=${latitude}+${longitude}&pretty=1&language=pt_BR`).then(response => {
      setCoordinate(response.data.results[0].components)
    })
  }, [latitude, longitude, coordinate])

  // Bing API
  // useEffect(() => {
  //   bingApi.get('HPImageArchive.aspx?format=js&idx=0&n=1').then(response => {
  //     console.log(response.data)
  //   })
  // }, [])
  
  return (
    <div id="page-landing">
      <Header>
        <WiDayFog style={{ position: 'absolute', left: 100 }} color="white" size={50} />
        <h1>Challenge Charlie</h1>
        <form className="city-input" onSubmit={handleSubmit}>
          <FiMapPin style={{ marginLeft: 10 }} size={23} />
          <input placeholder="Digite uma cidade" value={cityInput} onChange={(e)=> setCityInput(e.target.value)}/>
          <button type='submit'><FiSearch size={23} color='#FFF' /></button>
        </form>

      </Header>

      <div className="container">
        <header>
          <img src={compass} alt="Cidade, estado" />

          <h4>{`${coordinate?.city}, ${coordinate?.state}`}</h4>
        </header>

        <div className="content">
          <div className="left">
            <img src={sunnyDay} alt={city?.weather[0].description} />
          </div>

          <div className="right">
            <div style={{ marginBottom: 10 }}>
              <span>Hoje</span>
              <h4>{`${city?.main.temp}°C`}</h4>
            </div>

            <div style={{ marginBottom: 10 }}>
              <span>{city?.weather[0].description}</span>
              <h4><strong>Vento:</strong>{` ${city?.wind.speed}m/s`}</h4>
              <h4><strong>Humidade:</strong>{` ${city?.main.humidity}%`}</h4>
              <h4><strong>Pressão:</strong>{` ${city?.main.pressure}hPA`}</h4>
            </div>
          </div>
        </div>

        <div className="content tomorrow">
          <div className="left">

          </div>

          <div className="right">
            <div style={{ marginBottom: 10 }}>
              <span>Amanhã</span>
              <h4>25°C</h4>
            </div>
          </div>

        </div>

        <div className="content after-tomorrow">
          <div className="left">

          </div>

          <div className="right">
            <div style={{ marginBottom: 10 }}>
              <span>Depois de amanhã</span>
              <h4>25°C</h4>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Landing;