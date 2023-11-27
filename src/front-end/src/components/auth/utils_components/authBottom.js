import React from 'react';
import "../../../styles/auth/auth_bottom.css";

const AuthBottom = ({ currPage }) => {
   return (
      <div className="bottom-group">
         {currPage === 'signin' && (
            <>
               <p id="top">
                  Don't have an account?{" "}
                  <a href="/signup" className="link">Sign up</a>
               </p>
               <p>
                  <a href="/forgot-password" className="link">Forget password?</a>
               </p>
            </>
         )}

         {currPage === 'signup' && (
            <p>
               Already have an account?{" "}
               <a href="/signin" className="link">Sign in</a>
            </p>
         )}

         {/* No content for update password page */}
      </div>
   );
};

export default AuthBottom;
