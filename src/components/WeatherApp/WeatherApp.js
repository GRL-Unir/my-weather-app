import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [weatherGif, setWeatherGif] = useState('');
  const apiKey = process.env.API_KEY;
  // Diccionario de GIFs para diferentes condiciones climáticas
  const weatherGifs = {
    'Niebla': './src/gifs/niebla.gif',
    'Viento': './src/gifs/viento.gif',
    'Lluvia': './src/gifs/lluvia.gif',
    'Lluvia fuerte': './src/gifs/lluvia_fuerta.gif',
    'Soleado': './src/gifs/sol.gif',
  };

  useEffect(() => {
    const searchCity = async () => {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&lang=es');
        if (!response.ok) throw new Error('Respuesta de red no fue valida');

        const data = await response.json();

        // Suponiendo que los resultados vienen en la propiedad 'weather' y quieres el primer resultado
        const firstResult = data.weather[0];
        const weatherDetails = {
          temperatura: data.main.temp,
          clima: firstResult.main, // Ejemplo: "Mist"
          descripcion: firstResult.description, // Ejemplo: "mist"
          viento: data.wind.speed,
          nubes: data.clouds.all,
          presion: data.main.pressure
        };

        setWeather(weatherDetails);
        
        // Establecer el GIF según la descripción del clima
        setWeatherGif(weatherGifs[weatherDetails.descripcion] || '');

      } catch (error) {
        console.error("Hubo un problema con la petición Fetch:", error);
      }
    };

    searchCity();
  }, []);

  return (
    <div>
      {weather ? (
        <div>
          <p>Temperatura: {weather.temperatura}°C</p>
          <p>Clima: {weather.descripcion}</p>
          {weatherGif && <img src={weatherGif} alt="Clima" />}
          <p>Viento: {weather.viento} m/s</p>
          <p>Nubes: {weather.nubes}%</p>
          <p>Presión: {weather.presion} hPa</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default WeatherApp;
