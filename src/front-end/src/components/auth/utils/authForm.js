import React, { useState } from "react";
import "../../../styles/auth/auth_form.css"; 

const AuthForm = ({ currPage }) => {
   // State to manage whether the password is shown or hidden
   const [showPassword, setShowPassword] = useState(false);

   // Toggle function to change the state
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <form action="" method="get" className="form-example">
         <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
         </div>
         {currPage !== 'updatePassword' && (
            <div className="password">
               <label htmlFor="password">Password</label>
               <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
               />
               <button type="button" onClick={togglePasswordVisibility} id="show-hide-toggle">
                  {showPassword ? "Hide" : "Show"}
               </button>
            </div>
         )}
         <div className="form-group">
            <input type="submit" value={currPage === 'signin' ? "Sign in" : currPage === 'signup' ? "Sign up" : "Update Password"} id="submit" />
         </div>
      </form>
   );
};

export default AuthForm;
