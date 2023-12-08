import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../../styles/auth/auth_bottom.module.css";

const AuthBottom = ({ currPage }) => {
   const navigate = useNavigate();
   const [isVendor, setIsVendor] = useState(false);

   const navigateAndReplace = (path) => {
      navigate(path, { replace: true });
   };

   const handleCheckboxChange = () => {
      setIsVendor(!isVendor);
   };

   return (
      <div className={styles.bottomGroup}>
         {currPage === 'signin' && (
            <>
               <p className={`${styles.bottomGroupText} ${styles.top}`}>
                  Don't have an account?{" "}
                  <span className={styles.link} onClick={() => navigateAndReplace('/signup')}>Sign up</span>
               </p>
               <p className={styles.bottomGroupText}>
                  <span className={styles.link} onClick={() => navigateAndReplace('/updatePassword')}>Forget password?</span>
               </p>
            </>
         )}

         {currPage === 'signup' && (
            <>
               <p className={styles.bottomGroupText}>
                  Already have an account?{" "}
                  <span className={styles.link} onClick={() => navigateAndReplace('/signin')}>Sign in</span>
               </p>
               <div className={styles.vendorBox}>
                  <input
                     type="checkbox"
                     checked={isVendor}
                     onChange={handleCheckboxChange}
                  />
                  <label>vendor?</label>
               </div>
            </>
         )}

         {/* No content for update password page */}
      </div>
   );
};

export default AuthBottom;
