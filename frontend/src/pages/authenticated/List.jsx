import {
  useBookmarkCharacterMutation,
  useBookmarksQuery,
  useCharactersQuery,
  useUnbookmarkCharacterMutation,
} from '../../api/generated';
import './List.css';
import React, { useMemo, useState } from 'react';
import { Character } from '../../components/Character/Character';
import { Pagination, App as AntdApp, Spin } from 'antd';
import FlipMove from 'react-flip-move';
import { HighlightedCharacterProvider } from '../../providers/HighlightedCharacterContext';

export const List = () => {
  const { data: bookmarksData } = useBookmarksQuery();
  const { message } = AntdApp.useApp();
  const [page, setPage] = useState(1);

  const { data: results } = useCharactersQuery({
    variables: {
      page,
    },
    onCompleted: () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });
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

  const [loading, setLoading] = useState(true);

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
      <div className="list-pagination-container">
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
        <Pagination
          defaultCurrent={1}
          pageSize={20}
          total={826}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </HighlightedCharacterProvider>
  );
};
