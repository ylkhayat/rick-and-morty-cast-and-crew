import { AnimatePresence, motion } from 'framer-motion';

import './Slide.css';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Authentication } from '../guest/Authentication/Authentication';
import { List } from '../authenticated/List';
import { Landing } from '../guest/Landing/Landing';

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

export const Slide = ({ children, slideKey, direction, ...props }) => (
  <div {...props} className="container">
    <AnimatePresence initial={false} mode="sync" custom={direction}>
      <motion.div
        key={slideKey}
        className="slide"
        variants={variants}
        custom={direction}
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

const SliderContext = createContext({
  state: {
    direction: 'down',
    slideKey: 'landing',
  },
  navigate: (direction, slideKey) => {},
});

export const SliderProvider = ({ children }) => {
  const [state, setState] = useState({
    direction: 'down',
    slideKey: 'landing',
  });
  const navigate = (direction, slideKey) => setState({ direction, slideKey });

  return (
    <SliderContext.Provider value={{ state, navigate }}>
      {children}
    </SliderContext.Provider>
  );
};

export const Slides = () => {
  const { state } = useSliderContext();
  const content = useMemo(() => {
    switch (state.slideKey) {
      case 'landing':
        return (
          <Slide slideKey="landing" direction={state.direction}>
            <Landing />
          </Slide>
        );
      case 'authentication':
        return (
          <Slide slideKey="authentication" direction={state.direction}>
            <Authentication />
          </Slide>
        );
      case 'list':
        return (
          <Slide slideKey="list" direction={state.direction}>
            <List />
          </Slide>
        );
      default:
        return <Authentication />;
    }
  }, [state.slideKey]);

  return content;
};

export const useSliderContext = () => useContext(SliderContext);
