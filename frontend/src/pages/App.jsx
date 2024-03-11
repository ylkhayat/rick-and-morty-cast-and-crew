import React, { createContext, useEffect, useMemo, useState } from 'react';

import Provider from '../api/Provider';

import { App as AntdApp, ConfigProvider, Layout, theme } from 'antd';
const { Content } = Layout;

import './App.css';
import { Slide, SliderProvider, useSliderContext } from './Slider/Slide';
import { Header } from '../components/Header/Header';
import { Landing } from './guest/Landing/Landing';
import { Authentication } from './guest/Authentication/Authentication';
import { List } from './authenticated/List';
import { AppProvider, useAppContext } from '../providers/AppContext';

const AppInternalInternal = () => {
  const { message } = AntdApp.useApp();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { state } = useSliderContext();

  useEffect(() => {
    message.success(
      'Hello! Welcome to the app, and please enjoy going through the code. I hope using a UI library is okay because I wanted to develop something pretty :).',
      10,
    );
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
        className={
          state.slideKey === 'authentication'
            ? 'app-sub-auth-container'
            : 'app-sub-list-container'
        }
        style={{
          background: colorBgContainer,
        }}
      >
        {content}
      </Content>
    </Layout>
  );
};

const AppInternal = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const {
    settings: { isDarkMode },
  } = useAppContext();

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
            <AppInternalInternal />
          </SliderProvider>
        </AntdApp>
      </ConfigProvider>
    </Provider>
  );
};

const App = () => (
  <AppProvider>
    <AppInternal />
  </AppProvider>
);

export default App;
