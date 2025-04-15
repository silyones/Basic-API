// a simple weather API using OpenWeatherMap API
const express = require('express'); //libarries
const axios = require('axios');
require('dotenv').config(); // Load .env variables

const app = express();
const PORT = 3000;

app.get('/weather', async (req, res) => {
  const city = req.query.city || 'Bangalore'; // Default city
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    res.send({
      city: data.name,
      temperature: data.main.temp + '°C',
      description: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
