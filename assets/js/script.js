
//Global Variables
let searchCities = document.querySelector('#search-button')
let input = document.getElementById('search-input')
let forecast = document.getElementById('forecast-header')
let cityDiv = document.querySelector('.input-group')
let getForecast = document.querySelector('#cities-container')
let historyDiv = document.querySelector('#history')

let cityArray = []
let cityBtn

// API key openweather
let apiKey = 'c458b70481c32dafcb6d2daf5e59d53c';

// Add click event to the search button
searchCities.addEventListener('click', function (e) {
	e.preventDefault()
	let searchCity = input.value
	weather()

	if (searchCity !== '') {
		if (!cityArray.includes(searchCity)) {
			cityArray.push(searchCity)
		}
		storePlaces()
		savedCities(cityArray)
	}
})

// Search history buttons
function savedCities(cityArray) {
	getForecast.innerHTML = ''
	for (let i = 0; i < cityArray.length; i++) {
		let city = cityArray[i]
		let firstL = city.slice(0, 1).toUpperCase()
		let restL = city.slice(1)
		city = firstL + restL
		cityBtn = document.createElement('button')
		cityBtn.innerHTML = city
		getForecast.prepend(cityBtn)
	}
}

// Sets the latitude and longitude
function weather() {
	let searchCity = input.value
	fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${apiKey}&units=metric`)
		.then(response => response.json())
		.then(data => {
			let city = data[0]
			lat = city.lat
			lon = city.lon

			return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
		})
		.then(response => response.json())
		.then(data => {

			// Display the weather  
			let currentDate = moment(data.list[0].dt, 'X').format("DD/MM/YYYY")
			let currentIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

			let currentForecast = document.querySelector('#forecast-area').innerHTML = `
        <h1>${data.city.name} <span>(${currentDate})<img src="${currentIcon}"/></span></h1>
                <p>Temp: ${(data.list[0].main.temp)} °C</p>
                <p>Wind: ${data.list[0].wind.speed} KPH</p>
                <p>Humidity: ${data.list[0].main.humidity}%</p>
        `
			$("#forecast-area").css({ "border": "2px solid black", "padding": "10px" })


			// Title to the 5 day forecast
			forecast.innerHTML = '5-Day Forecast:'

			// Styles for 5 days forecast
			$("#forecast-one, #forecast-two, #forecast-three, #forecast-four, #forecast-five").css({
				"background": '#222F3E', "color": "white", "margin": "10px 5px 1px 0px", "padding": "10px 60px 10px 10px"
			})

			// Display forecast for the next 5 days
			let dayOne = moment(data.list[7].dt, 'X').format("DD/MM/YYYY")
			let iconOne = `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@2x.png`;
			let forecastOne = document.querySelector('#forecast-one').innerHTML = `
                <h4> <span>${dayOne}</span></h4>
                <img src="${iconOne}"/>
                <p>Temp: ${(data.list[7].main.temp)}°C</p>
                <p>Wind: ${data.list[7].wind.speed} KPH</p>
                <p>Humidity: ${data.list[7].main.humidity}%</p>
        `
			let dayTwo = moment(data.list[15].dt, 'X').format("DD/MM/YYYY")
			let iconTwo = `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@2x.png`;
			let forecastTwo = document.querySelector('#forecast-two').innerHTML = `
                <h4> <span>${dayTwo}</span></h4>
                <img src="${iconTwo}"/>
                <p>Temp: ${(data.list[15].main.temp)}°C</p>
                <p>Wind: ${data.list[15].wind.speed} KPH</p>
                <p>Humidity: ${data.list[15].main.humidity}%</p>    
         `
			let dayThree = moment(data.list[23].dt, 'X').format("DD/MM/YYYY")
			let iconThree = `https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@2x.png`;
			let forecastThree = document.querySelector('#forecast-three').innerHTML = `
                <h4> <span>${dayThree}</span></h4>
                <img src="${iconThree}"/>
                <p>Temp: ${(data.list[23].main.temp)}°C</p>
                <p>Wind: ${data.list[23].wind.speed} KPH</p>
                <p>Humidity: ${data.list[23].main.humidity}%</p>
        `
			let dayFour = moment(data.list[31].dt, 'X').format("DD/MM/YYYY")
			let iconFour = `https://openweathermap.org/img/wn/${data.list[31].weather[0].icon}@2x.png`;
			let forecastFour = document.querySelector('#forecast-four').innerHTML = `
                <h4> <span>${dayFour}</span></h4>
                <img src="${iconFour}"/>
                <p>Temp: ${(data.list[31].main.temp)}°C</p>
                <p>Wind: ${data.list[31].wind.speed} KPH</p>
                <p>Humidity: ${data.list[31].main.humidity}%</p>
        `

			let dayFive = moment(data.list[39].dt, 'X').format("DD/MM/YYYY")
			let iconFive = `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}@2x.png`;
			let forecastFive = document.querySelector('#forecast-five').innerHTML = `
                <h4> <span>${dayFive}</span></h4>
                <img src="${iconFive}"/>
                <p>Temp: ${(data.list[39].main.temp)}°C</p>
                <p>Wind: ${data.list[39].wind.speed} KPH</p>
                <p>Humidity: ${data.list[39].main.humidity}%</p>
        `
		})
	input.value = ''
}


storageCities()

// Storing searched cities in localStorage
function storePlaces() {
	localStorage.setItem('data', JSON.stringify(cityArray))
}


// Functionality to the history buttons
getForecast.addEventListener('click', function (e) {
	e.preventDefault()
	console.log(e.target);

	if (e.target.matches('button')) {
		console.log(e.target);
		let cityName = e.target.textContent

		fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}&units=metric`)
			.then(response => response.json())
			.then(data => {
				let city = data[0]
				lat = city.lat
				lon = city.lon

				return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
			})
			.then(response => response.json())
			.then(data => {

				// Display the weather of a searched location    
				let currentDate = moment(data.list[0].dt, 'X').format("DD/MM/YYYY")
				let currentIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
				//console.log(day);

				let currentForecast = document.querySelector('#forecast-area').innerHTML = `
        <h1>${data.city.name} <span>(${currentDate})<img src="${currentIcon}"/></span></h1>
                <p>Temp: ${(data.list[0].main.temp)}°C</p>
                <p>Wind: ${data.list[0].wind.speed} KPH</p>
                <p>Humidity: ${data.list[0].main.humidity}%</p>
        `
				$("#forecast-area").css({ "border": "2px solid black", "padding": "10px" })

				// Add title to the 5 day forecast
				forecast.innerHTML = '5-Day Forecast:'

				// Style for 5 days forecast
				$("#forecast-one, #forecast-two, #forecast-three, #forecast-four, #forecast-five").css({
					"background": '#222F3E', "color": "white", "margin": "10px 5px 1px 0px", "padding": "10px 60px 10px 10px"
				})

				// Display forecast for the next 5 days
				let dayOne = moment(data.list[7].dt, 'X').format("DD/MM/YYYY")
				let iconOne = `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@2x.png`;
				let forecastOne = document.querySelector('#forecast-one').innerHTML = `
                <h4> <span>${dayOne}</span></h4>
                <img src="${iconOne}"/>
                <p>Temp: ${(data.list[7].main.temp)} °C</p>
                <p>Wind: ${data.list[7].wind.speed} KPH</p>
                <p>Humidity: ${data.list[7].main.humidity} %</p>
               `

				let dayTwo = moment(data.list[15].dt, 'X').format("DD/MM/YYYY")
				let iconTwo = `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@2x.png`;
				let forecastTwo = document.querySelector('#forecast-two').innerHTML = `
                <h4> <span>${dayTwo}</span></h4>
                <img src="${iconTwo}"/>
                <p>Temp: ${(data.list[15].main.temp)} °C</p>
                <p>Wind: ${data.list[15].wind.speed} KPH</p>
                <p>Humidity: ${data.list[15].main.humidity} %</p>    
       `
				let dayThree = moment(data.list[23].dt, 'X').format("DD/MM/YYYY")
				let iconThree = `https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@2x.png`;
				let forecastThree = document.querySelector('#forecast-three').innerHTML = `
                <h4> <span>${dayThree}</span></h4>
                <img src="${iconThree}"/>
                <p>Temp: ${(data.list[23].main.temp)} °C</p>
                <p>Wind: ${data.list[23].wind.speed} KPH</p>
                <p>Humidity: ${data.list[23].main.humidity} %</p>
    
       `
				let dayFour = moment(data.list[31].dt, 'X').format("DD/MM/YYYY")
				let iconFour = `https://openweathermap.org/img/wn/${data.list[31].weather[0].icon}@2x.png`;
				let forecastFour = document.querySelector('#forecast-four').innerHTML = `
                <h4> <span>${dayFour}</span></h4>
                <img src="${iconFour}"/>
                <p>Temp: ${(data.list[31].main.temp)} °C</p>
                <p>Wind: ${data.list[31].wind.speed} KPH</p>
                <p>Humidity: ${data.list[31].main.humidity} %</p>    
       `
				let dayFive = moment(data.list[39].dt, 'X').format("DD/MM/YYYY")
				let iconFive = `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}@2x.png`;
				let forecastFive = document.querySelector('#forecast-five').innerHTML = `
                <h4> <span>${dayFive}</span></h4>
                <img src="${iconFive}"/>
                <p>Temp: ${(data.list[39].main.temp)} °C</p>
                <p>Wind: ${data.list[39].wind.speed} KPH</p>
                <p>Humidity: ${data.list[39].main.humidity} %</p>    
        `
			})
	}
})

//Data from localStorage
function storageCities() {
	storedCities = JSON.parse(localStorage.getItem('data'))
	console.log(storedCities);
	if (storedCities !== null) {
		cityArray = storedCities
		console.log(cityArray);
	}
	savedCities(cityArray)
}