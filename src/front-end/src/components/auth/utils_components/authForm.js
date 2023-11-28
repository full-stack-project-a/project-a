import React, { useState, useEffect } from "react";
import "../../../styles/auth/auth_form.css";
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
      <form action="" method="get" className="form-example" onSubmit={handleSubmit}>
         <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
               type="email"
               name="email"
               id="email"
               value={email}
               onChange={handleEmailChange}
               style={emailError ? errorInputStyle : null}
            />
            {emailError && <div className="error-message">{emailError}</div>}
         </div>
         {currPage !== 'updatePassword' && (
            <div className="password">
               <label htmlFor="password">Password</label>
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
                  id="show-hide-toggle"
                  style={passwordError ? errorShowButtonStyle : null}
               >
                  {showPassword ? "Hide" : "Show"}
               </button>
               {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
         )}
         <div className="form-group">
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
