import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

type HighlightedCharacterContextType = {
  highlightedCharacterId: number | null;
  setHighlightedCharacterId: Dispatch<React.SetStateAction<number | null>>;
};

const HighlightedCharacterContext =
  createContext<HighlightedCharacterContextType>({
    highlightedCharacterId: null,
    setHighlightedCharacterId: () => {},
  });

type HighlightedCharacterProviderProps = {
  children: ReactNode;
};

export const HighlightedCharacterProvider = ({
  children,
}: HighlightedCharacterProviderProps) => {
  const [highlightedCharacterId, setHighlightedCharacterId] = useState<
    number | null
  >(null);
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
