import React from 'react';
import '../../styles/auth/auth.css'; // Ensure to create this CSS file

const AuthComponent = ({ children, onClose }) => {
   return (
      <div className="modal">
         <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            {children}
            <h1>Sign in to your account</h1>
            <form action="" method="get" className="form-example">
               <div className="form-group">
                  <label htmlFor="email">Email: </label>
                  <input type="email" name="email" id="email" required />
               </div>
               <div className="form-group">
                  <label htmlFor="password">Password: </label>
                  <input type="password" name="password" id="password" required />
               </div>
               <div className="button-group">
                  <input type="submit" value="Sign in" />
               </div>
            </form>
         </div>
      </div>
   );
};

export default AuthComponent;
