import React, { createContext, useContext, useState } from 'react';

const HighlightedCharacterContext = createContext(null);

export const HighlightedCharacterProvider = ({ children }) => {
  const [highlightedCharacterId, setHighlightedCharacterId] = useState(null);
  return (
    <HighlightedCharacterContext.Provider
      value={{ highlightedCharacterId, setHighlightedCharacterId }}
    >
      {children}
    </HighlightedCharacterContext.Provider>
  );
};

export const useHighlightedCharacterContext = () =>
  useContext(HighlightedCharacterContext);
