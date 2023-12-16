import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import '../../styles/main/header.css';
import '../../styles/main/global.css';
import CartModel from '../cart/CartModal'
import { FaCartArrowDown, FaStar } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Header = () => {

   const BACK_END_API = 'http://localhost:8000/api/v1';
   const TEST_USER_ID = '6577a7f2a4603ab4ef7cbd50';

   const { auth, setAuth } = useAppContext();
   const [showCartModal, setShowCartModal] = useState(false);
   const [cartData, setCartData] = useState(null);

   // const fetchCartData = async (userId) => {
      const fetchCartData = async () => {
         try {
             const response = await axios.get(`${BACK_END_API}/cart/${TEST_USER_ID}/load`);
             setCartData(response.data);
         } catch (error) {
             console.error('Error fetching cart data:', error);
         }
     };

   const toggleCartModal = () => {
      if (!showCartModal) {
         fetchCartData(); // Fetch cart data when opening the modal
      }
      setShowCartModal(!showCartModal);
   };

   const navigate = useNavigate();

   const handleProfileClick = () => {
      if (auth.isAuthenticated) {
         const confirmSignOut = window.confirm("Are you sure you want to sign out?");
         if (confirmSignOut) {
            setAuth({ isAuthenticated: false, user: null, token: null });
            localStorage.removeItem('auth');
            navigate("");
            // add other sign-out logic
         }
      } else {
         navigate('/signin');
      }
   };

   useEffect(() => {
      fetchCartData();
  }, []);

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
               <input type="text" className="searchText" placeholder="search" />
               <button type="submit" className="searchButton">
                  <CiSearch className='searchIcon' />
               </button>
            </div>

            <div className='profile-cart-container'>
               <div className='profile-container' onClick={handleProfileClick}>
                  <div className='profile-icons'>
                     <GoPerson className='profile-person-icon' />
                     <FaStar className='profile-star-icon' />
                  </div>
                  <p>{auth.isAuthenticated ? "Sign out" : "Sign in"}</p>
               </div>
               <div className='cart-container' onClick={toggleCartModal}>
                  <FaCartArrowDown className='cart-icon' />
                  <p>$0.00</p>
               </div>

            </div>

         </div>
         <CartModel show={showCartModal} close={toggleCartModal} cartData={cartData}>
         </CartModel>
      </header>
   );
};

export default Header;
