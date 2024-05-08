import { SearchHistoryItem } from '../SearchHistory';

export const addSearchHistoryItem = ({
  city,
  countryCode,
  requestDatetime,
}: SearchHistoryItem) => {
  const updatedSearchHistory: SearchHistoryItem[] = JSON.parse(
    localStorage.getItem('searchHistory') ?? '[]',
  );
  updatedSearchHistory.push({
    city,
    countryCode,
    requestDatetime,
  });
  localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
  return updatedSearchHistory;
};

export const deleteSearchHistoryItem = ({
  city,
  countryCode,
  requestDatetime,
}: SearchHistoryItem) => {
  const searchHistory: SearchHistoryItem[] = JSON.parse(
    localStorage.getItem('searchHistory') ?? '[]',
  );
  const updatedSearchHistory = searchHistory.filter(
    (searchHistoryItem) =>
      city !== searchHistoryItem.city ||
      countryCode !== searchHistoryItem.countryCode ||
      requestDatetime !== searchHistoryItem.requestDatetime,
  );
  localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
  return updatedSearchHistory;
};
