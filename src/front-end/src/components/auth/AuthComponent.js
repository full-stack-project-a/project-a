import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthHeading from "./utils_components/authHeading";
import AuthForm from "./utils_components/authForm";
import AuthBottom from "./utils_components/authBottom";
import AuthEmailSent from "./utils_components/authEmailSent";
import styles from "../../styles/auth/auth.module.css";
import { AiOutlineClose } from 'react-icons/ai';

const AuthComponent = ({ children, currPage = "signin" }) => {
   const [isEmailSent, setIsEmailSent] = useState(false);
   const [isVendor, setIsVendor] = useState(false);
   const navigate = useNavigate();

   const onClose = () => {
      navigate(-1); // Navigate back to the previous page
   };

   // Function to handle sending email
   const handleEmailSent = () => {
      setIsEmailSent(true);
   };

   const handleCheckboxChange = () => {
      setIsVendor(!isVendor);
   };

   return (
      <div className={styles.modal}>
         <div className={styles.modalContent}>
            <span className={styles.close} onClick={onClose}>
               <AiOutlineClose />
            </span>
            {children}
            {!isEmailSent && (
               <>
                  <AuthHeading currPage={currPage} />
                  <AuthForm currPage={currPage} onEmailSent={handleEmailSent} isVendor={isVendor} />
                  <AuthBottom currPage={currPage} isVendor={isVendor} handleCheckboxChange={handleCheckboxChange} />
               </>
            )}
            {isEmailSent && <AuthEmailSent />}
         </div>
      </div>
   );
};

export default AuthComponent;
