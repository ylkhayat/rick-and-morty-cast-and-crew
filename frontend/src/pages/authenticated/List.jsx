import {
  useBookmarkCharacterMutation,
  useBookmarksQuery,
  useCharactersQuery,
  useUnbookmarkCharacterMutation,
} from '../../api/generated';
import './List.css';
import React from 'react';
import { Character } from '../../components/Character/Character';
import { Spin } from 'antd';
import FlipMove from 'react-flip-move';

export const List = () => {
  const { data: bookmarksData } = useBookmarksQuery();

  const { data: results, loading } = useCharactersQuery();
  const [bookmarkCharacter] = useBookmarkCharacterMutation({
    refetchQueries: ['bookmarks'],
  });
  const [unbookmarkCharacter] = useUnbookmarkCharacterMutation({
    refetchQueries: ['bookmarks'],
  });

  const charactersWithBookmarks = results?.characters
    .map((character) => {
      const isBookmarked = bookmarksData?.bookmarks.some(
        (bookmark) => bookmark.character.id === character.id,
      );
      return {
        ...character,
        isBookmarked,
      };
    })
    .sort((a, b) => b.isBookmarked - a.isBookmarked);

  return (
    <div className="list-container">
      {loading ? (
        <Spin size="large" />
      ) : (
        <FlipMove className="list-sub-container">
          {charactersWithBookmarks.map((character) => (
            <Character
              key={character.id}
              character={character}
              isBookmarked={character.isBookmarked}
              bookmarkCharacter={bookmarkCharacter}
              unbookmarkCharacter={unbookmarkCharacter}
            />
          ))}
        </FlipMove>
      )}
    </div>
  );
};
