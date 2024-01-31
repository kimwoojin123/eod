'use client'

import React, { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
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
        className='border'
      >
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="username">작성자</option>
      </select>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='border'
      />
      <button className='border'onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchComponent;