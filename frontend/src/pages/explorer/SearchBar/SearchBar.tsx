//Explorer/SearchBar/SearchBar.tsx
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin: 16px 0;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  &::placeholder {
    color: #666;
  }
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

interface SearchBarProps {
  onSearch: (searchValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search competitions, teams or matches..."
      />
      <SearchButton type="submit">
        Search
      </SearchButton>
    </SearchForm>
  );
};

export default SearchBar;