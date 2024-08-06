import React, {useEffect, useState} from 'react';
import ReactLoading from 'react-loading';
import { useStyle } from '@magento/venia-ui/lib/classify';
import useWeather from 'hooks/useWeather';
import defaultClasses from 'components/Header/weather.module.css';

/**
 * Weather component - shows weather in the Header component
 *
 * @return {JSX.Element|null}
 */
const Weather = ({ unit }) => {
    unit = unit || '\u00b0 C';
    const classes = useStyle(defaultClasses);
    const [coords, setCoords] = useState({lat: null, lon: null});
    const {weatherData, loading, error} = useWeather(coords.lat, coords.lon);

    const defaultLatLong = {
        coords: {
            latitude: '50.049683',
            longitude: '19.944544'
        }
    }; // Default city [Kraków]

    useEffect(async () => {
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(
                position => {
                    setCoords({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                error => {
                    console.warn('Problem getting geolocation probably client denied:', error);

                    setCoords((prevState) => {
                        let { coords : { latitude: lat, longitude: lon } } = defaultLatLong;

                        return {
                            lat,
                            lon
                        }
                    });
                },
                {
                    enableHighAccuracy: false, // just in case for mobile devices
                    timeout: 15000,
                    maximumAge: (3600 * 1000), // check position at least every one hour
                    forceRequestLocation: false,
                },
            );
        }
    }, []);

    if (loading || (!coords.lat || !coords.lon)) {
        return (
            <div className={classes.weather}>
                <ReactLoading type="spin" color="#000" height={25} width={25} />
            </div>
        );
    }

    if (error) {
        console.error('An error occurred:', error);
        return null; // do not show anything for the user
    }

    return (
        <div className={classes.weather}>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                 alt={weatherData.weather[0].description}/>
            <div className={classes.weatherData}>
                <span>{weatherData.name}</span>
                <span>{Math.ceil(weatherData.main.temp)} {unit}</span>
            </div>
        </div>
    );
};

export default Weather;
