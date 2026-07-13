let body = document.querySelector("body");
let menuBar = document.querySelector("#menu");
let navPara = document.querySelector(".nav-para");
let menuOption = document.querySelector("#menu-option");
let loadingContainer = document.querySelector(".loading-container");


function showLoading() {
    loadingContainer.style.display = "flex";
}

function hideLoading() {
    loadingContainer.style.display = "none";
}


menuBar.addEventListener("click",() => {
    menuOption.classList.toggle("menu-option2");

});


let userInput = document.querySelector("#search-bar");
let searchBtn = document.querySelector("#search-btn");
let errorMessage = document.querySelector("#error-message");
let emptySearch = document.querySelector("#empty-search")
let cityName = document.querySelector("#city-name");
let dateTime = document.querySelector("#ddym-time");
let temp = document.querySelector("#degree");
let feelsLike = document.querySelector("#feels-like")
let humidity = document.querySelector("#percent");
let windSpeed = document.querySelector("#km");
let pressure = document.querySelector("#hpa");
let visibility = document.querySelector("#killometer");
let uvIndex = document.querySelector("#highLow");
let weatherCondition = document.querySelector("#condition")
let weatherIcon = document.querySelector("#weather-icon");
let aqi = document.querySelector("#aqi");

let searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", ()=>{
    let city = userInput.value.trim();
    if(city !== ""){
        showLoading();
        getData(city);
    }
});

userInput.addEventListener('keydown',(e)=>{
    if(e.key === "Enter"){
        searchBtn.click();
    }
});

let ddymtime = (localtime) => {
    let date = new Date(localtime);
    let formattedDate = date.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    
    let formattedTime = date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });
    
    dateTime.innerText = `${formattedDate} | ${formattedTime}`;
}


let changeWeather = (weatherCondition) => {
    
    let rainDrops = document.querySelectorAll(".rain");
    rainDrops.forEach(drop => drop.style.display = "none");
    
    if(weatherCondition === "Sunny"){
        body.style.backgroundImage = "url(bgimg1.jpg)";
    } else if(weatherCondition.toLowerCase().includes("rain")){
        body.style.backgroundImage = "url(rain.webp)";
        rainDrops.forEach(drop => drop.style.display = "block");
    } else if(weatherCondition === "Cloudy"){
        body.style.backgroundImage = "url(cloudy.jpg)";
    } else if(weatherCondition === "Mist"){
        body.style.backgroundImage = "url(mist.jpg)";
    } else if (weatherCondition === "Partly cloudy"){
        body.style.backgroundImage = "url(cloudy.jpg)";
    } else if (weatherCondition === "Overcast"){
        body.style.backgroundImage = "url(overcast.jpg)";
    } else if (weatherCondition === "Thunderstorm"){
        body.style.backgroundImage = "url(thunderstorm.jpeg)";
    } else if(weatherCondition === "Clear"){
        body.style.backgroundImage = "url(bgimg1.jpg)";
    } else if(weatherCondition === "Patchy rain nearby"){
        body.style.backgroundImage = "url(rain.webp)";
        rainDrops.forEach(drop => drop.style.display = "block");
    } else if(weatherCondition === "Heavy Rain"){
        body.style.backgroundImage = "url(rain.webp)";
        rainDrops.forEach(drop => drop.style.display = "block");
    } else if(weatherCondition === "Moderate rain"){
        body.style.backgroundImage = "url(rain.webp)";
        rainDrops.forEach(drop => drop.style.display = "block");
    } else if(weatherCondition.includes("Light rain")){
        body.style.backgroundImage = "url(rain.webp)";
        rainDrops.forEach(drop => drop.style.display = "block");
    } else {
        body.style.backgroundImage = "url(bgimg1.jpg)";
    }
}

let sunRise = document.querySelector("#sunrise")
let sunSet = document.querySelector("#sunset");

let sunSetRise = async(city)=>{
    const riseSetApi = `https://api.weatherapi.com/v1/astronomy.json?key=6ab065d6ba02484c92b212159260907&q=${city}`;
    let response2 = await fetch(riseSetApi);
    let data2 = await response2.json();
    sunRise.innerText = data2.astronomy.astro.sunrise;
    sunSet.innerText = data2.astronomy.astro.sunset;
}

let days = document.querySelectorAll(".day-name");
let temps = document.querySelectorAll(".temp");
let icons = document.querySelectorAll(".forecast-icon")
let foreCast = async (city) => {
    const foreCastApi = `https://api.weatherapi.com/v1/forecast.json?key=6ab065d6ba02484c92b212159260907&q=${city}&days=7&aqi=yes&alerts=no`;
    let response3 = await fetch(foreCastApi);
    let data3 = await response3.json();
    
    let forecast = data3.forecast.forecastday;
    forecast.forEach((day,index) => {

        let date = new Date(day.date)
        let dayName = date.toLocaleDateString("en-US",{
            weekday: "short",
        });
        days[index].innerText = dayName;
        temps[index].innerText = `${day.day.avgtemp_c}°C`;
        icons[index].src = `https:${day.day.condition.icon}`;
        
        
    });
}

let rain = document.querySelector("#rain-container");
let drop = document.createElement("span");

for(let drop=1; drop<=180;drop++){
let drop = document.createElement("span");
drop.classList.add("rain");
rain.append(drop);
drop.style.height = Math.random() * 12 + 10 + "px";
drop.style.left = Math.random() * window.innerWidth + "px";
drop.style.animationDuration = Math.random() * 0.4 + 0.6 + "s";
drop.style.animationDelay = Math.random() * -1 + "s"
}


let getData = async(city) => {
    try {
        const API = `https://api.weatherapi.com/v1/current.json?key=6ab065d6ba02484c92b212159260907&q=${city}&aqi=yes`;
        let response = await fetch(API);
        
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        let data = await response.json();
        cityName.innerText = data.location.name;
        temp.innerText = `${data.current.temp_c} °C`;
        ddymtime(data.location.localtime);
        feelsLike.innerText = `Feels Like ${data.current.feelslike_c} °C`;
        humidity.innerText = `${data.current.humidity} %`;
        windSpeed.innerText = `${data.current.wind_kph} Km/h`;
        pressure.innerText = `${data.current.pressure_mb} mb`;
        visibility.innerText = `${data.current.vis_km} km`;
        uvIndex.innerText = `${data.current.uv}`;
        weatherCondition.innerText = `${data.current.condition.text}`
        weatherIcon.src = `https:${data.current.condition.icon}`;
        let aqiElement = data.current.air_quality["us-epa-index"];
        let airQuality = "";
        switch(aqiElement){
            case 1 :
                airQuality = "Good";
                break;
            case 2 :
                airQuality = "Moderate";
                break;
             case 3 :
                airQuality = "Sensitive";
                break;
            case 4 :
                airQuality = "Unhealthy";
                break;
            case 5 :
                airQuality = "Very Bad";
                break;
            case 6 :
                airQuality = "Hazardous";
                break;
            default:
                airQuality = "N/A";
        }
        aqi.innerText = `AQI ${airQuality}`;
        changeWeather(data.current.condition.text);
        sunSetRise(city);
        foreCast(city);
        hideLoading();

        
        
        errorMessage.classList.remove("show");
        
        
        
    } catch(error) {
        errorMessage.classList.add("show");
        hideLoading();
        
    }
};

navigator.geolocation.getCurrentPosition((position) =>{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getData(`${lat},${lon}`);
},

    () =>{
        getData("Mumbai")
    }
);


