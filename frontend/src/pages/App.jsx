import React, { useEffect, useMemo, useState } from 'react';

import Provider from '../api/Provider';

import { App as AntdApp, ConfigProvider, Layout, theme } from 'antd';
const { Content } = Layout;

import './App.css';
import { Slide, SliderProvider, useSliderContext } from './Slider/Slide';
import { Header } from '../components/Header/Header';
import { Landing } from './guest/Landing/Landing';
import { Authentication } from './guest/Authentication/Authentication';
import { List } from './authenticated/List';

const AppInternal = () => {
  const { message } = AntdApp.useApp();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { state } = useSliderContext();

  useEffect(() => {
    message.success('Hiho!');
    return () => {
      message.error('Byebye!');
    };
  }, []);

  const content = useMemo(() => {
    switch (state.slideKey) {
      case 'landing':
        return (
          <Slide slideKey="landing">
            <Landing />
          </Slide>
        );
      case 'authentication':
        return (
          <Slide slideKey="authentication">
            <Authentication />
          </Slide>
        );
      case 'list':
        return (
          <Slide slideKey="list">
            <List />
          </Slide>
        );
      default:
        return <Authentication />;
    }
  }, [state.slideKey]);

  return (
    <Layout className="app-container">
      <Header />
      <Content
        className="app-sub-container"
        style={{
          background: colorBgContainer,
        }}
      >
        {content}
      </Content>
    </Layout>
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
          <SliderProvider slideKey="landing">
            <AppInternal />
          </SliderProvider>
        </AntdApp>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
