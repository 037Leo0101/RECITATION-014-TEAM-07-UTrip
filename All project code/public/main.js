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
            document.getElementById("message").innerText = `${cityName} is now ${tempCelsius.toFixed(2)} °C`; // Display the temperature in Celsius
        })
        .catch(function (error) {
            document.getElementById("message").innerText = error.message;
            console.log(error);
        });
}

window.onload = function () {
    document.getElementById("sendButton").onclick = function () {
        const cityName = document.getElementById("cityNameInput").value;
        getWeather(cityName);
    };
};
