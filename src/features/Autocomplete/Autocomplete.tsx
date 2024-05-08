import React, { useContext } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './Autocomplete.css';
import { ThemeContext } from '../Themes/ThemeContext';
import { Themes } from '../Themes/Themes';

export type AutocompleteItem = {
  id: number;
  name: string;
};

export interface AutocompleteProps {
  items: AutocompleteItem[];
  onSelectItem: (item: AutocompleteItem) => void;
  placeholder?: string;
}

export const Autocomplete = ({
  items,
  onSelectItem,
  placeholder,
}: AutocompleteProps) => {
  const theme = useContext(ThemeContext);

  const formatResult = (item: AutocompleteItem) => {
    return (
      <>
        <span
          style={{
            display: 'block',
            textAlign: 'left',
            color: theme === Themes.Light ? 'black' : 'white',
          }}
        >
          {item.name}
        </span>
      </>
    );
  };

  return (
    <div className="Autocomplete">
      <ReactSearchAutocomplete
        items={items}
        onSelect={onSelectItem}
        autoFocus
        formatResult={formatResult}
        placeholder={placeholder}
        styling={{
          color: theme === Themes.Light ? 'black' : 'white',
          hoverBackgroundColor: theme === Themes.Light ? 'white' : 'black',
          backgroundColor: theme === Themes.Light ? '#b49cec' : '#4c347c',
        }}
      />
    </div>
  );
};
