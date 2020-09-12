if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(registration => {
    console.log("Service Worker Registered!");
    console.log(registration);
  }).catch(error => {
    console.log("Service Worker Failed!");
    console.log(console.error);
  });
}





const api = {
    key: "3fe96d8a7d9de6dba1d46cd5e4f910dc",
    base: "https://api.openweathermap.org/data/2.5/"
} 
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value)
  }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }

  function displayResults (weather) {
      //console.log(weather);
  }

  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let currentDate = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(currentDate);
  
    let temperature = document.querySelector('.current .temperature');
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_icon = document.querySelector('.current .weather-icon');
    weather_icon.innerHTML = `<img src="/icons/${weather.weather[0].icon}.png" alt=${weather.weather[0].main} />`;

    let weather_result = document.querySelector('.current .weather-desc');
    weather_result.innerText = weather.weather[0].description;
  
    let high_low = document.querySelector('.high-low');
    high_low.innerText = `High: ${weather.main.temp_max}°c Low: ${weather.main.temp_min}°c`;
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }


  const saveToLocalStorage = () => {
    
    localStorage.setItem('weather-searches', getResults)
  };

  searchbox.addEventListener('keypress', saveToLocalStorage);

