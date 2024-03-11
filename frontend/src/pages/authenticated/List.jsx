import './List.css';
import React from 'react';
import { Pagination } from 'antd';
import { HighlightedCharacterProvider } from '../../providers/HighlightedCharacterContext';
import { useAppContext } from '../../providers/AppContext';
import { Characters } from './Characters';
import { Bookmarks } from './Bookmarks';

export const List = () => {
  const { settings, updateBookmarks, updateCharacters } = useAppContext();
  const { bookmarks, characters, displayMode } = settings;
  const currentMode = displayMode === 'characters' ? characters : bookmarks;
  const currentModeUpdater =
    displayMode === 'characters' ? updateCharacters : updateBookmarks;

  return (
    <HighlightedCharacterProvider>
      <div className="list-pagination-container">
        <div className="list-container">
          {displayMode === 'characters' ? <Characters /> : <Bookmarks />}
        </div>
        <Pagination
          current={currentMode.page}
          pageSize={20}
          total={currentMode.total}
          onChange={(newPage) => currentModeUpdater({ page: newPage })}
        />
      </div>
    </HighlightedCharacterProvider>
  );
};
