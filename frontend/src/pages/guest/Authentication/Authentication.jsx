import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import './Authentication.css';
import { Space, Form, Input, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useSliderContext } from '../../Slider/Slide';

export const Authentication = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { navigate } = useSliderContext();
  const onFinish = ({ username }) => {
    window.sessionStorage.setItem('sessionId', username);
    navigate('right', 'list');
  };

  return (
    <Space className="authentication-container">
      <Form onFinish={onFinish} className="authentication-form">
        <Form.Item
          name="username"
          rules={
            [
              // {
              //   required: true,
              // },
              // {
              //   min: 5,
              //   message: 'must be at least 5 characters long!',
              // },
            ]
          }
          required
        >
          <Input
            addonBefore="Username"
            placeholder="Enter your username"
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </Form.Item>

        <Button htmlType="submit" className="submit-button">
          <LoginOutlined />
        </Button>
      </Form>

      <AnimatePresence mode="wait">
        {isFocused ? (
          <motion.img
            key="focused"
            src="/assets/authentication-focused.png"
            className="authentication-image-focused"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : (
          <motion.img
            key="unfocused"
            src="/assets/authentication-unfocused.png"
            className="authentication-image-unfocused"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </Space>
  );
};
