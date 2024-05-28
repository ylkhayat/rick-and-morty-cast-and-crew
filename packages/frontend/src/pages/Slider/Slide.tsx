import { AnimatePresence, motion } from 'framer-motion';

import './Slide.css';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';
const variants = {
  enter: (direction: Direction) => {
    switch (direction) {
      case 'right':
        return { x: '100%', y: 0 };
      case 'left':
        return { x: '-100%', y: 0 };
      case 'down':
        return { y: '100%', x: 0 };
      case 'up':
        return { y: '-100%', x: 0 };
      default:
        return { x: 0, y: 0 };
    }
  },
  center: {
    x: 0,
    y: 0,
  },
  exit: (direction: Direction) => {
    switch (direction) {
      case 'right':
        return { x: '-100%', y: 0 };
      case 'left':
        return { x: '100%', y: 0 };
      case 'down':
        return { y: '-100%', x: 0 };
      case 'up':
        return { y: '100%', x: 0 };
      default:
        return { x: 0, y: 0 };
    }
  },
};

type SlideProps = {
  children: ReactNode;
  slideKey: string;
};

export const Slide = ({ children, slideKey, ...props }: SlideProps) => {
  const { state } = useSliderContext();
  return (
    <div {...props} className="container">
      <AnimatePresence initial={false} mode="sync" custom={state.direction}>
        <motion.div
          className="slide"
          variants={variants}
          custom={state.direction}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            height: { duration: 1 },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

type SlideKey = 'landing' | 'list' | 'authentication' | 'episodes' | 'info';
const SliderContext = createContext({
  state: {
    direction: 'down',
    slideKey: 'landing',
  },
  navigate: (direction: Direction, slideKey: SlideKey) => {},
});

type SliderProviderProps = {
  children: React.ReactNode;
  slideKey: SlideKey;
};

export const SliderProvider = ({ children, slideKey }: SliderProviderProps) => {
  const [state, setState] = useState({
    direction: 'down',
    slideKey,
  });

  useEffect(() => {
    if (slideKey === 'info')
      setState(() => ({
        slideKey,
        direction: 'up',
      }));
  }, [slideKey]);
  const navigate = (direction: Direction, slideKey: SlideKey) =>
    setState({ direction, slideKey });

  return (
    <SliderContext.Provider value={{ state, navigate }}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSliderContext = () => useContext(SliderContext);
