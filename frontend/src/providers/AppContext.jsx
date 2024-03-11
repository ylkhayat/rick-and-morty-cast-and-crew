import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext({
  isDarkMode: true,
  setIsDarkMode: (_) => {},
});

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return (
    <AppContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
