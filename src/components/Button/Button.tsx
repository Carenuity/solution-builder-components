import React from 'react';
import './Button.css';
import { Button as AntdButton, Col, Row } from 'antd';

export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return (
    <>
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <AntdButton type="primary">Primary Button</AntdButton>
        </Col>
        <Col md={12} xs={24}>
          <button>{props.label}</button>
        </Col>
      </Row>
    </>
  );
};

export default Button;
