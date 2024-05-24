import React, { useEffect, useState } from 'react';
import { Character } from '../../components/Character/Character';
import {
  Character as CharacterType,
  useCharactersQuery,
} from '../../api/generated';
import { useAppContext } from '../../providers/AppContext';
import { Spin } from 'antd';

export const Characters = () => {
  const [loading, setLoading] = useState(true);
  const {
    settings: { characters },
  } = useAppContext();
  const { data: results, fetchMore } = useCharactersQuery({
    fetchPolicy: 'cache-only',
    variables: {
      page: characters.page,
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
        page: characters.page,
      },
    });
  }, [characters.page, fetchMore]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="list-sub-container">
      {results?.characters.results.map((character) => (
        <Character key={character.id} character={character as CharacterType} />
      ))}
    </div>
  );
};
