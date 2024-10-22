import { Row, Col, Typography } from 'antd';
import React, { useContext } from 'react';
import ShieldCard from '../ShieldCard';
import { ShieldPreviewContext } from '../ShieldsPreviewProvider';

const { Title } = Typography;

const ShieldsPreview = () => {
  const { state } = useContext(ShieldPreviewContext);

  return (
    <>
      <Title level={3}>Boards Preview</Title>
      <Row gutter={{ md: 2 }}>
        <Col md={8} xs={24}>
          <ShieldCard
            imageUrl={state.sensor.url}
            name={state.sensor.name}
            title="Sensor"
          />
        </Col>
        <Col md={8} xs={24}>
          <ShieldCard
            imageUrl={state.microcontroller.url}
            name={state.microcontroller.name}
            title="Microcontroller"
          />
        </Col>
        <Col md={8} xs={24}>
          <ShieldCard
            imageUrl={state.actuator.url}
            name={state.actuator.name}
            title="Actuator"
          />
        </Col>
      </Row>
    </>
  );
};

export default ShieldsPreview;
