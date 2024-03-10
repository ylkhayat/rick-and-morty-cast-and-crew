import { AnimatePresence, motion } from 'framer-motion';

import './Slide.css';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const variants = {
  enter: (direction) => {
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
  exit: (direction) => {
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

export const Slide = ({ children, slideKey, ...props }) => {
  const { state } = useSliderContext();
  return (
    <div {...props} className="container">
      <AnimatePresence initial={false} mode="sync" custom={state.direction}>
        <motion.div
          key={slideKey}
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

const SliderContext = createContext({
  state: {
    direction: 'down',
    slideKey: 'landing',
  },
  navigate: (direction, slideKey) => {
    throw new Error('SliderContext: navigate function must be overridden');
  },
});

export const SliderProvider = ({ children, slideKey }) => {
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
  const navigate = (direction, slideKey) => setState({ direction, slideKey });

  return (
    <SliderContext.Provider value={{ state, navigate }}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSliderContext = () => useContext(SliderContext);
