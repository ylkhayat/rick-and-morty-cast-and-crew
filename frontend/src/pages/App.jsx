import React, { useEffect, useState } from 'react';

import Provider from '../api/Provider';

import { App as AntdApp, ConfigProvider, Layout, theme } from 'antd';
const { Content } = Layout;

import './App.css';
import { SliderProvider, Slides } from './Slider/Slide';
import { Header } from '../components/Header/Header';

const AppInternal = () => {
  const { message } = AntdApp.useApp();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    message.success('Hiho!');
    return () => {
      message.error('Byebye!');
    };
  }, []);

  return (
    <SliderProvider>
      <Layout className="app-container">
        <Header />
        <Content
          className="app-sub-container"
          style={{
            background: colorBgContainer,
          }}
        >
          <Slides />
        </Content>
      </Layout>
    </SliderProvider>
  );
};

const App = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <Provider>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
            fontFamily: 'Spiegel-Regular',
          },
        }}
      >
        <AntdApp>
          <AppInternal />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
