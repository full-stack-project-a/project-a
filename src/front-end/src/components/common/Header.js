import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/main/header.css';
import '../../styles/main/global.css';
import CartModel from '../cart/CartModal'
import { FaCartArrowDown, FaStar } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import {
   fetchCartItems,
   fetchTotalItemsNumber,
   fetchCartSubtotal,
   fetchCartTax,
   fetchCartTotal,
   fetchCartDiscount,
   resetCart
} from '../../redux/actions/cartActions';

import SearchBar from './SearchBar';

const Header = () => {

   const { auth, setAuth } = useAppContext();
   const [showCartModal, setShowCartModal] = useState(false);
   const dispatch = useDispatch();


   // Access cart data from Redux state
   const { subtotal, cartItemsNumber } = useSelector(state => state.shoppingCart);

   useEffect(() => {
      // Only dispatch actions if the user is authenticated and userId is available
      if (auth.isAuthenticated && auth.user && auth.user.userId) {
         dispatch(fetchCartItems(auth.user.userId, auth.token));
         dispatch(fetchCartSubtotal(auth.user.userId, auth.token));
         dispatch(fetchCartTax(auth.user.userId, auth.token));
         dispatch(fetchCartTotal(auth.user.userId, auth.token));
         dispatch(fetchCartDiscount(auth.user.userId, auth.token));
         dispatch(fetchTotalItemsNumber(auth.user.userId, auth.token));
      }
   }, [dispatch, auth.isAuthenticated, auth.user, auth.token]);


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
            dispatch(resetCart());
            navigate("/products");
            // add other sign-out logic
         }
      } else {
         navigate('/signin');
      }
   };

   const handleLogoClick = () => {
      navigate("/products");
   }

   return (
      <header className="header">
         <div className='header-container'>
            <div className='logo-container'>
               <button onClick={handleLogoClick} className="logo-container-button">
                  <div className='logo-container-spans'>
                     <span className='logo-management'>M</span>
                     <span className='logo-management-rest'>anagement</span>
                     <span className='logo-chuwa'>chuwa</span>
                  </div>
               </button>

            </div>

            <SearchBar />

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
