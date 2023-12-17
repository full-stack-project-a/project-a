import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppContext } from '../../context/AppContext';
import '../../styles/main/header.css';
import '../../styles/main/global.css';
import CartModel from '../cart/CartModal'
import { FaCartArrowDown, FaStar } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import {
   fetchCartItems,
   fetchTotalItemsNumber,
   fetchCartSubtotal,
   fetchCartTax,
   fetchCartTotal,
   fetchCartDiscount,
} from '../../redux/actions/cartActions';


const Header = () => {

   const { auth, setAuth } = useAppContext();
   const [showCartModal, setShowCartModal] = useState(false);
   const dispatch = useDispatch();

   // Access cart data from Redux state
   const { subtotal, cartItemsNumber } = useSelector(state => state.shoppingCart);

   useEffect(() => {
      // Dispatch actions to fetch initial cart data
      dispatch(fetchCartItems());
      dispatch(fetchCartSubtotal());
      dispatch(fetchCartTax());
      dispatch(fetchCartTotal());
      dispatch(fetchCartDiscount());
      dispatch(fetchTotalItemsNumber());
   }, [dispatch]);

   const toggleCartModal = () => {
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
                  <div className='cart-icon-number'>
                     <FaCartArrowDown className='cart-icon' />
                     {cartItemsNumber > 0 &&
                        <span className='cart-number'>{cartItemsNumber > 9 ? '9+' : cartItemsNumber}</span>
                     }
                  </div>

                  <p>${subtotal ? (subtotal > 999 ? '999+' : subtotal.toFixed(2)) : '0.00'}</p>
               </div>

            </div>

         </div>
         <CartModel show={showCartModal} close={toggleCartModal}>
         </CartModel>
      </header>
   );
};

export default Header;
