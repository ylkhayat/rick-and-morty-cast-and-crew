import React, { useMemo, useState } from 'react';
import FlipMove from 'react-flip-move';
import { Character } from '../../components/Character/Character';
import {
  useBookmarkCharacterMutation,
  useBookmarksQuery,
  useUnbookmarkCharacterMutation,
} from '../../api/generated';
import { useAppContext } from '../../providers/AppContext';
import { App as AntdApp, Spin } from 'antd';

export const Bookmarks = () => {
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(true);

  const {
    settings: { bookmarks },
    updateBookmarks,
  } = useAppContext();

  const { data: bookmarksData } = useBookmarksQuery({
    fetchPolicy: 'cache-first',
    onCompleted: ({ bookmarks: { total } }) => {
      updateBookmarks({ total });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
    variables: {
      page: bookmarks.page,
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
      message.info(`${name?.split(' ')[0]} is no longer a favorite of yours!`);
    },
  });

  if (loading) {
    return <Spin size="large" />;
  }

  if (bookmarksData?.bookmarks.results.length === 0) {
    return (
      <p>
        No bookmarks yet! Go to the characters tab and start bookmarking your
        favorite characters!
      </p>
    );
  }
  return (
    <div className="list-sub-container">
      {bookmarksData?.bookmarks.results.map((bookmark) => (
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
