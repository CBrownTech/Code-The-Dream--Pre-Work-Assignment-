# Check Your Weather!

Here is a simple weather app that shows temperature and weather conditions for any city using the Open-Meteo API. Enter a city name and choose to display either the current temperature or the weather condition (e.g., partly cloudy, rain, clear sky), each with a weather icon.

## Features

- **Temperature** – View current temperature in °C for any city
- **Condition** – View the current weather condition (e.g., Clear sky, Partly cloudy, Rain)
- **Weather icons** – Day/night icons based on Open-Meteo’s weather codes
- **No API key** – Uses the free Open-Meteo API

## How to Run

1. **Open in a browser**  
   Double-click `index.html` or drag it into your browser.  
   Or from the project folder run:
   ```bash
   start index.html
   ```
   (Windows) or `open index.html` (macOS).

2. **Optional: local server** (if you need one, e.g. for the background image or CORS):
   ```bash
   npx serve .
   ```
   Then open the URL shown (e.g. http://localhost:3000).

## How to Use

1. Type a city name in the input (e.g. London, Tokyo, New York).
2. Click **Temperature** to see the current temperature and weather icon.
3. Or click **Condition** to see the weather condition (e.g. “Partly cloudy”) and icon.
4. Change the city and click again to fetch new data.

## Project Structure

```
├── index.html    # Main page: welcome text, input, buttons, weather display
├── styles.css    # Layout, fonts, colors, background
├── script.js     # Open-Meteo API calls and UI logic
├── background.jpg # Optional background image (you may add your own if you'd like)
└── README.md     # This file
```

## Customization

- **Welcome title** – Edit the text inside `<h1 class="welcome-title">...</h1>` in `index.html`.
- **Description** – Edit the text inside `<p class="welcome-description">...</p>` in `index.html`.
- **Background** – Place an image named `background.jpg` in the same folder as `index.html`, or change the filename in `styles.css` (search for `background-image: url(...)`).
- **Fonts and colors** – Adjust `body` and `.welcome-title` / `.welcome-description` in `styles.css`.

## Tech & APIs

- **Open-Meteo Geocoding API** – Converts city name to coordinates.
- **Open-Meteo Forecast API** – Returns current temperature, weather code, and day/night.
- **Weather icons** – [open-weather-icons](https://www.npmjs.com/package/open-weather-icons) (jsDelivr CDN), mapped from Open-Meteo’s WMO weather codes.

No API key or sign-up is required.

## Troubleshooting

- **“Location not found”** – Check spelling, try a larger city or add country (e.g. “Paris, France”).
- **Background not showing** – Ensure `background.jpg` is in the same folder as `index.html`, or update the path in `styles.css`.
- **Icons not loading** – The app needs internet access to load icons from the CDN.
