const API_KEY = "4cb19217a20f9f10288a89d086f82750"
const apiUrl = "http://api.openweathermap.org/data/2.5"

const fetchWeather = function(city) {
  const weeklyWeatherUrl =
    // `${apiUrl}/forecast/daily?q=${city}&units=metric&cnt=7&appid=${API_KEY}`
    `${apiUrl}/forecast?id=1835847&units=metric&APPID=${API_KEY}`;

  return fetch(weeklyWeatherUrl).then((response) => response.json());
}

export { fetchWeather };
