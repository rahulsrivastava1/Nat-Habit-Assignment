const Location = require("../models/locationModels");
const { getWeatherData } = require("../utils/weatherApi");

exports.addLocation = async (req, res) => {
  try {
    await Location.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Location added successfully.",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();

    res.status(200).json({
      status: "success",
      result: locations.length,
      data: locations,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.getLocationData = async (req, res) => {
  try {
    const { location } = req.body;
    if (location) {
      const weatherData = await getWeatherData(location);

      const {
        forecast: { forecastday },
      } = weatherData;

      const today = new Date().toISOString().split("T")[0];

      const simplifiedForecast = forecastday.map((day) => {
        const date = day.date;
        const isToday = date === today;

        return {
          today: isToday ? "Today" : "",
          day: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
          date: date,
          maxTemp: day.day.maxtemp_c,
          minTemp: day.day.mintemp_c,
          condition: day.day.condition.text,
        };
      });

      return res.status(200).json({
        forecast: simplifiedForecast,
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
