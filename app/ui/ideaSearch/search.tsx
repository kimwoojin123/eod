'use client'

import React, { useState } from 'react';

interface SearchComponentProps {
  onSearch: (searchOption: string, searchText: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [searchOption, setSearchOption] = useState('title');

  const handleSearch = () => {
    onSearch(searchOption, searchText);
  };

  return (
    <div>
      <select
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
        className='border mr-2'
      >
        <option value="title">제목</option>
        <option value="textContent">내용</option>
        <option value="username">작성자</option>
      </select>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='border mr-2'
      />
      <button className='border bg-white w-14'onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchComponent;