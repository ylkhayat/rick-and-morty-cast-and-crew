import React, { ReactNode, createContext, useContext, useState } from 'react';
import {
  BookmarksDocument,
  BookmarksQuery,
  Character,
  CharacterFragmentDoc,
  CharactersDocument,
  CharactersQuery,
  UserInput,
  useBookmarkCharacterMutation,
  useBookmarksQuery,
  useCharactersQuery,
  useLoginOrSignupMutation,
  useUnbookmarkCharacterMutation,
} from '../api/generated';
import { App as AntdApp } from 'antd';
import { useSliderContext } from '../pages/Slider/Slide';

type AppContextType = {
  loginOrSignup: (data: UserInput) => void;
  loadingLoginOrSignup: boolean;
  settings: {
    isDarkMode: boolean;
    displayMode: string;
    bookmarks: {
      page: number;
      total: number;
    };
    characters: {
      page: number;
      total: number;
    };
  };
  toggleDarkMode: () => void;
  toggleDisplayMode: () => void;
  bookmarkCharacter: (variables: { characterId: number }) => void;
  unbookmarkCharacter: (variables: { characterId: number }) => void;
  updateBookmarks: (paginationPayload?: PaginationPayload) => void;
  updateCharacters: (paginationPayload?: PaginationPayload) => void;
  reset: () => void;
};

const AppContext = createContext<AppContextType>({
  toggleDarkMode: () => {},
  loginOrSignup: () => {},
  loadingLoginOrSignup: false,
  updateBookmarks: () => {},
  updateCharacters: () => {},
  toggleDisplayMode: () => {},
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
  bookmarkCharacter: (_) => {},
  unbookmarkCharacter: (_) => {},
  reset: () => {},
});

type AppProviderProps = {
  children: ReactNode;
};

type PaginationPayload = {
  total?: number;
  page?: number;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { message } = AntdApp.useApp();
  const { navigate } = useSliderContext();

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

  const [loginOrSignupMutation, { loading }] = useLoginOrSignupMutation({
    onCompleted: ({ loginOrSignup: { sessionId, user } }) => {
      window.sessionStorage.setItem('sessionId', sessionId);
      window.sessionStorage.setItem('username', user.username);
      navigate('right', 'list');
    },
    onError: () => {
      message.error('Invalid credentials. Please try again.');
    },
  });

  const toggleDarkMode = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isDarkMode: !prevSettings.isDarkMode,
    }));
  };

  const { refetch: refetchCharacters } = useCharactersQuery({
    nextFetchPolicy: 'cache-only',
    variables: {
      page: settings.characters.page,
    },
    onCompleted: ({ characters: { total } }) => {
      updateCharacters({ total });
    },
  });

  useBookmarksQuery({
    nextFetchPolicy: 'cache-only',
    variables: {
      page: settings.bookmarks.page,
    },
    onCompleted: ({ bookmarks: { total } }) => {
      updateBookmarks({ total });
    },
  });

  const [bookmarkCharacterMutation] = useBookmarkCharacterMutation({
    onCompleted: ({
      bookmarkCharacter: {
        bookmarkedCharacter: {
          character: { name },
        },
      },
    }) => {
      message.success(`${name.split(' ')[0]} is now favorited!`);
    },
    update: (cache, { data }) => {
      const charactersResults = cache.readQuery<CharactersQuery>({
        query: CharactersDocument,
        variables: {
          page: settings.characters.page,
        },
      });

      if (charactersResults?.characters && data?.bookmarkCharacter) {
        const updatedCharacters = charactersResults.characters.results.map(
          (character) =>
            character.id ===
            data.bookmarkCharacter.bookmarkedCharacter.character.id
              ? {
                  ...character,
                  isBookmarked: true,
                }
              : character,
        );

        cache.writeQuery({
          query: CharactersDocument,
          data: {
            characters: {
              total: charactersResults.characters.total,
              results: updatedCharacters,
            },
          },
          variables: {
            page: settings.characters.page,
          },
          overwrite: true,
        });
      }
      updateBookmarks({ total: data?.bookmarkCharacter.total });
    },
  });

  const [unbookmarkCharacterMutation] = useUnbookmarkCharacterMutation({
    onCompleted: ({
      unbookmarkCharacter: {
        unbookmarkedCharacter: {
          character: { name },
        },
      },
    }) => {
      message.info(`${name?.split(' ')[0]} is no longer a favorite of yours!`);
    },
    update: (cache, { data }) => {
      const charactersResults = cache.readQuery<CharactersQuery>({
        query: CharactersDocument,
        variables: {
          page: settings.characters.page,
        },
      });
      if (charactersResults?.characters && data?.unbookmarkCharacter) {
        const updatedCharacters = charactersResults.characters.results.map(
          (character) =>
            character.id ===
            data.unbookmarkCharacter.unbookmarkedCharacter.character.id
              ? {
                  ...character,
                  isBookmarked: false,
                }
              : character,
        );
        cache.writeQuery({
          query: CharactersDocument,
          data: {
            characters: {
              total: charactersResults.characters.total,
              results: updatedCharacters,
            },
          },
          variables: {
            page: settings.characters.page,
          },
          overwrite: true,
        });
        updateBookmarks({ total: data.unbookmarkCharacter.total });
      }
    },
  });

  const unbookmarkCharacter = (variables: { characterId: number }) =>
    unbookmarkCharacterMutation({
      variables,
    });

  const bookmarkCharacter = (variables: { characterId: number }) =>
    bookmarkCharacterMutation({
      variables,
    });

  const loginOrSignup = (data: UserInput) =>
    loginOrSignupMutation({
      variables: { data },
    });

  const updateBookmarks = (paginationPayload?: PaginationPayload) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      bookmarks: { ...prevSettings.bookmarks, ...paginationPayload },
    }));
  };

  const toggleDisplayMode = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      displayMode:
        prevSettings.displayMode === 'characters' ? 'bookmarks' : 'characters',
    }));
  };

  const updateCharacters = (paginationPayload?: PaginationPayload) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      characters: { ...prevSettings.characters, ...paginationPayload },
    }));
  };

  const reset = () => {
    refetchCharacters();
    setSettings({
      isDarkMode: false,
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
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        loadingLoginOrSignup: loading,
        reset,
        loginOrSignup,
        toggleDarkMode,
        updateBookmarks,
        updateCharacters,
        bookmarkCharacter,
        toggleDisplayMode,
        unbookmarkCharacter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
