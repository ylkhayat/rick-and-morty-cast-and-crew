import React, { useState } from 'react';
import { Character } from '../../components/Character/Character';
import {
  useBookmarkCharacterMutation,
  useCharactersQuery,
  useUnbookmarkCharacterMutation,
} from '../../api/generated';
import { useAppContext } from '../../providers/AppContext';
import { App as AntdApp, Spin } from 'antd';

export const Characters = () => {
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(true);

  const {
    settings: { characters },
    updateBookmarks,
  } = useAppContext();

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

  const [bookmarkCharacter] = useBookmarkCharacterMutation({
    refetchQueries: ['characters'],
    onCompleted: ({
      bookmarkCharacter: {
        character: { name },
      },
    }) => {
      message.success(`${name.split(' ')[0]} is now favorited!`);
      updateBookmarks();
    },
  });

  const [unbookmarkCharacter] = useUnbookmarkCharacterMutation({
    refetchQueries: ['characters'],
    onCompleted: ({
      unbookmarkCharacter: {
        character: { name },
      },
    }) => {
      message.info(`${name?.split(' ')[0]} is no longer a favorite of yours!`);
      updateBookmarks();
    },
  });

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="list-sub-container">
      {results?.characters.map((character) => (
        <Character
          character={character}
          bookmarkCharacter={bookmarkCharacter}
          unbookmarkCharacter={unbookmarkCharacter}
          key={character.id}
        />
      ))}
    </div>
  );
};
