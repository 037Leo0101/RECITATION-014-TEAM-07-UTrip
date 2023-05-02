let cityID = "";

function getWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7e675e2b2c0bd91ed1e3b2c16a408a27`;
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("City not found. Please enter a valid city name.");
                } else {
                    throw new Error("An error occurred while fetching the weather data.");
                }
            }
            return response.json();
        })
        // .then(function(data) {
        //     const tempCelsius = data.main.temp - 273.15; // Convert Kelvin to Celsius
        //     const tempMaxCelsius = data.main.temp_max - 273.15;
        //     const tempMinCelsius = data.main.temp_min - 273.15;
        //     const sunrise = data.sys.sunrise;
        //     const sunset = data.sys.sunset;
        //     var dateSunrise = new Date(0);
        //     var dateSunset = new Date(0);
        //     dateSunrise.setUTCSeconds(sunrise);
        //     dateSunset.setUTCSeconds(sunset);
        //     document.getElementById("cityName").innerText = data.name; // Display the city name
        //     document.getElementById("temp").innerText = `${tempCelsius.toFixed(2)} °C`; // Display the temperature in Celsius// Display the temperature in Celsius
        //     document.getElementById("temp_max").innerText = `High ${tempMaxCelsius.toFixed(2)} °C`;
        //     document.getElementById("temp_min").innerText = `Low ${tempMinCelsius.toFixed(2)} °C`;
        //     // document.getElementById("sunrise").innerText = `Sunrise ${dateSunrise.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} `;
        //     // document.getElementById("sunset").innerText = `Sunset ${dateSunset.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} `;
        // })

    .then(function(data) {
        const tempCelsius = data.main.temp - 273.15; // Convert Kelvin to Celsius
        const tempMaxCelsius = data.main.temp_max - 273.15;
        const tempMinCelsius = data.main.temp_min - 273.15;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        var dateSunrise = new Date(0);
        var dateSunset = new Date(0);
        dateSunrise.setUTCSeconds(sunrise);
        dateSunset.setUTCSeconds(sunset);
        const cityNameHeader = document.getElementById("cityName");
        cityNameHeader.innerText = `${cityName}`;

        document.getElementById("temp").innerText = `${tempCelsius.toFixed(0)} °C`; // Display the temperature in Celsius
        document.getElementById("temp_max").innerText = `High ${tempMaxCelsius.toFixed(0)} °C`;
        document.getElementById("temp_min").innerText = `Low ${tempMinCelsius.toFixed(0)} °C`;
    })



    .catch(function(error) {
        document.getElementById("temp").innerText = error.message;

        console.log(error);
    });

    const urlWeek = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=7e675e2b2c0bd91ed1e3b2c16a408a27`;

    fetch(urlWeek)
        .then(function(response) {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("City not found. Please enter a valid city name.");
                } else {
                    throw new Error("An error occurred while fetching the weather data.");
                }
            }
            return response.json();
        })
        .then(function(data) {
            displayWeeklyData(data);
        })
        .catch(function(error) {
            console.error("Error:", error);
        });

}

// function displayWeeklyData(data) {
//     const list = data.list;
//     const weeklyDataContainer = document.getElementById("weekly-data");
//     weeklyDataContainer.innerHTML = ""; // Clear the previous data

//     const table = document.createElement("table");
//     table.className = "weather-table";

//     const headerRow = document.createElement("tr");

//     const dayHeader = document.createElement("th");
//     dayHeader.innerText = "Day";
//     headerRow.appendChild(dayHeader);

//     const weatherIconHeader = document.createElement("th");
//     weatherIconHeader.innerText = " ";
//     headerRow.appendChild(weatherIconHeader);

//     const maxTempHeader = document.createElement("th");
//     maxTempHeader.innerText = "High";
//     headerRow.appendChild(maxTempHeader);

//     const minTempHeader = document.createElement("th");
//     minTempHeader.innerText = "Low";
//     headerRow.appendChild(minTempHeader);

//     const weatherDescriptionHeader = document.createElement("th");
//     weatherDescriptionHeader.innerText = "Weather";
//     headerRow.appendChild(weatherDescriptionHeader);

//     table.appendChild(headerRow);

//     for (let i = 0; i < list.length; i++) {
//         const dayData = list[i];
//         const maxTemp = dayData.main.temp_max - 273.15; // Convert Kelvin to Celsius
//         const minTemp = dayData.main.temp_min - 273.15; // Convert Kelvin to Celsius
//         const weatherDescription =
//             dayData.weather[0].description.charAt(0).toUpperCase() +
//             dayData.weather[0].description.slice(1);
//         const weatherIconCode = dayData.weather[0].icon;
//         const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

//         const dayContainer = document.createElement("tr");

//         const dayHeader = document.createElement("td");
//         const date = new Date(dayData.dt_txt);
//         const options = {
//             weekday: "long",
//             month: "long",
//             day: "numeric",
//             hour: "numeric",
//             minute: "2-digit",
//             hourCycle: "h12"
//         };
//         const formattedDate = date.toLocaleString("en-US", options);
//         dayHeader.innerText = formattedDate;
//         dayContainer.appendChild(dayHeader);

//         const weatherIconCell = document.createElement("td");
//         const weatherIcon = document.createElement("img");
//         weatherIcon.src = weatherIconUrl;
//         weatherIcon.alt = weatherDescription;
//         weatherIconCell.appendChild(weatherIcon);
//         dayContainer.appendChild(weatherIconCell);

//         const maxTempCell = document.createElement("td");
//         maxTempCell.innerText = `${maxTemp.toFixed(0)}°C`;
//         maxTempCell.className = "temp-cell max-temp";
//         dayContainer.appendChild(maxTempCell);

//         const minTempCell = document.createElement("td");
//         minTempCell.innerText = `${minTemp.toFixed(0)}°C`;
//         minTempCell.className = "temp-cell min-temp";
//         dayContainer.appendChild(minTempCell);

//         const weatherDescriptionCell = document.createElement("td");
//         weatherDescriptionCell.className = "weather-description-cell";
//         weatherDescriptionCell.innerText = weatherDescription;
//         dayContainer.appendChild(weatherDescriptionCell);

//         table.appendChild(dayContainer);
//     }

//     weeklyDataContainer.appendChild(table);
// }


function displayWeeklyData(data) {
    const list = data.list;
    const weeklyDataContainer = document.getElementById("weekly-data");
    weeklyDataContainer.innerHTML = ""; // Clear the previous data

    const table = document.createElement("table");
    table.className = "weather-table";

    const headerRow = document.createElement("tr");

    const hourHeader = document.createElement("th"); // New table header for hour
    hourHeader.innerText = "Hour";
    headerRow.appendChild(hourHeader);

    const dayHeader = document.createElement("th");
    dayHeader.innerText = "Day";
    headerRow.appendChild(dayHeader);

    const weatherIconHeader = document.createElement("th");
    weatherIconHeader.innerText = " ";
    headerRow.appendChild(weatherIconHeader);

    const maxTempHeader = document.createElement("th");
    maxTempHeader.innerText = "High";
    headerRow.appendChild(maxTempHeader);

    const minTempHeader = document.createElement("th");
    minTempHeader.innerText = "Low";
    headerRow.appendChild(minTempHeader);

    const weatherDescriptionHeader = document.createElement("th");
    weatherDescriptionHeader.innerText = "Weather";
    headerRow.appendChild(weatherDescriptionHeader);

    table.appendChild(headerRow);

    for (let i = 0; i < list.length; i++) {
        const dayData = list[i];
        const maxTemp = dayData.main.temp_max - 273.15; // Convert Kelvin to Celsius
        const minTemp = dayData.main.temp_min - 273.15; // Convert Kelvin to Celsius
        const weatherDescription =
            dayData.weather[0].description.charAt(0).toUpperCase() +
            dayData.weather[0].description.slice(1);
        const weatherIconCode = dayData.weather[0].icon;
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

        const dayContainer = document.createElement("tr");

        const hourCell = document.createElement("td"); // New table data cell for hour
        const date = new Date(dayData.dt_txt);
        let hour = date.getHours();
        let amOrPm = hour < 12 ? "AM" : "PM";
        hour = hour % 12 || 12;
        hourCell.innerText = `${hour}:00 ${amOrPm}`;
        dayContainer.appendChild(hourCell);

        const dayHeaderCell = document.createElement("td");
        const options = { weekday: "long", month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        dayHeaderCell.innerText = formattedDate;
        dayContainer.appendChild(dayHeaderCell);

        const weatherIconCell = document.createElement("td");
        const weatherIcon = document.createElement("img");
        weatherIcon.src = weatherIconUrl;
        weatherIcon.alt = weatherDescription;
        weatherIconCell.appendChild(weatherIcon);
        dayContainer.appendChild(weatherIconCell);

        const maxTempCell = document.createElement("td");
        maxTempCell.innerText = `${maxTemp.toFixed(0)}°C`;
        maxTempCell.className = "temp-cell max-temp";
        dayContainer.appendChild(maxTempCell);

        const minTempCell = document.createElement("td");
        minTempCell.innerText = `${minTemp.toFixed(0)}°C`;
        minTempCell.className = "temp-cell min-temp";
        dayContainer.appendChild(minTempCell);

        const weatherDescriptionCell = document.createElement("td");
        weatherDescriptionCell.className = "weather-description-cell";
        weatherDescriptionCell.innerText = weatherDescription;
        dayContainer.appendChild(weatherDescriptionCell);

        table.appendChild(dayContainer);
    }




    weeklyDataContainer.appendChild(table);
}







function getCityID() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ed6ae091f7msh568fc8543e911fbp10257ejsn747206a77891',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
        }
    };

}

function getLocation(cityName) {

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    let tomorrowDateString = tomorrow.toISOString().split('T')[0];
    let nextWeekDate = new Date(tomorrow.getTime() + 7 * 24 * 60 * 60 * 1000);

    let nextWeekDateString = nextWeekDate.toISOString().split('T')[0];
    let dateObject = {
        "tomorrowDate": tomorrowDateString,
        "nextWeekDate": nextWeekDateString
    };

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ed6ae091f7msh568fc8543e911fbp10257ejsn747206a77891',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
        }
    };
    //gets the cityID
    fetch(`https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${cityName}&languagecode=en-us`, options)
        .then(response => response.json())
        .then(response => {
            console.log("hello", response)


            cityID = response[0].dest_id;

            //Gets the Hotels List Information
            fetch(`https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=${dateObject.tomorrowDate}&departure_date=${dateObject.nextWeekDate}&guest_qty=1&dest_ids=${cityID}&room_qty=1&search_type=city&children_qty=2&children_age=5%2C7&search_id=none&price_filter_currencycode=USD&order_by=popularity&languagecode=en-us&travel_purpose=leisure`, options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    listHotels(response.result)
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));

}


function displayWeeklyData(data) {
    const list = data.list;
    const weeklyDataContainer = document.getElementById("weekly-data");
    weeklyDataContainer.innerHTML = ""; // Clear the previous data

    const table = document.createElement("table");
    table.className = "weather-table";

    const headerRow = document.createElement("tr");

    const hourHeader = document.createElement("th"); // New table header for hour
    hourHeader.innerText = "Hour";
    headerRow.appendChild(hourHeader);

    const dayHeader = document.createElement("th");
    dayHeader.innerText = "Day";
    headerRow.appendChild(dayHeader);

    const weatherIconHeader = document.createElement("th");
    weatherIconHeader.innerText = " ";
    headerRow.appendChild(weatherIconHeader);

    const maxTempHeader = document.createElement("th");
    maxTempHeader.innerText = "High";
    headerRow.appendChild(maxTempHeader);

    const minTempHeader = document.createElement("th");
    minTempHeader.innerText = "Low";
    headerRow.appendChild(minTempHeader);

    const weatherDescriptionHeader = document.createElement("th");
    weatherDescriptionHeader.innerText = "Weather";
    headerRow.appendChild(weatherDescriptionHeader);

    table.appendChild(headerRow);

    for (let i = 0; i < list.length; i++) {
        const dayData = list[i];
        const maxTemp = dayData.main.temp_max - 273.15; // Convert Kelvin to Celsius
        const minTemp = dayData.main.temp_min - 273.15; // Convert Kelvin to Celsius
        const weatherDescription =
            dayData.weather[0].description.charAt(0).toUpperCase() +
            dayData.weather[0].description.slice(1);
        const weatherIconCode = dayData.weather[0].icon;
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

        const dayContainer = document.createElement("tr");

        const hourCell = document.createElement("td"); // New table data cell for hour
        const date = new Date(dayData.dt_txt);
        let hour = date.getHours();
        let amOrPm = hour < 12 ? "AM" : "PM";
        hour = hour % 12 || 12;
        hourCell.innerText = `${hour}:00 ${amOrPm}`;
        dayContainer.appendChild(hourCell);

        const dayHeaderCell = document.createElement("td");
        const options = { weekday: "long", month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        dayHeaderCell.innerText = formattedDate;
        dayContainer.appendChild(dayHeaderCell);

        const weatherIconCell = document.createElement("td");
        const weatherIcon = document.createElement("img");
        weatherIcon.src = weatherIconUrl;
        weatherIcon.alt = weatherDescription;
        weatherIconCell.appendChild(weatherIcon);
        dayContainer.appendChild(weatherIconCell);

        const maxTempCell = document.createElement("td");
        maxTempCell.innerText = `${maxTemp.toFixed(0)}°C`;
        maxTempCell.className = "temp-cell max-temp";
        dayContainer.appendChild(maxTempCell);

        const minTempCell = document.createElement("td");
        minTempCell.innerText = `${minTemp.toFixed(0)}°C`;
        minTempCell.className = "temp-cell min-temp";
        dayContainer.appendChild(minTempCell);

        const weatherDescriptionCell = document.createElement("td");
        weatherDescriptionCell.className = "weather-description-cell";
        weatherDescriptionCell.innerText = weatherDescription;
        dayContainer.appendChild(weatherDescriptionCell);

        table.appendChild(dayContainer);
    }




    weeklyDataContainer.appendChild(table);
}







function getCityID() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ed6ae091f7msh568fc8543e911fbp10257ejsn747206a77891',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
        }
    };

}

function getLocation(cityName) {

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    let tomorrowDateString = tomorrow.toISOString().split('T')[0];
    let nextWeekDate = new Date(tomorrow.getTime() + 7 * 24 * 60 * 60 * 1000);

    let nextWeekDateString = nextWeekDate.toISOString().split('T')[0];
    let dateObject = {
        "tomorrowDate": tomorrowDateString,
        "nextWeekDate": nextWeekDateString
    };

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ed6ae091f7msh568fc8543e911fbp10257ejsn747206a77891',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
        }
    };
    //gets the cityID
    fetch(`https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${cityName}&languagecode=en-us`, options)
        .then(response => response.json())
        .then(response => {
            console.log("hello", response)


            cityID = response[0].dest_id;

            //Gets the Hotels List Information
            fetch(`https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=${dateObject.tomorrowDate}&departure_date=${dateObject.nextWeekDate}&guest_qty=1&dest_ids=${cityID}&room_qty=1&search_type=city&children_qty=2&children_age=5%2C7&search_id=none&price_filter_currencycode=USD&order_by=popularity&languagecode=en-us&travel_purpose=leisure`, options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    listHotels(response.result)
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));

}

function listHotels(hotelsArray) {
    const imageContainer = document.getElementById('hotels');
    imageContainer.innerHTML = "";

    // Sort hotels by highest to lowest review score
    hotelsArray.sort((a, b) => b.review_score - a.review_score);

    for (i = 0; i < 24; i++) {

        const hotel = hotelsArray[i];
        console.log("Hotel Name", hotel.hotel_name);

        const hotelCardHolder = document.createElement('div');
        hotelCardHolder.className = 'hotel-card';

        const hotelImage = document.createElement('img');
        hotelImage.className = 'image-of-hotel';
        hotelImage.src = hotelsArray[i].main_photo_url;

        const hotelReviewScore = document.createElement('p');
        hotelReviewScore.className = 'review-score-of-hotel';
        hotelReviewScore.innerText = `Review Score: ${hotelsArray[i].review_score}`;

        const hotelName = document.createElement('h1');
        hotelName.className = 'name-of-hotel';
        hotelName.innerText = hotelsArray[i].hotel_name;

        const hotelAddress = document.createElement('h2');
        hotelAddress.className = 'address-of-hotel';
        hotelAddress.innerText = hotelsArray[i].address;

        // ...

        const goButton = document.createElement('button');
        goButton.innerText = 'Visit';
        goButton.className = 'button'; // Add the new button class
        goButton.onclick = (function(hotel) {
            return function() {
                window.open(hotel.url, '_blank');
            }
        })(hotel);

        const goButtonTwo = document.createElement('button');
        goButtonTwo.innerText = 'Add to Trips';
        goButtonTwo.className = 'button'; // Add the new button class
        (function(index) {
            goButtonTwo.addEventListener("click", function() {
                let hotelXNameTemp = 'hotel' + index + 'name';
                sessionStorage.setItem(hotelXNameTemp, hotelsArray[index].hotel_name);
                window.location.href = 'trips?num=' + index;
            });
        })(i);

        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'post';
        hiddenForm.display = 'none';
        hiddenForm.name = 'hiddenFormHotel';
        hiddenForm.action = '/trips';

        const inputHotelName = document.createElement('input');
        inputHotelName.type = 'hidden';
        inputHotelName.name = 'hotelName';
        inputHotelName.value = hotelsArray[i].hotel_name;
        hiddenForm.append(inputHotelName);

        const inputHotelURL = document.createElement('input');
        inputHotelURL.type = 'hidden';
        inputHotelURL.name = 'hotelURL';
        inputHotelURL.value = hotelsArray[i].url;
        hiddenForm.append(inputHotelURL);

        const addHotelButton = document.createElement('button');
        addHotelButton.textContent = 'Add hotel';
        addHotelButton.addEventListener('click', () => {
            hiddenForm.submit();
        });

        // Add all the elements to the hotel card holder
        hotelCardHolder.appendChild(hotelImage);
        hotelCardHolder.appendChild(hotelReviewScore);
        hotelCardHolder.appendChild(hotelName);
        hotelCardHolder.appendChild(hotelAddress);
        hotelCardHolder.appendChild(goButton);
        //hotelCardHolder.appendChild(goButtonTwo);
        hotelCardHolder.appendChild(hiddenForm);
        hotelCardHolder.appendChild(addHotelButton);

        // Add the hotel card holder to the image container
        imageContainer.appendChild(hotelCardHolder);
    }
}


/*function loadTrips() { // This function is called when the cart page is loaded
    let hotelNum = window.location.href.split('=')[1];

    let savedHotels = (sessionStorage.getItem('savedHotels'));
    if (!savedHotels.includes(hotelNum)) {
        savedHotels += hotelNum + ',';
    };
    console.log(savedHotels);

    sessionStorage.setItem('savedHotels', savedHotels);
    let innerTexting = '';
    savedHotels.split(',').forEach(function(hotelIndex) {
        console.log('hotelIndex: ' + hotelIndex);
        if (hotelIndex) {
            innerTexting += sessionStorage.getItem('hotel' + hotelIndex + 'name') + '\n';
        };
    });

    document.getElementById('cartHotelData').innerText = innerTexting;
};*/

// document.addEventListener('DOMContentLoaded', function() {
//     var tripDateInput = document.getElementById('tripDateInput');
//     var tripDatePicker = new Picker(tripDateInput, {
//         format: 'yyyy-mm-dd', // Date format
//         min: new Date(), // Set the minimum date to today
//         // Date picker options go here
//     });
// });

// var tripDatePicker = new Picker(tripDateInput, {
//     format: 'dd mmm yyyy', // Date format like 01 Jan 2024
//     defaultDate: new Date(2024, 0, 1), // Set the default date to January 1, 2024
//     disable: [ // Disable certain dates
//         new Date(2024, 0, 2),
//         new Date(2024, 0, 3),
//         new Date(2024, 0, 4)
//     ]
// });

// var tripDatePicker = flatpickr("#tripDateInput", {
//     clickOpens: true,
//     // Calendar options go here
// });

// const tripDateInput = document.getElementById("tripDateInput");

// tripDateInput.addEventListener("keydown", (event) => {
//     if (event.key === "Enter") {
//         // Add a newline character to the text
//         tripDateInput.value += "\n";
//         // Prevent the default behavior of the "enter" key
//         event.preventDefault();
//     }
// });







window.onload = function() {
    document.getElementById("sendButton").onclick = function() {
        cityName = document.getElementById("cityNameInput").value;
        getWeather(cityName);
        getLocation(cityName);
    };
};