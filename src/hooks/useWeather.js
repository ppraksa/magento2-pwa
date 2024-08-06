import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to get Weather
 * @param lat
 * @param lon
 * @return {{weatherData: object, loading: boolean, error: object}}
 */
const useWeather = (lat, lon) => {
    const API_KEY = 'd4fc5c5a608c71c0332337445bc6bbeb';

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                setWeatherData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (lat && lon) {
            fetchWeather();
        }
    }, [lat, lon, API_KEY, setWeatherData]);

    return { weatherData, loading, error };
};

export default useWeather;
