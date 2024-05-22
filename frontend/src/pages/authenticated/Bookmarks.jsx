import React, { useEffect, useState } from 'react';
import { Character } from '../../components/Character/Character';
import {
  useBookmarkCharacterMutation,
  useUnbookmarkCharacterMutation,
} from '../../api/generated';
import { useAppContext } from '../../providers/AppContext';
import { App as AntdApp, Spin } from 'antd';

export const Bookmarks = () => {
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(true);

  const {
    updateBookmarks,
    settings: {
      bookmarks: { page, total, results },
    },
  } = useAppContext();

  const [bookmarkCharacter] = useBookmarkCharacterMutation({
    refetchQueries: ['bookmarks'],
    onCompleted: ({
      bookmarkCharacter: {
        character: { name },
      },
    }) => {
      updateBookmarks();
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
      message.info(`${name?.split(' ')[0]} is no longer a favorite of yours!`);
      updateBookmarks();
    },
  });

    /**
   * If there are no bookmarks on the current page, and we are not on the first page, go back one page
   */
    useEffect(() => {
      if (results && results.length === 0 && page > 1 && total >= 20) {
        updateBookmarks({ page: page - 1 });
      }
    }, [page, updateBookmarks]);
    
  if (loading) {
    return <Spin size="large" />;
  }

  if (results && results.length === 0) {
    return (
      <p>
        No bookmarks yet! Go to the characters tab and start bookmarking your
        favorite characters!
      </p>
    );
  }
  return (
    <div className="list-sub-container">
      {results?.map((bookmark) => (
        <Character
          character={bookmark.character}
          isBookmarked
          bookmarkCharacter={bookmarkCharacter}
          unbookmarkCharacter={unbookmarkCharacter}
          key={bookmark.id}
        />
      ))}
    </div>
  );
};
