import React, { useMemo, useState } from 'react';
import FlipMove from 'react-flip-move';
import { Character } from '../../components/Character/Character';
import {
  useBookmarkCharacterMutation,
  useBookmarksQuery,
  useCharactersQuery,
  useUnbookmarkCharacterMutation,
} from '../../api/generated';
import { useAppContext } from '../../providers/AppContext';
import { App as AntdApp, Spin } from 'antd';

export const Characters = () => {
  const { message } = AntdApp.useApp();

  const {
    settings: { characters },
    updateBookmarks,
  } = useAppContext();

  const { data: bookmarksData } = useBookmarksQuery({
    onCompleted: ({ bookmarks: { total } }) => {
      updateBookmarks({ total });
    },
  });

  const [bookmarkCharacter] = useBookmarkCharacterMutation({
    refetchQueries: ['bookmarks'],
    awaitRefetchQueries: true,
    onCompleted: ({
      bookmarkCharacter: {
        character: { name },
      },
    }) => {
      message.success(`${name.split(' ')[0]} is now favorited!`);
      const { total } = bookmarksData.bookmarks;
      updateBookmarks({ total });
    },
  });

  const [unbookmarkCharacter] = useUnbookmarkCharacterMutation({
    refetchQueries: ['bookmarks'],
    awaitRefetchQueries: true,
    onCompleted: ({
      unbookmarkCharacter: {
        character: { name },
      },
    }) => {
      message.info(`${name?.split(' ')[0]} is no longer a favorite of yours!`);
      const { total } = bookmarksData.bookmarks;
      updateBookmarks({ total });
    },
  });

  const [loading, setLoading] = useState(true);
  const { data: results } = useCharactersQuery({
    variables: {
      page: characters.page,
    },
    onCompleted: () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  const charactersWithBookmarks = useMemo(() => {
    return results?.characters.map((character) => {
      const isBookmarked = bookmarksData?.bookmarks.results.some(
        (bookmark) => bookmark.character.id === character.id,
      );
      return {
        ...character,
        isBookmarked,
      };
    });
  }, [results?.characters, bookmarksData]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <FlipMove className="list-sub-container">
      {charactersWithBookmarks
        ?.sort((a, b) => b.isBookmarked - a.isBookmarked)
        .map((character) => (
          <Character
            character={character}
            isBookmarked={character.isBookmarked}
            bookmarkCharacter={bookmarkCharacter}
            unbookmarkCharacter={unbookmarkCharacter}
            key={character.id}
          />
        ))}
    </FlipMove>
  );
};
