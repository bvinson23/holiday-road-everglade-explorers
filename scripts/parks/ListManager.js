import { useParks, getParks } from "./ParkProvider.js"
import { settings } from "../Settings.js"
import { getWeather } from "../weather/WeatherProvider.js"
import { getForcast } from "../weather/WeatherList.js"

export let parkArray = [];

export const entryParksLoop = () => {
    getParks(settings.npsKey).then(() => {
        const park = useParks()
        park.forEach((item) => {
            if (item.states === "NC" || item.states === "TN" || item.states === "VA") {
                parkArray.push(item);
            }
        })
        const entryHTMLSelector = document.querySelector("#choosePark")
        parkArray.forEach((item, index) => {
            entryHTMLSelector.options[index + 1] = new Option(item.name, item.id)
        })
    })
}

export let currentWeather = []

export const parkCard = (parkId) => {
    parkArray.forEach(item => {
        if (item.id === parkId) {
            currentWeather = getWeather(item.latitude, item.longitude, settings.weatherKey)
            .then(dailyweather => {
                getForcast(dailyweather);
            }).then(parsedailyweather=> {
            const parkHTML = `
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p>${item.addresses[0].city}, ${item.addresses[0].stateCode}</p>
            <div id="natParksDetails" class="modal">
            <!-- Modal content -->
                <div class="modal-content">
                    <div>
                        <h3>${item.images[0].title}</h3>
                        <img src=${item.images[0].url} alt="${item.images[0].altText}">
                    </div>    
                    <span id="closeparkdets" class="close">&times;</span>
                 </div>
    
            </div>
            `
            document.querySelector(".parkCard").innerHTML = parkHTML;
            return parsedailyweather;
            })
        }
    });
}