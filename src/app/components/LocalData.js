"use client";

import { useState, useEffect } from "react";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
const LocalData = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [temperature, setTemperature] = useState("Loading...");
  const [city, setCity] = useState("Detecting...");

  useEffect(() => {
    const updateTimeAndDay = () => {
      const now = new Date();
      const options = { weekday: "long" };
      setCurrentDay(now.toLocaleDateString(undefined, options)); // Day of the week
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })); // Time
    };

    updateTimeAndDay();
    const interval = setInterval(updateTimeAndDay, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getLocationAndWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
              const geoResponse = await fetch(geoUrl);
              const geoData = await geoResponse.json();
              const cityName = geoData.city || geoData.locality || "Unknown City";
              setCity(cityName);

              const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
              const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
              const weatherResponse = await fetch(weatherUrl);
              const weatherData = await weatherResponse.json();
              setTemperature(`${Math.round(weatherData.main.temp)}°F`);
            } catch {
              setCity("Unavailable");
              setTemperature("Unavailable");
            }
          },
          () => {
            setCity("Location unavailable");
            setTemperature("Unavailable");
          }
        );
      } else {
        setCity("Geolocation not supported");
        setTemperature("Unavailable");
      }
    };

    getLocationAndWeather();
  }, []);

  return (
    <div className="local-data p-4">
      <div className="flex space-x-4">
        {/* Green Box */}
        <div className="local-data-box green w-32 h-16 flex items-center justify-center rounded-md">
            <AirplanemodeActiveIcon className="airplane-icon" />
        </div>

        {/* Other Boxes */}
        <div className="local-data-box w-32 h-16 flex items-center justify-center rounded-md">
          {currentDay}
        </div>
        <div className="local-data-box w-32 h-16 flex items-center justify-center rounded-md">
          Today
        </div>
        <div className="local-data-box w-32 h-16 flex items-center justify-center rounded-md">
          {currentTime}
        </div>
        <div className="local-data-box w-32 h-16 flex items-center justify-center rounded-md">
          {temperature}
        </div>
        <div className="local-data-box w-32 h-16 flex items-center justify-center rounded-md">
          {city}
        </div>
      </div>
    </div>
  );
};

export default LocalData;
