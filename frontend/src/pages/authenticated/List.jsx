import {
  useBookmarkCharacterMutation,
  useBookmarksQuery,
  useCharactersQuery,
  useUnbookmarkCharacterMutation,
} from '../../api/generated';
import './List.css';
import React, { createContext, useMemo, useState } from 'react';
import { Character } from '../../components/Character/Character';
import { App as AntdApp, Spin } from 'antd';
import FlipMove from 'react-flip-move';
import { HighlightedCharacterProvider } from './HighlightedCharacter';

export const List = () => {
  const [highlightedCharacter, setHighlightedCharacter] = useState(null);
  const { data: bookmarksData } = useBookmarksQuery();
  const { message } = AntdApp.useApp();
  const { data: results, loading } = useCharactersQuery();
  const [bookmarkCharacter] = useBookmarkCharacterMutation({
    refetchQueries: ['bookmarks'],
    onCompleted: ({
      bookmarkCharacter: {
        character: { name },
      },
    }) => {
      message.success(`${name.split(' ')[0]} is now favorited!`);
    },
  });
  const [unbookmarkCharacter] = useUnbookmarkCharacterMutation({
    refetchQueries: ['bookmarks'],
    onCompleted: ({
      unbookmarkCharacter: {
        character: { name },
      },
    }) => {
      message.info(`${name.split(' ')[0]} is no longer a favorite of yours!`);
    },
  });

  const charactersWithBookmarks = useMemo(() => {
    return results?.characters.map((character) => {
      const isBookmarked = bookmarksData?.bookmarks.some(
        (bookmark) => bookmark.character.id === character.id,
      );
      return {
        ...character,
        isBookmarked,
      };
    });
  }, [results?.characters, bookmarksData]);

  return (
    <HighlightedCharacterProvider>
      <div className="list-container">
        {loading ? (
          <Spin size="large" />
        ) : (
          <FlipMove className="list-sub-container">
            {charactersWithBookmarks
              ?.sort((a, b) => b.isBookmarked - a.isBookmarked)
              .map((character) => {
                return (
                  <Character
                    character={character}
                    isBookmarked={character.isBookmarked}
                    bookmarkCharacter={bookmarkCharacter}
                    unbookmarkCharacter={unbookmarkCharacter}
                    key={character.id}
                  />
                );
              })}
          </FlipMove>
        )}
      </div>
    </HighlightedCharacterProvider>
  );
};
