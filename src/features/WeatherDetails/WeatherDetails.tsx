import React, { useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import './WeatherDetails.css';
import { ThemeContext } from '../Themes/ThemeContext';
import { Themes } from '../Themes/Themes';
import { Spinner } from '../Spinner/Spinner';

const appId = '49ef749c42ca90e50dbcd142ee6cce02';

export interface WeatherDetailsProps {
  city: string;
  countryCode: string;
}

const kelvinToCelcius = (temperatureInKelvins: number) => {
  return Math.round(temperatureInKelvins - 273.15);
};

export const WeatherDetails = ({ city, countryCode }: WeatherDetailsProps) => {
  const theme = useContext(ThemeContext);
  const { data, error, refetch, isFetching } = useQuery({
    enabled: city !== '' && countryCode !== '', // Prevent automatic fetching
    queryFn: () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appId}`,
      ).then((res) => res.json()),
  });
  useEffect(() => {
    refetch();
  }, [city, countryCode, refetch]);

  const minTemperature = data?.main.temp_min
    ? `${kelvinToCelcius(data?.main.temp_min)}°`
    : undefined;
  const maxTemperature = data?.main.temp_max
    ? `${kelvinToCelcius(data?.main.temp_max)}°`
    : undefined;
  const currentTemperature = data?.main.temp
    ? `${kelvinToCelcius(data?.main.temp)}°`
    : undefined;
  const humidity = data?.main.humidity ? `${data?.main.humidity}%` : undefined;
  const requestedDatetime = data?.dt
    ? format(new Date(data.dt * 1000), 'dd-MM-yyyy hh:mmaaa')
    : undefined;
  const weather = data?.weather[0]?.main;
  const weatherIcon = data?.weather[0]?.icon;
  const weatherDescription = data?.weather[0]?.description;
  const currentTemperatureThemeClassname = `WeatherDetails-current-temperature-${Themes[theme]}`;
  const cityCountryCodeThemeClassname = `WeatherDetails-city-country-code-${Themes[theme]}`;

  if (city === '' || countryCode === '') {
    return <div>Please select the city and country code.</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (isFetching) {
    return (
      <div className="WeatherDetails-loading-spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="WeatherDetails">
      <div className="WeatherDetails-temperatures">
        <div>{"Today's weather"}</div>
        <div
          className={`WeatherDetails-current-temperature ${currentTemperatureThemeClassname}`}
        >
          {currentTemperature}
        </div>
        <div>
          H: {maxTemperature} L: {minTemperature}
        </div>
        <div
          className={`WeatherDetails-city-country-code ${cityCountryCodeThemeClassname}`}
        >
          {city}, {countryCode}
        </div>
      </div>
      <div className="WeatherDetails-divider" />
      <div className="WeatherDetails-weather">
        <div className="WeatherDetails-weather-image">
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
            alt={weatherDescription}
          />
        </div>
        <div className="WeatherDetails-weather-details">
          <div>{weather}</div>
          <div>Humidity: {humidity}</div>
          <div>{requestedDatetime}</div>
        </div>
      </div>
    </div>
  );
};

/*
{
    "coord": {
        "lon": -57.6359,
        "lat": -25.3007
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 300.84,
        "feels_like": 303.11,
        "temp_min": 299.44,
        "temp_max": 300.84,
        "pressure": 1007,
        "humidity": 69
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.09,
        "deg": 60
    },
    "clouds": {
        "all": 0
    },
    "dt": 1715041668,
    "sys": {
        "type": 1,
        "id": 8575,
        "country": "PY",
        "sunrise": 1714990551,
        "sunset": 1715030301
    },
    "timezone": -14400,
    "id": 3439389,
    "name": "Asunción",
    "cod": 200
}
*/
