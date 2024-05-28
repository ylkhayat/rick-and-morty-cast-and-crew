import React, { useEffect, useState } from 'react';
import { Character } from '../../components/Character/Character';
import {
  Character as CharacterType,
  useBookmarksQuery,
} from '../../api/generated';
import { useAppContext } from '../../providers/AppContext';
import { Spin } from 'antd';

export const Bookmarks = () => {
  const {
    updateBookmarks,
    settings: {
      bookmarks: { page, total },
    },
  } = useAppContext();
  const [loading, setLoading] = useState(true);
  const { data: bookmarksData, fetchMore } = useBookmarksQuery({
    fetchPolicy: 'cache-only',
    variables: {
      page,
    },
    onCompleted: () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
  });

  useEffect(() => {
    fetchMore({
      variables: {
        page,
      },
    });
  }, [page, fetchMore]);

  const results = bookmarksData?.bookmarks?.results || [];
  /**
   * If there are no bookmarks on the current page,
   * and we are not on the first page, go back one page
   */
  useEffect(() => {
    if (results.length === 0 && page > 1 && total >= 20) {
      updateBookmarks({ page: page - 1 });
    }
  }, [page, updateBookmarks, results]);

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
          character={bookmark.character as CharacterType}
          key={bookmark.id}
        />
      ))}
    </div>
  );
};
