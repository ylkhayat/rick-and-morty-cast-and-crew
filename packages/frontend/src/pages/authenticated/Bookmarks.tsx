import React, { useEffect } from 'react';
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

  const {
    data: bookmarksData,
    fetchMore,
    loading,
  } = useBookmarksQuery({
    fetchPolicy: 'cache-only',
    variables: {
      page,
    },
  });

  const results = bookmarksData?.bookmarks?.results || [];
  /**
   * If there are no bookmarks on the current page,
   * and we are not on the first page, go back one page
   */
  useEffect(() => {
    let newPage =
      results.length === 0 && page > 1 && total >= 20 ? page - 1 : page;
    if (newPage !== page) {
      updateBookmarks({ page: newPage });
      fetchMore({
        variables: {
          page: newPage,
        },
      });
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
