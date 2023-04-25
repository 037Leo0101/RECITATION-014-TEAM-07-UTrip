let cityID = "";


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


   const urlWeek = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=7e675e2b2c0bd91ed1e3b2c16a408a27`;


   fetch(urlWeek)
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
           displayWeeklyData(data);
       })
       .catch(function (error) {
           console.error("Error:", error);
       });


}


function displayWeeklyData(data) {
   const list = data.list;
   const weeklyDataContainer = document.getElementById("weekly-data");
   weeklyDataContainer.innerHTML = ""; // Clear the previous data


   for (let i = 0; i < list.length; i++) {
       const dayData = list[i];
       const maxTemp = dayData.main.temp_max - 273.15; // Convert Kelvin to Celsius
       const minTemp = dayData.main.temp_min - 273.15; // Convert Kelvin to Celsius
       const weatherDescription = dayData.weather[0].description;
       const weatherIconCode = dayData.weather[0].icon;
       const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;


       const dayContainer = document.createElement("div");
       dayContainer.className = "day-container";


       const dayHeader = document.createElement("h4");
       dayTime = dayData.dt_txt
       dayHeader.innerText = `${dayTime}`;
       dayContainer.appendChild(dayHeader);


       const weatherIcon = document.createElement("img");
       weatherIcon.src = weatherIconUrl;
       dayContainer.appendChild(weatherIcon);


       const maxTempParagraph = document.createElement("p");
       maxTempParagraph.innerText = `Max temperature: ${maxTemp.toFixed(2)}°C`;
       dayContainer.appendChild(maxTempParagraph);


       const minTempParagraph = document.createElement("p");
       minTempParagraph.innerText = `Min temperature: ${minTemp.toFixed(2)}°C`;
       dayContainer.appendChild(minTempParagraph);


       const weatherDescriptionParagraph = document.createElement("p");
       weatherDescriptionParagraph.innerText = `Weather: ${weatherDescription}`;
       dayContainer.appendChild(weatherDescriptionParagraph);


       weeklyDataContainer.appendChild(dayContainer);
   }
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
   const imageContainer = document.getElementById('hotels')
   imageContainer.innerHTML = ""
   // Sort hotels by highest to lowest review score
   hotelsArray.sort((a, b) => b.review_score - a.review_score);


   for (i = 0; i < 10; i++) {
    const hotel = hotelsArray[i];
        
    // Create the card
    const card = document.createElement('div');
    card.className = 'card';

    // Create the image
    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = hotelsArray[i].main_photo_url;
    img.width = 400;
    img.height = 400;
    card.appendChild(img);

    // Create the card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create the hotel name
    const hotelName = document.createElement('h5');
    hotelName.className = 'card-title';
    hotelName.innerText = hotelsArray[i].hotel_name;
    cardBody.appendChild(hotelName);

    // Create the hotel address
    const hotelAddress = document.createElement('p');
    hotelAddress.className = 'card-text';
    hotelAddress.innerText = hotelsArray[i].address;
    cardBody.appendChild(hotelAddress);

    // Create the review score
    const hotelReviewScore = document.createElement('p');
    hotelReviewScore.className = 'card-text';
    hotelReviewScore.innerText = `Review Score: ${hotelsArray[i].review_score}`;
    cardBody.appendChild(hotelReviewScore);

    // Create the "Go" button
    const goButton = document.createElement('a');
    goButton.className = 'btn btn-primary';
    goButton.href = hotel.url;
    goButton.target = '_blank';
    goButton.innerText = 'Go';
    cardBody.appendChild(goButton);

    const hotelGoButton = document.createElement('a');
    hotelGoButton.className = 'btn btn-primary';
    hotelGoButton.href = hotel.url;
    hotelGoButton.target = '_blank';
    hotelGoButton.innerText = 'Add to my trip';
    cardBody.appendChild(hotelGoButton);


    // Append the card body to the card
    card.appendChild(cardBody);

    // Append the card to the container
    imageContainer.appendChild(card);


   }
}


window.onload = function () {
   document.getElementById("sendButton").onclick = function () {
       cityName = document.getElementById("cityNameInput").value;
       getWeather(cityName);
       getLocation(cityName);




   };
};





