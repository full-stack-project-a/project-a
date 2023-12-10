import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
   const [auth, setAuth] = useState(() => {
      // check if auth data exists in local storage first
      const storedAuth = localStorage.getItem('auth');
      return storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false, user: null, token: null };
   });

   // add more states and functions as needed

   return (
      <AppContext.Provider value={{ auth, setAuth }}>
         {children}
      </AppContext.Provider>
   );
};

export const useAppContext = () => useContext(AppContext);
