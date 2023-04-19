function getWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7e675e2b2c0bd91ed1e3b2c16a408a27`;
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("City not found. Please enter a valid city name.");
                } else {
                    throw new Error("An error occurred while fetching the weather data.");
                }
            }
            return response.json();
        })
        .then(function (data) {
            const tempCelsius = data.main.temp - 273.15; // Convert Kelvin to Celsius
            const tempMaxCelsius = data.main.temp_max - 273.15;
            const tempMinCelsius = data.main.temp_min - 273.15;
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;
            var dateSunrise = new Date(0);
            var dateSunset = new Date(0);
            dateSunrise.setUTCSeconds(sunrise);
            dateSunset.setUTCSeconds(sunset);
            document.getElementById("temp").innerText = `${cityName} is now ${tempCelsius.toFixed(2)} °C`; // Display the temperature in Celsius
            document.getElementById("temp_max").innerText = `Highest Temp in ${cityName} is ${tempMaxCelsius.toFixed(2)} °C`;
            document.getElementById("temp_min").innerText = `Lowest Temp in ${cityName} is ${tempMinCelsius.toFixed(2)} °C`;
            document.getElementById("sunrise").innerText = `Sunrise in ${cityName} is ${dateSunrise}. `
            document.getElementById("sunset").innerText = `Sunset in ${cityName} is ${dateSunset}. `
        })
        .catch(function (error) {
            document.getElementById("temp").innerText = error.message;
            document.getElementById("temp_max").innerText = error.message;
            document.getElementById("temp_min").innerText = error.message;
            document.getElementById("sunrise").innerText = error.message;
            console.log(error);
        });
}

window.onload = function () {
    document.getElementById("sendButton").onclick = function () {
        const cityName = document.getElementById("cityNameInput").value;
        getWeather(cityName);
    };
};
