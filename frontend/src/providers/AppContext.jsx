import React, { createContext, useContext, useState } from 'react';
import { useBookmarksQuery } from '../api/generated';

const AppContext = createContext({
  settings: {
    displayMode: 'characters',
    bookmarks: {
      page: 1,
      results: [],
      total: 0,
    },
    characters: {
      page: 1,
      total: 826,
    },
  },
  toggleDisplayMode: (_) => {},
  updateBookmarks: (_) => {},
  updateCharacters: (_) => {},
  reset: () => {},
});

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    displayMode: 'characters',
    bookmarks: {
      page: 1,
    },
    characters: {
      page: 1,
      total: 826,
    },
  });

  const { data: bookmarksData, refetch } = useBookmarksQuery({
    onCompleted: ({ bookmarks: { results, total } }) => {
      updateBookmarks({ total, results });
    },
    variables: {
      page: settings.bookmarks.page,
    },
  });

  const updateBookmarks = (bookmarkPayload) => {
    refetch();
    setSettings((prev) => ({
      ...prev,
      bookmarks: { ...prev.bookmarks, ...bookmarkPayload },
    }));
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

  const reset = () => {
    refetch();
    setSettings({
      displayMode: 'characters',
      bookmarks: {
        page: 1,
      },
      characters: {
        page: 1,
        total: 826,
      },
    });
  };

  const isAuthenticated = window.sessionStorage.getItem('sessionId');

  return (
    <AppContext.Provider
      value={{
        settings: {
          ...settings,
          bookmarks: {
            ...settings.bookmarks,
            results: !isAuthenticated
              ? []
              : bookmarksData?.bookmarks.results ?? [],
            total: !isAuthenticated ? 0 : bookmarksData?.bookmarks.total ?? 0,
          },
        },
        toggleDisplayMode,
        updateBookmarks,
        updateCharacters,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
