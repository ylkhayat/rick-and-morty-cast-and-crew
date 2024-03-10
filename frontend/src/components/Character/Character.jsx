import React, { forwardRef } from 'react';

import { theme, Typography } from 'antd';
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
import {
  Slide,
  SliderProvider,
  useSliderContext,
} from '../../pages/Slider/Slide';
import { useHighlightedCharacterContext } from '../../pages/authenticated/HighlightedCharacter';

const { Paragraph } = Typography;

const Episodes = ({ character }) => {
  return (
    <div className="character-episodes-container">
      <div className="character-episodes">
        {character.episodes.slice(0, 4).map((episode) => (
          <div key={episode.id} className="character-episode-container">
            <p className="character-episode-name">{episode.name}</p>
            <p className="character-episode-air-date">{episode.airDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
const Info = ({ character }) => {
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

const CharacterInternal = ({
  character,
  isBookmarked,
  bookmarkCharacter,
  unbookmarkCharacter,
}) => {
  const { highlightedCharacterId, setHighlightedCharacterId } =
    useHighlightedCharacterContext();
  const { state, navigate } = useSliderContext();
  const {
    token: { colorBorder, borderRadius, green7, red7, orange7, colorWhite },
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
              {isBookmarked && (
                <motion.img
                  src="/assets/star-fill.svg"
                  className="character-bookmark-fill"
                  onClick={() => {
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
                bookmarkCharacter({
                  variables: { characterId: character.id },
                });
              }}
            />
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
                isBookmarked={isBookmarked}
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

export const Character = forwardRef((props, ref) => {
  const { highlightedCharacterId } = useHighlightedCharacterContext();

  return (
    <div ref={ref} className="character-container">
      <SliderProvider
        slideKey={
          highlightedCharacterId === props.character.id ? 'episodes' : 'info'
        }
      >
        <CharacterInternal {...props} />
      </SliderProvider>
    </div>
  );
});
