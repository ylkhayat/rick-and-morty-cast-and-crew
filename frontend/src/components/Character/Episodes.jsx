import React from 'react';

import './Character.css';

export const Episodes = ({ character }) => {
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
