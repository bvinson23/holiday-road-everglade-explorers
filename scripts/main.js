import { getEateries } from "./eateries/EateryProvider.js"
import { getParks } from "./parks/ParkProvider.js"

import {getAttractions} from "./attractions/AttractionProvider.js"
import { getWeather } from "./weather/WeatherProvider.js";
import { getForcast } from "./weather/WeatherList.js";
import { settings } from "./Settings.js"

getAttractions();
const fiveday = () => {
    getWeather("37.58", "-85.67", settings.weatherKey)
    .then(dailyweather => {
        return getForcast(dailyweather);
    });
} 

    
