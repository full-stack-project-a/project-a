import React from 'react';
import style from "../../../styles/auth/auth_heading.module.css";

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
      <div className={style.headingDiv}>
         <p className={style.header}>{headingText}</p>
         {subHeadingText && <p className={style.lowerHeader}>{subHeadingText}</p>}
      </div>
   );
};

export default AuthHeading;
