const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

let cityInput = "Mandi, India";

cities.forEach((city) => {
    city.addEventListener("click", (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        searchImages(); 
        app.style.opacity = "0";
    });
});

form.addEventListener("submit", (e) => {
    if (search.value.length == 0) {
        alert("Please type in a city name");
    } else {
        cityInput = search.value;
        fetchWeatherData();
        searchImages(); 
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayOfWeek(day, month, year) {
    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekdays[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
    
    const weatherApiKey = "YOUR_API_KEY";

    fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfWeek(d, m, y)} ${d}/${m}/${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;

            icon.src = data.current.condition.icon;

            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";

            let timeOfDay = "day";
            const code = data.current.condition.code;
            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            if (code == 1000) {
                app.style.backgroundImage = `url(${results[0].urls.regular})`;
                if (timeOfDay == "night") {
                    app.style.backgroundImage  = `url(${results[0].urls.regular})`;
                }
            } else if (
                [1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1287].includes(code)
            ) {
                app.style.backgroundImage =  `url(${results[0].urls.regular})`;;
                if (timeOfDay == "night") {
                    app.style.backgroundImage = `url(${results[0].urls.regular})`;
                }
            } else if (
                [1063, 1069, 1072, 1150, 1153, 1180, 1183, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1249, 1252].includes(code)
            ) {
                app.style.backgroundImage = `url(${results[0].urls.regular})`;
                if (timeOfDay == "night") {
                    app.style.backgroundImage = `url(${results[0].urls.regular})`;
                }
            } else {
                app.style.backgroundImage = `url(${results[0].urls.regular})`;
                if (timeOfDay == "night") {
                    app.style.backgroundImage = `url(${results[0].urls.regular})`;
                }
            }

            app.style.opacity = "1";
        })
        .catch(() => {
            
            app.style.opacity = "1";
        });
}


fetchWeatherData();
searchImages(); 
app.style.opacity = "1";


const accessKey = "YOUR_API_KEY";
const searchForm = document.getElementById("locationInput");
const searchBox = document.getElementsByClassName(".search");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = cityInput;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page == 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    if (results.length > 0) {
        app.style.backgroundImage = `url(${results[0].urls.regular})`;
    }

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
