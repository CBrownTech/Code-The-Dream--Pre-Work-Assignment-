// Open-Meteo uses WMO weather codes; icons from open-weather-icons CDN (mapped to codes)
const ICON_BASE = "https://cdn.jsdelivr.net/npm/open-weather-icons@0.0.7/src/svg";
const weather_codes = {
    0: { name: "Clear sky", icons: { day: `${ICON_BASE}/01d.svg`, night: `${ICON_BASE}/01n.svg` } },
    1: { name: "Mainly clear", icons: { day: `${ICON_BASE}/02d.svg`, night: `${ICON_BASE}/02n.svg` } },
    2: { name: "Partly cloudy", icons: { day: `${ICON_BASE}/03d.svg`, night: `${ICON_BASE}/03n.svg` } },
    3: { name: "Overcast", icons: { day: `${ICON_BASE}/04d.svg`, night: `${ICON_BASE}/04n.svg` } },
    45: { name: "Foggy", icons: { day: `${ICON_BASE}/50d.svg`, night: `${ICON_BASE}/50n.svg` } },
    48: { name: "Depositing rime fog", icons: { day: `${ICON_BASE}/50d.svg`, night: `${ICON_BASE}/50n.svg` } },
    51: { name: "Light drizzle", icons: { day: `${ICON_BASE}/09d.svg`, night: `${ICON_BASE}/09n.svg` } },
    53: { name: "Drizzle", icons: { day: `${ICON_BASE}/09d.svg`, night: `${ICON_BASE}/09n.svg` } },
    55: { name: "Dense drizzle", icons: { day: `${ICON_BASE}/09d.svg`, night: `${ICON_BASE}/09n.svg` } },
    61: { name: "Slight rain", icons: { day: `${ICON_BASE}/10d.svg`, night: `${ICON_BASE}/10n.svg` } },
    63: { name: "Moderate rain", icons: { day: `${ICON_BASE}/10d.svg`, night: `${ICON_BASE}/10n.svg` } },
    65: { name: "Heavy rain", icons: { day: `${ICON_BASE}/10d.svg`, night: `${ICON_BASE}/10n.svg` } },
    71: { name: "Slight snow", icons: { day: `${ICON_BASE}/13d.svg`, night: `${ICON_BASE}/13n.svg` } },
    73: { name: "Moderate snow", icons: { day: `${ICON_BASE}/13d.svg`, night: `${ICON_BASE}/13n.svg` } },
    75: { name: "Heavy snow", icons: { day: `${ICON_BASE}/13d.svg`, night: `${ICON_BASE}/13n.svg` } },
    80: { name: "Slight rain showers", icons: { day: `${ICON_BASE}/09d.svg`, night: `${ICON_BASE}/09n.svg` } },
    81: { name: "Rain showers", icons: { day: `${ICON_BASE}/09d.svg`, night: `${ICON_BASE}/09n.svg` } },
    82: { name: "Heavy rain showers", icons: { day: `${ICON_BASE}/09d.svg`, night: `${ICON_BASE}/09n.svg` } },
    85: { name: "Slight snow showers", icons: { day: `${ICON_BASE}/13d.svg`, night: `${ICON_BASE}/13n.svg` } },
    86: { name: "Heavy snow showers", icons: { day: `${ICON_BASE}/13d.svg`, night: `${ICON_BASE}/13n.svg` } },
    95: { name: "Thunderstorm", icons: { day: `${ICON_BASE}/11d.svg`, night: `${ICON_BASE}/11n.svg` } },
    96: { name: "Thunderstorm with hail", icons: { day: `${ICON_BASE}/11d.svg`, night: `${ICON_BASE}/11n.svg` } },
    99: { name: "Thunderstorm with heavy hail", icons: { day: `${ICON_BASE}/11d.svg`, night: `${ICON_BASE}/11n.svg` } }
};
function getWeatherCodeInfo(code) {
    return weather_codes[code] || { name: "Unknown", icons: { day: `${ICON_BASE}/01d.svg`, night: `${ICON_BASE}/01n.svg` } };
}

const weatherDetailsElem = document.getElementById("weather-details");
const locationTxt = document.getElementById("location");
const weatherIcon = document.getElementById("weather-icon");
const temperatureTxt = document.getElementById("temperature");
const descriptionTxt = document.getElementById("description");
const locationInput = document.getElementById("locationInput");
const errTxt = document.getElementById("errTxt");
const temperatureBtn = document.getElementById("temperatureBtn");
const conditionBtn = document.getElementById("conditionBtn");

// Open-Meteo: get coordinates from place name (Geocoding API)
async function getLocation(location) {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);
    const data = await res.json();
    if (!data.results || data.results.length === 0) throw new Error("Sorry, the location you entered was not found.");
    const result = data.results[0];
    return {
        name: result.name || "",
        lat: result.latitude,
        lon: result.longitude
    };
}

// Open-Meteo: get current weather (Forecast API)
async function getWeather(location) {
    const { lat, lon, name } = await getLocation(location);
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code`);
    const data = await res.json();
    return {
        name,
        current: data.current
    };
}

async function showTemperature() {
    const query = locationInput.value.trim();
    if (!query) {
        errTxt.textContent = "Please enter a city.";
        return;
    }
    errTxt.textContent = "";
    weatherDetailsElem.classList.remove("active", "show-condition");
    try {
        const weather = await getWeather(query);
        const { temperature_2m, weather_code, is_day } = weather.current;
        const conditionInfo = getWeatherCodeInfo(weather_code);
        locationTxt.textContent = weather.name;
        weatherIcon.src = is_day ? conditionInfo.icons.day : conditionInfo.icons.night;
        weatherIcon.alt = conditionInfo.name;
        temperatureTxt.textContent = `${temperature_2m} °C`;
        descriptionTxt.textContent = "";
        weatherDetailsElem.classList.add("active", "show-temperature");
    } catch {
        errTxt.textContent = "Sorry, the location you entered was not found.";
    }
}

async function showCondition() {
    const query = locationInput.value.trim();
    if (!query) {
        errTxt.textContent = "Please enter a city.";
        return;
    }
    errTxt.textContent = "";
    weatherDetailsElem.classList.remove("active", "show-temperature");
    try {
        const weather = await getWeather(query);
        const { weather_code, is_day } = weather.current;
        const condition = getWeatherCodeInfo(weather_code);
        locationTxt.textContent = weather.name;
        weatherIcon.src = is_day ? condition.icons.day : condition.icons.night;
        weatherIcon.alt = condition.name;
        temperatureTxt.textContent = "";
        descriptionTxt.textContent = condition.name;
        weatherDetailsElem.classList.add("active", "show-condition");
    } catch {
        errTxt.textContent = "Sorry, the location you entered was not found.";
    }
}

temperatureBtn.addEventListener("click", showTemperature);
conditionBtn.addEventListener("click", showCondition);