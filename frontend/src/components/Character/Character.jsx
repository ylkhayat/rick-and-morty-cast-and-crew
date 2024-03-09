import React, { forwardRef, useState } from 'react';

import { theme } from 'antd';
import {
  SkinOutlined,
  PushpinOutlined,
  ManOutlined,
  WomanOutlined,
  EnvironmentOutlined,
  QuestionOutlined,
} from '@ant-design/icons';

import './Character.css';
import { AnimatePresence, motion } from 'framer-motion';

export const Character = ({
  character,
  isBookmarked,
  bookmarkCharacter,
  unbookmarkCharacter,
}) => {
  const {
    token: {
      colorBorder,
      borderRadius,
      green7,
      red7,
      colorBgContainer,
      orange7,
    },
  } = theme.useToken();
  return (
    <div
      className="character-container"
      style={{
        borderColor: colorBorder,
        borderRadius,
      }}
    >
      <div className="character-image-container">
        <div className="character-image-container">
          <img className="character-image" src={character.image} />
          <p
            className="character-status-floating"
            style={{
              borderColor:
                character.status === 'Alive'
                  ? green7
                  : character.status === 'Dead'
                    ? red7
                    : orange7,
              color:
                character.status === 'Alive'
                  ? green7
                  : character.status === 'Dead'
                    ? red7
                    : orange7,
            }}
          >
            {character.status}
          </p>
        </div>

        <div
          className="character-gender"
          style={{
            backgroundColor: colorBgContainer,
            borderColor: colorBorder,
          }}
        >
          {character.gender === 'Male' ? (
            <ManOutlined />
          ) : character.gender === 'Female' ? (
            <WomanOutlined />
          ) : (
            <QuestionOutlined />
          )}
        </div>
      </div>
      <div className="character-info-container">
        <div className="character-name-container">
          <p className="character-name">
            {character.id}. {character.name}
          </p>
          <div className="character-bookmark-container">
            <AnimatePresence>
              {isBookmarked && (
                <motion.img
                  src="/assets/star-fill.svg"
                  className="character-bookmark-fill"
                  onClick={() => {
                    console.log(character.id);
                    unbookmarkCharacter({
                      variables: { characterId: character.id },
                    });
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
            <img
              src="/assets/star-outline.svg"
              className="character-bookmark"
              onClick={() => {
                console.log(character.id);

                bookmarkCharacter({
                  variables: { characterId: character.id },
                });
              }}
            />
          </div>
        </div>
        <div className="character-rest-info-container">
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
        </div>
      </div>
    </div>
  );
};
