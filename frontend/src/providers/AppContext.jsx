import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext({
  settings: {
    isDarkMode: true,
    displayMode: 'characters',
    bookmarks: {
      page: 1,
      total: 0,
    },
    characters: {
      page: 1,
      total: 826,
    },
  },
  toggleDarkMode: (_) => {},
  toggleDisplayMode: (_) => {},
  updateBookmarks: (_) => {},
  updateCharacters: (_) => {},
});

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    isDarkMode: true,
    displayMode: 'characters',
    bookmarks: {
      page: 1,
      total: 0,
    },
    characters: {
      page: 1,
      total: 826,
    },
  });

  const updateBookmarks = (bookmarkPayload) => {
    setSettings((prev) => ({
      ...prev,
      bookmarks: { ...prev.bookmarks, ...bookmarkPayload },
    }));
  };
  const toggleDarkMode = () => {
    setSettings((prev) => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const toggleDisplayMode = () => {
    setSettings((prev) => ({
      ...prev,
      displayMode:
        prev.displayMode === 'characters' ? 'bookmarks' : 'characters',
    }));
  };

  const updateCharacters = (charactersPayload) => {
    setSettings((prev) => ({
      ...prev,
      characters: { ...prev.characters, ...charactersPayload },
    }));
  };
  return (
    <AppContext.Provider
      value={{
        settings,
        toggleDarkMode,
        toggleDisplayMode,
        updateBookmarks,
        updateCharacters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
