import React, { useEffect } from 'react';

import './Landing.css';
import { App as AntdApp, Space, Spin } from 'antd';
import { useSliderContext } from '../../Slider/Slide';
import { useMeQuery } from '../../../api/generated';

export const Landing = () => {
  const { navigate } = useSliderContext();
  const { data } = useMeQuery();
  const { message } = AntdApp.useApp();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (data.me) {
        navigate('up', 'list');
      } else {
        message.error('You are not authenticated.');
        window.sessionStorage.removeItem('sessionId');
        navigate('up', 'authentication');
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [data]);
  return (
    <Space className="landing-container">
      <img src="/assets/landing.png" className="landing-image" />
      <Spin size="large" />
    </Space>
  );
};
