import React from 'react';
import '../../styles/main/header.css';
import '../../styles/main/global.css';
import { FaCartArrowDown, FaStar } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


const Header = () => {
   const navigate = useNavigate();

   const handleSignInClick = () => {
      navigate('/signin');
   };

   return (
      <header className="header">
         <div className='logo-search-container'>
            <p className='logo-container'><span className='logo-management'>Management</span>
               chuwa
            </p>
            <div className='search-bar'>
               <input type="text" class="searchText" placeholder="search" />
               <button type="submit" class="searchButton">
                  <CiSearch className='searchIcon'/>
               </button>
            </div>
         </div>

         <div className='profile-cart-container'>
            <div className='profile-container' onClick={handleSignInClick}> 
               <div className='profile-icons'>
                  <GoPerson className='profile-person-icon'/>
                  <FaStar className='profile-star-icon'/>
               </div>
               
               <p>Sign in</p>
            </div>
            <div className='cart-container'>
               <FaCartArrowDown className='cart-icon'/>
               <p>$0.00</p>
            </div>
         </div>
         
         
      </header>
   );
};

export default Header;
