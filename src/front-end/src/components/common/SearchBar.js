import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import '../../styles/main/header.css';
import '../../styles/main/global.css';
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
   const { setSearchQuery, searchQuery } = useAppContext();
   const [localSearchQuery, setLocalSearchQuery] = useState('');

   // search bar functionality
   const handleSearchChange = (event) => {
      setLocalSearchQuery(event.target.value);
   };

   const handleSearchSubmit = (event) => {
      event.preventDefault();
      setSearchQuery(searchQuery.trim());  // remove whitespace some dummy user will add
      setSearchQuery(localSearchQuery.trim());
   };


   return (
      <div className='search-bar'>
         <input type="text" className="searchText" placeholder="search" value={localSearchQuery} onChange={handleSearchChange} />
         <button className="searchButton" onClick={handleSearchSubmit}>
            <CiSearch className='searchIcon' />
         </button>
      </div>
   );
};

export default SearchBar;