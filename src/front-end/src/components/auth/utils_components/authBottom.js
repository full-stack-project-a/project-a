import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../../styles/auth/auth_bottom.css";

const AuthBottom = ({ currPage }) => {
   const navigate = useNavigate();

   const navigateAndReplace = (path) => {
      navigate(path, { replace: true });
   };

   return (
      <div className="bottom-group">
         {currPage === 'signin' && (
            <>
               <p id="top">
                  Don't have an account?{" "}
                  <span className="link" onClick={() => navigateAndReplace('/signup')}>Sign up</span>
               </p>
               <p>
                  <span className="link" onClick={() => navigateAndReplace('/updatePassword')}>Forget password?</span>
               </p>
            </>
         )}

         {currPage === 'signup' && (
            <p>
               Already have an account?{" "}
               <span className="link" onClick={() => navigateAndReplace('/signin')}>Sign in</span>
            </p>
         )}

         {/* No content for update password page */}
      </div>
   );
};

export default AuthBottom;
