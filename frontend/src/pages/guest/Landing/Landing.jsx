import React, { useEffect } from 'react';

import './Landing.css';
import { Space, Spin } from 'antd';
import { useSliderContext } from '../../Slider/Slide';

export const Landing = () => {
  const { navigate } = useSliderContext();
  useEffect(() => {
    const sessionId = window.sessionStorage.getItem('sessionId');

    const timeout = setTimeout(() => {
      if (sessionId) {
        navigate('up', 'list');
      } else {
        navigate('up', 'authentication');
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [history]);
  return (
    <Space className="landing-container">
      <img src="/assets/landing.png" className="landing-image" />
      <Spin size="large" />
    </Space>
  );
};
