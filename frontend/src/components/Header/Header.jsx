import React from 'react';

import {
  ConfigProvider,
  Switch,
  Button,
  Layout,
  theme,
  Typography,
} from 'antd';
const { Header: LayoutHeader } = Layout;
const { Paragraph } = Typography;

import './Header.css';
import { useSliderContext } from '../../pages/Slider/Slide';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoutOutlined } from '@ant-design/icons';
import { useApolloClient } from '@apollo/client';
import { useAppContext } from '../../providers/AppContext';

export const Header = () => {
  const { isDarkMode, setIsDarkMode } = useAppContext();
  const client = useApolloClient();

  const sessionId = window.sessionStorage.getItem('sessionId');
  const {
    token: { colorBgBase, red5 },
  } = theme.useToken();
  const {
    navigate,
    state: { slideKey },
  } = useSliderContext();

  const onLogout = () => {
    client.clearStore();
    window.sessionStorage.removeItem('sessionId');
    navigate('left', 'authentication');
  };

  return (
    <AnimatePresence>
      <div className="app-header-container">
        <LayoutHeader
          className="app-header"
          style={{
            background: colorBgBase,
          }}
        >
          {slideKey === 'list' && (
            <motion.div
              className="app-header-greeting-container"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="app-header-switch">
                <p>Light</p>
                <Switch
                  onChange={(newIsDarkMode) => setIsDarkMode(newIsDarkMode)}
                  checked={isDarkMode}
                />
                <p>Dark</p>
              </div>

              <Paragraph className="app-header-greeting">
                What's Good! {sessionId}!
              </Paragraph>
              <Button
                onClick={onLogout}
                icon={<LogoutOutlined />}
                style={{
                  color: red5,
                  borderColor: red5,
                }}
              />
            </motion.div>
          )}
        </LayoutHeader>
      </div>
    </AnimatePresence>
  );
};
