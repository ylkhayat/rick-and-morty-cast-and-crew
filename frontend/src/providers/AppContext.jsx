import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext({
  isDarkMode: true,
  setIsDarkMode: (newIsDarkMode) => {},
});

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <AppContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
