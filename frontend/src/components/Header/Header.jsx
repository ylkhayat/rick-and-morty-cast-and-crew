import React from 'react';

import { Button, Layout, theme, Typography } from 'antd';
const { Header: LayoutHeader } = Layout;
const { Paragraph } = Typography;

import './Header.css';
import { useSliderContext } from '../../pages/Slider/Slide';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoutOutlined } from '@ant-design/icons';

export const Header = () => {
  const sessionId = window.sessionStorage.getItem('sessionId');
  const {
    token: { colorBgBase, red5 },
  } = theme.useToken();
  const {
    navigate,
    state: { slideKey },
  } = useSliderContext();

  const onLogout = () => {
    window.sessionStorage.removeItem('sessionId');
    navigate('left', 'authentication');
  };

  return (
    <AnimatePresence>
      {slideKey === 'list' && (
        <motion.div
          className="app-header-container"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <LayoutHeader
            className="app-header"
            style={{
              background: colorBgBase,
            }}
          >
            <Paragraph className="app-header-greeting">
              Hey, {sessionId}!
            </Paragraph>
            <Button
              onClick={onLogout}
              icon={<LogoutOutlined />}
              style={{
                color: red5,
                borderColor: red5,
              }}
            ></Button>
          </LayoutHeader>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
