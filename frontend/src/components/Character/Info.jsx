import React from 'react';

import { theme } from 'antd';
import {
  SkinOutlined,
  PushpinOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

import './Character.css';

export const Info = ({ character }) => {
  const {
    token: { green7, red7, orange7 },
  } = theme.useToken();
  return (
    <>
      <p>
        <EnvironmentOutlined /> {character.origin}
      </p>
      <p>
        <PushpinOutlined /> {character.dimension}
      </p>
      <p>
        <SkinOutlined /> {character.species}
      </p>
      <p
        className="character-status"
        style={{
          borderColor:
            character.status === 'Alive'
              ? green7
              : character.status === 'Dead'
                ? red7
                : orange7,
        }}
      >
        {character.status}
      </p>
    </>
  );
};
