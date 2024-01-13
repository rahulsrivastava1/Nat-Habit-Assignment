const axios = require("axios");

exports.getWeatherData = async (location) => {
  try {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&country=India`;
    const response = await axios.get(apiUrl);

    return response.data;
  } catch (err) {
    throw err;
  }
};
