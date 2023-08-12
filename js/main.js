// api resources: 
// https://github.com/public-apis/public-apis#weather
// https://openweathermap.org/api
// https://unsplash.com/documentation

let weather = {
  key: "9e0476eac94ec9bb89530e3f73721eb3",
  fetchData: function (city, province, country) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${province},${country}&appid=${this.key}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => this.updateWeather(data));
  },
  fetchDataLocation: function(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.key}&units=metric`)
        .then(response => response.json())
        .then(data => this.updateWeather(data));
  },
  updateWeather: function (data) {
    const { name } = data; // city name
    const { temp, feels_like, humidity } = data.main; // temp and humidity
    const { description, icon } = data.weather[0]; // description and icon
    const { speed } = data.wind; // wind speed

    document.querySelector(".city").textContent = `Current Weather in ${name}`;
    document.querySelector(".temp").textContent = `Temp: ${temp}°C`;
    document.querySelector(".feels-like").textContent = `Feels Like: ${feels_like}°C`
    document.querySelector(".humidity").textContent =  `Humidity: ${humidity}%`;
    document.querySelector(".description").textContent = `${description}`;
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".speed").textContent = `Wind Speed: ${speed} km/h`;
    image.fetchImage(description);
  },
  getWeather: function(){
    const city = document.querySelector("#city").value;
    const province = document.querySelector("#province").value;
    const country = document.querySelector("#country").value;
    this.fetchData(city, province, country);
  },
  success: function(position){
    weather.fetchDataLocation(position.coords.latitude, position.coords.longitude);
  },
  error: function(){
    console.log("Can not display weather at your current location as, your location not available!!!");
  },
  loadInit: function(){
    if(!navigator.geolocation){
        weather.fetchData("Barrie", "ON", "CA");
    } else{
        navigator.geolocation.getCurrentPosition(this.success, this.error);
    }
  }
};

let image = {
    accessKey: "ZYCDhLhg8IOwEUHsGCZCoCvrlvcFkqIQTJp3VelHb5A",
    secretKey: "dNwccwx0k7rWpdqtHGNtYhbG6CILW5TkoWzIwFC6yas",
    fetchImage: function(weatherDescription){
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${weatherDescription}&client_id=${this.accessKey}`)
        .then(response => response.json())
        .then(data => this.updateImage(data));
    },
    updateImage: function(data){
        let imageIndex = Math.floor(Math.random() * 10);
        const {download} = data.results[imageIndex].links;
        
        const body = document.querySelector("body"); 
        body.style.backgroundImage = `url(${download})`;
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
    }
};

weather.loadInit();
document.querySelector("#search").addEventListener("click", () => {
    weather.getWeather();
});

document.querySelector("#city").addEventListener("keyup", (event)=>{
    if(event.key == "Enter"){
        weather.getWeather();
    }
});

document.querySelector("#province").addEventListener("keyup", (event)=>{
    if(event.key == "Enter"){
        weather.getWeather();
    }
});

document.querySelector("#country").addEventListener("keyup", (event)=>{
    if(event.key == "Enter"){
        weather.getWeather();
    }
});