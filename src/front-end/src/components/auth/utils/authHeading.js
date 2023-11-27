import React from 'react';
import "../../../styles/auth/auth_heading.css";

const AuthHeading = ({ currPage }) => {
   let headingText = '';
   let subHeadingText = null;

   switch (currPage) {
      case 'signin':
         headingText = 'Sign in to your account';
         break;
      case 'signup':
         headingText = 'Sign up an account';
         break;
      case 'updatePassword':
         headingText = 'Update your password';
         subHeadingText = 'Enter your email link, we will send you the recovery link';
         break;
      default:
         headingText = 'Authentication Page';
   }

   return (
      <div className='heading-div'>
         <p id="header">{headingText}</p>
         {subHeadingText && <p id="lower-header">{subHeadingText}</p>}
      </div>
   );
};

export default AuthHeading;
