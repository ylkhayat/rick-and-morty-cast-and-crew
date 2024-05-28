import React from 'react';

import './Landing.css';
import { App as AntdApp, Space, Spin } from 'antd';
import { useSliderContext } from '../../Slider/Slide';
import { useMeQuery } from '../../../api/generated';

export const Landing = () => {
  const { navigate } = useSliderContext();
  useMeQuery({
    onCompleted: (data) => {
      if (data.me) {
        navigate('up', 'list');
      } else {
        if (window.sessionStorage.getItem('sessionId')) {
          message.error('You are not authenticated.');
        }
        window.sessionStorage.removeItem('sessionId');
        window.sessionStorage.removeItem('username');
        navigate('up', 'authentication');
      }
    },
  });
  const { message } = AntdApp.useApp();

  return (
    <Space className="landing-container">
      <img src="/assets/landing.png" className="landing-image" />
      <Spin size="large" />
    </Space>
  );
};
