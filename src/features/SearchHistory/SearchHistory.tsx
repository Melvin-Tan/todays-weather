import { format } from 'date-fns';
import React, { useContext, useMemo } from 'react';
import { Button } from '../Button/Button';
import './SearchHistory.css';
import { ThemeContext } from '../Themes/ThemeContext';
import { Themes } from '../Themes/Themes';

export type SearchHistoryItem = {
  city: string;
  countryCode: string;
  requestDatetime: Date;
};

export interface SearchHistoryProps {
  searchHistory: SearchHistoryItem[];
  onSelectItem: (item: SearchHistoryItem) => void;
  onDeleteItem: (item: SearchHistoryItem) => void;
}

export const SearchHistory = ({
  searchHistory,
  onSelectItem,
  onDeleteItem,
}: SearchHistoryProps) => {
  const theme = useContext(ThemeContext);
  const searchHistoryCopy = useMemo(
    () => searchHistory.slice().reverse(),
    [searchHistory],
  );

  if (searchHistoryCopy.length === 0) {
    return <></>;
  }

  const searchHistoryThemeClassname = `SearchHistory-${Themes[theme]}`;
  const searchHistoryItemThemeClassname = `SearchHistoryItem-${Themes[theme]}`;

  return (
    <div className={`SearchHistory ${searchHistoryThemeClassname}`}>
      <div className="SearchHistory-header">Search History</div>
      <div className="SearchHistory-body">
        {searchHistoryCopy.map(
          ({ city, countryCode, requestDatetime }, key) => {
            const formattedRequestDatetime = format(
              requestDatetime,
              'dd-MM-yyyy hh:mmaaa',
            );
            return (
              <div
                className={`SearchHistoryItem ${searchHistoryItemThemeClassname}`}
                key={key}
              >
                <div className="SearchHistoryItem-text">
                  <div className="SearchHistoryItem-city-country-code">
                    {city}, {countryCode}
                  </div>
                  <div className="SearchHistoryItem-request-datetime">
                    {formattedRequestDatetime}
                  </div>
                </div>
                <div className="SearchHistoryItem-divider" />
                <div className="SearchHistoryItem-buttons">
                  <Button
                    onClick={() =>
                      onSelectItem({ city, countryCode, requestDatetime })
                    }
                  >
                    🔍
                  </Button>
                  <Button
                    onClick={() =>
                      onDeleteItem({ city, countryCode, requestDatetime })
                    }
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};
