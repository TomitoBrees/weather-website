import React, {useEffect, useState} from "react";
import "./Weather.css";

import thunderstormIcon from '../Images/thunderstorm.png';
import drizzleIcon from '../Images/drizzle.png';
import rainIcon from '../Images/rain.png';
import snowIcon from '../Images/snow.png';
import fogIcon from '../Images/fog.png';
import clearIcon from '../Images/clear.png';
import clouds1Icon from '../Images/clouds-1.png';
import clouds2Icon from '../Images/clouds-2.png';
import clouds3Icon from '../Images/clouds-3.png';

function Weather() {

    const [weather, setWeather] = useState(null);
    let icon = null;
    async function getWeather(lat, lon) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=1cf897b7c6b443ea8852d8758761d084`);
            if(response.ok) {
                const jsonResponse = await response.json();
                setWeather(jsonResponse);
                console.log(jsonResponse);
            }
        }
        catch (error) {
            console.log("Error while fetching the weather");
        }
    }
    async function getWeatherFromLocation() {
        if(navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                await getWeather(position.coords.latitude.toFixed(2), position.coords.longitude.toFixed(2));
            }
            catch(error) {
                console.log("Geolocation failed");
            }
        }
        else {
            console.log("Geolocation not supported");
        }
    }

    useEffect(() => {
        getWeatherFromLocation()
    }, []);

    if (weather) {
        switch (weather.weather[0].main) {
            case "Thunderstorm":
                icon = thunderstormIcon;
                break;
            case "Drizzle":
                icon = drizzleIcon;
                break;
            case "Rain":
                icon = rainIcon;
                break;
            case "Snow":
                icon = snowIcon;
                break;
            case "Mist":
            case "Smoke":
            case "Haze":
            case "Dust":
            case "Fog":
            case "Sand":
            case "Ash":
            case "Squall":
            case "Tornado":
                icon = fogIcon;
                break;
            case "Clear":
                icon = clearIcon;
                break;
            case "Clouds":
                switch (weather.weather[0].id) {
                    case 801:
                        icon = clouds1Icon;
                        break;
                    case 802:
                        icon = clouds2Icon;
                        break;
                    case 803:
                    case 804:
                        icon = clouds3Icon;
                        break;
                    default:
                        icon = null;
                        break;
                }
                break;
            default:
                icon = null;
                break;
        }
    }


    return (
        <div className="Weather">
            {weather && icon &&(
                <div>
                    <h2>{weather.name}</h2>
                    <img src={icon} />
                    <p>Temperature: {weather.main.temp}°C</p>
                </div>
            )}
        </div>
    )
}

export default Weather;