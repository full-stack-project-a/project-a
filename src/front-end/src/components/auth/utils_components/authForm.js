import React, { useState, useEffect } from "react";
import styles from "../../../styles/auth/auth_form.module.css";
import { validateEmail, validatePassword } from "../../../utils/auth/validation";

const AuthForm = ({ currPage }) => {
   // State to store email and password
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   // State to manage whether the password is shown or hidden
   const [showPassword, setShowPassword] = useState(false);

   // State to store validation error messages
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');

   // Toggle function to change the state
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   // Function to update email state
   const handleEmailChange = (event) => {
      setEmail(event.target.value);
   };

   // Function to update password state
   const handlePasswordChange = (event) => {
      setPassword(event.target.value);
   };

   // validation check
   useEffect(() => {
      (currPage !== "signin") && setEmailError(validateEmail(email));
   }, [email]);

   useEffect(() => {
      (currPage !== "signin") && setPasswordError(validatePassword(password));
   }, [password]);

   // Form submission handler
   const handleSubmit = (event) => {
      event.preventDefault();
      if (currPage === "Signup" && (emailError || passwordError)) {
         alert("Error in email or password, please try again!");
      } else {
         // handle success
      }
   };

   return (
      <form action="" method="get" className={`${styles.formExample} ${styles.authForm}`} onSubmit={handleSubmit}>
         <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
               type="email"
               name="email"
               id="email"
               value={email}
               onChange={handleEmailChange}
               style={emailError ? errorInputStyle : null}
            />
            {emailError && <div className={styles.errorMessage}>{emailError}</div>}
         </div>
         {currPage !== 'updatePassword' && (
            <div className={styles.password}>
               <label htmlFor="password" className={styles.label}>Password</label>
               <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  style={passwordError ? errorInputStyle : null}
               />
               <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.showHideToggle}
                  style={passwordError ? errorShowButtonStyle : null}
               >
                  {showPassword ? "Hide" : "Show"}
               </button>

               {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
            </div>
         )}
         <div className={styles.formGroup}>
            <input
               type="submit"
               value={currPage === 'signin' ? "Sign in" : currPage === 'signup' ? "Create account" : "Update Password"}
               id="submit"
            />
         </div>
      </form>
   );
};

// Inline styles for error input fields
const errorInputStyle = {
   borderColor: '#FC5A44',
};

const errorShowButtonStyle = {
   top: '45%',
};

export default AuthForm;
