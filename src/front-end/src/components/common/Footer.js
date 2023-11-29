import React from 'react';
import '../../styles/main/footer.css';
import '../../styles/main/global.css';
import { FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";


const Footer = () => {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="footer">
         <div className='copyright'>
            <p>&copy; {currentYear} All Rights Reserved.</p>
         </div>
         <div className='icon-list'>
            <a href='www.youtube.com'><FaYoutube /></a>
            <a href='www.twitter.com'><FaTwitter /></a>
            <a href='www.facebook.com'><FaFacebook /></a>
         </div>
         <div className='footer-links'>
            <a href='www.google.com'>Contact me</a>
            <a href='www.google.com'>Privacy Policies</a>
            <a href='www.google.com'>Help</a>
         </div>
         
      </footer>
   );
};

export default Footer;
