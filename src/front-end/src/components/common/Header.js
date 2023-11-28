import React, { useState } from 'react';
import '../../styles/main/header.css';
import '../../styles/main/global.css';
import CartModel from '../cart/CartModal'
import { FaCartArrowDown, FaStar } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";


const Header = () => {

   const [showCartModal, setShowCartModal] = useState(false);

   const toggleCartModal = () => {
      setShowCartModal(!showCartModal);
   };

   return (
      <header className="header">
         <div className='header-container'>
            <div className='logo-container'>
               <div className='logo-container-spans'>
                  <span className='logo-management'>M</span>
                  <span className='logo-management-rest'>anagement</span>
                  <span className='logo-chuwa'>chuwa</span>
               </div>

            </div>
            <div className='search-bar'>
               <input type="text" class="searchText" placeholder="search" />
               <button type="submit" class="searchButton">
                  <CiSearch className='searchIcon' />
               </button>
            </div>

            <div className='profile-cart-container'>
               <div className='profile-container'>
                  <div className='profile-icons'>
                     <GoPerson className='profile-person-icon' />
                     <FaStar className='profile-star-icon' />
                  </div>

                  <p>Sign in</p>
               </div>
               <div className='cart-container' onClick={toggleCartModal}>
                  <FaCartArrowDown className='cart-icon' />
                  <p>$0.00</p>
               </div>

            </div>

         </div>

         <CartModel show={showCartModal} close={toggleCartModal}>
         </CartModel>
      </header>
   );
};

export default Header;
