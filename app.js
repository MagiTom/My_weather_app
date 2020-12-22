// https://openweathermap.org/api/one-call-api 

const navigation = document.querySelector('.navigation__hidden');
const searchBtn = document.querySelector('.btnSearch');
const closeBtn = document.querySelector('.navigation__close');
const city1Btn = document.querySelector('.navigation__city1');
const city2Btn = document.querySelector('.navigation__city2');
const city3Btn = document.querySelector('.navigation__city3');
const city4Btn = document.querySelector('.navigation__city4');
const city5Btn = document.querySelector('.navigation__city5');
const city6Btn = document.querySelector('.navigation__city6');

//First City which we see when window is open
let lat = 50.26;
let lon = 19.03;
let city = 'Katowice';

//icons
const icon = {
    'Clouds': 'fa-cloud',
    'Rain': 'fa-cloud-showers-heavy',
    'Snow': 'fa-snowflake',
    'Clear': 'fa-sun',
    'Thunderstorm': 'fa-poo-storm',
    'Drizzle': 'fa-cloud-rain',
    'Mist': 'fa-smog',
    'Smoke': 'fa-smog',
    'Haze': 'fa-smog',
    'Dust': 'fa-smog',
    'Fog': 'fa-smog',
    'Sand': 'fa-smog',
    'Ash': 'fa-smog',
    'Squall': 'fa-smog',
    'Tornado': 'fa-smog',
}

//backgrounds
const backgrounds = {
    'Clouds': 'https://images.unsplash.com/photo-1531273877009-1975420cb1fc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'Rain': 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
    'Snow': 'https://images.unsplash.com/photo-1516715094483-75da7dee9758?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    'Clear': 'https://images.unsplash.com/photo-1601568585322-70bc574fd35a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80',
    'Thunderstorm': 'https://images.unsplash.com/photo-1574781481375-74a09eba71e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'Drizzle': 'https://images.unsplash.com/photo-1493314894560-5c412a56c17c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'Mist': 'https://images.unsplash.com/photo-1505999502279-7ef4cea2f33d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
    'Smoke': 'https://images.unsplash.com/photo-1505999502279-7ef4cea2f33d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
    'Haze': 'https://images.unsplash.com/photo-1505999502279-7ef4cea2f33d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
    'Dust': 'https://images.unsplash.com/photo-1505999502279-7ef4cea2f33d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
    'Fog': 'https://images.unsplash.com/photo-1505999502279-7ef4cea2f33d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
    'Sand': 'https://images.unsplash.com/photo-1505999502279-7ef4cea2f33d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
    'Ash': 'https://images.unsplash.com/photo-1505999502279-7ef4cea2f33d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
    'Squall': 'https://images.unsplash.com/photo-1505999502279-7ef4cea2f33d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
    'Tornado': 'https://images.unsplash.com/photo-1505999502279-7ef4cea2f33d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
}

//Convert time from Api to normal format
function timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[a.getMonth()];
    const date = a.getDate();
    const time = date + ' ' + month;
    return time;
}

//Main class
class Weather {
    constructor(city, lat, lon) {
        this.lat = lat;
        this.lon = lon;
        this.city = city;
    }

    showWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&units=metric&exclude=hourly&appid=20582e3998f696edc3bf3b77fe522eb1`)
            .then(response => response.json())
            .then(data => {
                const temperature = Math.round(data.current.temp);
                const date = data.current.dt;
                const weatherStatus = data.current.weather[0].main;
                const city = this.city;


                // change backgrounds

                document.querySelector('.background-image').style.backgroundImage = `url(${backgrounds[weatherStatus]})`;
                document.querySelector('.app').style.backgroundImage = `url(${backgrounds[weatherStatus]})`;


                //Add info to main panel
                document.querySelector('.app__temperature').textContent = `${temperature}`;
                document.querySelector('.app__weather i').classList.add(icon[weatherStatus]);
                document.querySelector('.app__city').textContent = city;
                document.querySelector('.app__date').textContent = timeConverter(date);


                //Show info about next days
                //Next day 1

                document.querySelector('.tommorrow1__day').textContent = timeConverter(data.daily[1].dt);
                document.querySelector('.tommorrow1__weather i').classList.add(icon[data.daily[1].weather[0].main]);
                document.querySelector('.tommorrow1__temperature').textContent = Math.round(data.daily[1].temp.day);

                //Next day 2

                document.querySelector('.tommorrow2__day').textContent = timeConverter(data.daily[2].dt);
                document.querySelector('.tommorrow2__weather i').classList.add(icon[data.daily[2].weather[0].main]);
                document.querySelector('.tommorrow2__temperature').textContent = Math.round(data.daily[2].temp.day);

                //Next day 3

                document.querySelector('.tommorrow3__day').textContent = timeConverter(data.daily[3].dt);
                document.querySelector('.tommorrow3__weather i').classList.add(icon[data.daily[3].weather[0].main]);
                document.querySelector('.tommorrow3__temperature').textContent = Math.round(data.daily[3].temp.day);

                //Next day 4

                document.querySelector('.tommorrow4__day').textContent = timeConverter(data.daily[4].dt);
                document.querySelector('.tommorrow4__weather i').classList.add(icon[data.daily[4].weather[0].main]);
                document.querySelector('.tommorrow4__temperature').textContent = Math.round(data.daily[4].temp.day);

            });
    }
}

//Removing classes from icon
function removeClass() {
    document.querySelector('.app__weather i').classList = 'fas';
    document.querySelector('.tommorrow1__weather i').classList = 'fas';
    document.querySelector('.tommorrow2__weather i').classList = 'fas';
    document.querySelector('.tommorrow3__weather i').classList = 'fas';
    document.querySelector('.tommorrow4__weather i').classList = 'fas';
}

//Make click for every city objects
const katowice = new Weather(city, lat, lon);
katowice.showWeather();

city1Btn.addEventListener('click', function () {
    removeClass();
    katowice.showWeather();
})

city2Btn.addEventListener('click', function () {
    removeClass();
    const krakow = new Weather('Kraków', 50.04, 19.56);
    krakow.showWeather();
})

city3Btn.addEventListener('click', function () {
    removeClass();
    const warszawa = new Weather('Warszawa', 52.13, 21.00);
    warszawa.showWeather();
})

city4Btn.addEventListener('click', function () {
    removeClass();
    const wroclaw = new Weather('Wrocław', 51.06, 17.02);
    wroclaw.showWeather();
})

city5Btn.addEventListener('click', function () {
    removeClass();
    const gdansk = new Weather('Gdańsk', 54.21, 18.40);
    gdansk.showWeather();
})


city6Btn.addEventListener('click', function () {
    removeClass();
    const lublin = new Weather('Lublin', 51.15, 22.34);
    lublin.showWeather();
})


//Navigation show and close 
searchBtn.addEventListener('click', function () {
    showNavigation();
})


closeBtn.addEventListener('click', function () {
    closeNavigation();
})

function showNavigation() {
    navigation.classList.remove('navigation__hidden');
    navigation.classList.add('navigation__active');
}

function closeNavigation() {
    navigation.classList.remove('navigation__active');
    navigation.classList.add('navigation__hidden');
}

//close navigation when you click on window
window.addEventListener('click', function (e) {
    if (navigation.classList.contains('navigation__active') && e.target !== searchBtn && e.target !== searchBtn.firstElementChild && !e.target.classList.contains('navigation__active') && !e.target.parentElement.classList.contains('navigation__active') && !e.target.parentElement.parentElement.classList.contains('navigation__active')) {
        closeNavigation();
    }
});