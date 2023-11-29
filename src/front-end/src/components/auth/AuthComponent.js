import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthHeading from "./utils_components/authHeading";
import AuthForm from "./utils_components/authForm";
import AuthBottom from "./utils_components/authBottom";
import "../../styles/auth/auth.css";

const AuthComponent = ({ children, currPage = "signin" }) => {
   const navigate = useNavigate();

   const onClose = () => {
      navigate(-1); // Navigate back to the previous page
   };

   return (
      <div className="modal">
         <div className="modal-content">
            <span className="close" onClick={onClose}>
               &times;
            </span>
            {children}
            <AuthHeading currPage={currPage} />
            <AuthForm currPage={currPage} />
            <AuthBottom currPage={currPage} />
         </div>
      </div>
   );
};

export default AuthComponent;
