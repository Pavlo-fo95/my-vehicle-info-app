import React from 'react';
import { DebounceInput } from 'react-debounce-input';

interface CustomSearchInputProps {
  onSearch: (term: string) => void;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({ onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <DebounceInput
      minLength={2}
      debounceTimeout={300}
      onChange={handleChange}
      className="search-input"
      placeholder="Поиск..."
    />
  );
};

export default CustomSearchInput;