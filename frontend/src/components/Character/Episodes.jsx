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
import { useHighlightedCharacterContext } from '../../providers/HighlightedCharacterContext';

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
