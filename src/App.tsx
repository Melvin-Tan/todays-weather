import React, { useState } from 'react';
import { Button } from './features/Button/Button';
import { Themes } from './features/Themes/Themes';
import { ThemeContext } from './features/Themes/ThemeContext';
import { Autocomplete } from './features/Autocomplete/Autocomplete';
import { AUTOCOMPLETE_CITY_COUNTRY_CODES_LIST } from './features/CityCountryCodes/CityCountryCodes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WeatherDetails } from './features/WeatherDetails/WeatherDetails';
import {
  SearchHistory,
  SearchHistoryItem,
} from './features/SearchHistory/SearchHistory';
import {
  addSearchHistoryItem,
  deleteSearchHistoryItem,
} from './features/SearchHistory/LocalStorage/SearchHistoryLocalStorage';
import './App.css';

const weatherQueryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState(Themes.Light);
  const [cityCountryCode, setCityCountryCode] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(
    JSON.parse(localStorage.getItem('searchHistory') ?? '[]'),
  );
  const city = cityCountryCode.split(', ')[0];
  const countryCode = cityCountryCode.split(', ')[1];
  const appClassName = `App-${Themes[theme]}`;
  const detailsClassName = `App-details-${Themes[theme]}`;

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`App ${appClassName}`}>
        <header className="App-header">
          <div className="App-theme-button">
            <Button
              onClick={() =>
                setTheme(theme === Themes.Light ? Themes.Dark : Themes.Light)
              }
            >
              Toggle theme
            </Button>
          </div>
          <Autocomplete
            items={AUTOCOMPLETE_CITY_COUNTRY_CODES_LIST}
            placeholder="e.g. Singapore, SG"
            onSelectItem={({ name }) => {
              setCityCountryCode(name);
              const city = name.split(', ')[0];
              const countryCode = name.split(', ')[1];
              const updatedSearchHistory = addSearchHistoryItem({
                city,
                countryCode,
                requestDatetime: new Date(),
              });
              setSearchHistory(updatedSearchHistory);
            }}
          />
          <div className={`App-details ${detailsClassName}`}>
            <QueryClientProvider client={weatherQueryClient}>
              <WeatherDetails city={city} countryCode={countryCode} />
            </QueryClientProvider>
            <SearchHistory
              searchHistory={searchHistory}
              onSelectItem={({ city, countryCode }) => {
                setCityCountryCode(`${city}, ${countryCode}`);
                const updatedSearchHistory = addSearchHistoryItem({
                  city,
                  countryCode,
                  requestDatetime: new Date(),
                });
                setSearchHistory(updatedSearchHistory);
              }}
              onDeleteItem={({ city, countryCode, requestDatetime }) => {
                const updatedSearchHistory = deleteSearchHistoryItem({
                  city,
                  countryCode,
                  requestDatetime,
                });
                setSearchHistory(updatedSearchHistory);
              }}
            />
          </div>
        </header>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
