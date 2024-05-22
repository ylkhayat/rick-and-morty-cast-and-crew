import React, { forwardRef } from 'react';

import { theme, Typography } from 'antd';
import {
  ManOutlined,
  WomanOutlined,
  QuestionOutlined,
} from '@ant-design/icons';

import './Character.css';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Slide,
  SliderProvider,
  useSliderContext,
} from '../../pages/Slider/Slide';
import { useHighlightedCharacterContext } from '../../providers/HighlightedCharacterContext';
import { Episodes } from './Episodes';
import { Info } from './Info';
import { StarFilled } from './StarFilled';
import { StarOutlined } from './StarOutlined';

const { Paragraph } = Typography;

const CharacterInternal = ({
  character,
  bookmarkCharacter,
  unbookmarkCharacter,
}) => {
  const { highlightedCharacterId, setHighlightedCharacterId } =
    useHighlightedCharacterContext();
  const { state, navigate } = useSliderContext();
  const {
    token: {
      colorBorder,
      borderRadius,
      green7,
      red7,
      orange7,
      colorWhite,
      yellow5,
    },
  } = theme.useToken();
  return (
    <div
      className={`character-sub-container ${highlightedCharacterId === character.id ? 'character-sub-container-focused' : ''}`}
      style={{
        borderColor:
          highlightedCharacterId === character.id ? colorWhite : colorBorder,
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
              {character.isBookmarked && (
                <motion.div
                  className="character-bookmark-filled"
                  onClick={() => {
                    unbookmarkCharacter({
                      variables: { characterId: character.id },
                    });
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StarFilled
                    style={{
                      color: yellow5,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className="character-bookmark-outlined"
              onClick={() => {
                bookmarkCharacter({
                  variables: { characterId: character.id },
                });
              }}
            >
              <StarOutlined
                style={{
                  color: yellow5,
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="character-rest-info-container"
          onClick={() => {
            if (state.slideKey === 'episodes') {
              setHighlightedCharacterId(null);
              navigate('up', 'info');
            } else {
              setHighlightedCharacterId(character.id);
              navigate('down', 'episodes');
            }
          }}
        >
          {state.slideKey === 'episodes' ? (
            <Slide slideKey="episodes">
              <Episodes character={character} />
            </Slide>
          ) : (
            <Slide slideKey="info">
              <Info
                character={character}
                unbookmarkCharacter={unbookmarkCharacter}
                bookmarkCharacter={bookmarkCharacter}
              />
            </Slide>
          )}
          <Paragraph className="show-more-less">
            Click to {state.slideKey === 'info' ? 'show episodes' : 'go back'}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export const Character = (props) => {
  const { highlightedCharacterId } = useHighlightedCharacterContext();

  return (
    <div className="character-container">
      <SliderProvider
        slideKey={
          highlightedCharacterId === props.character.id ? 'episodes' : 'info'
        }
      >
        <CharacterInternal {...props} />
      </SliderProvider>
    </div>
  );
};
