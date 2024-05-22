import React from 'react';

import {
  App as AntdApp,
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
  const {
    settings: { isDarkMode, displayMode, bookmarks, characters },
    toggleDarkMode,
    reset,
    toggleDisplayMode,
  } = useAppContext();
  const client = useApolloClient();

  const { message } = AntdApp.useApp();

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
    reset();
    window.sessionStorage.removeItem('sessionId');
    message.success('Ciao! 👋');
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
                  onChange={() => toggleDarkMode()}
                  checked={isDarkMode}
                />
                <p>Dark</p>
              </div>

              <div>
                <Button onClick={toggleDisplayMode}>
                  {displayMode === 'bookmarks'
                    ? `${characters.total} Characters`
                    : `${bookmarks.total} Bookmarks`}
                </Button>
              </div>

              <div className="app-header-switch">
                <p>{sessionId}! Logging out?</p>
                <Button
                  onClick={onLogout}
                  icon={<LogoutOutlined />}
                  style={{
                    color: red5,
                    borderColor: red5,
                  }}
                />
              </div>
            </motion.div>
          )}
        </LayoutHeader>
      </div>
    </AnimatePresence>
  );
};
