import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
   // authentication 
   const [auth, setAuth] = useState(() => {
      // check if auth data exists in local storage first
      const storedAuth = localStorage.getItem('auth');
      return storedAuth ? JSON.parse(storedAuth) : { isAuthenticated: false, user: null, token: null };
   });

   const [isLoading, setIsLoading] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');

   useEffect(() => {
      console.log("Context values changed", { auth, isLoading, searchQuery });
   }, [auth, isLoading, searchQuery]);


   // add more states and functions as needed

   const contextValue = useMemo(() => ({
      auth,
      setAuth,
      isLoading,
      setIsLoading,
      searchQuery,
      setSearchQuery
   }), [auth, isLoading, searchQuery]);

   return (
      <AppContext.Provider value={contextValue}>
         {children}
      </AppContext.Provider>
   );
};

export const useAppContext = () => useContext(AppContext);
