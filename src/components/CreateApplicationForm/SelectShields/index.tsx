import React from 'react';
import { Col, Row } from 'antd';
import ShieldsPreview from './ShieldsPreview';
import ShieldsForm from './ShieldsForm';
import { ShieldPreviewProvider } from './ShieldsPreviewProvider';

const SelectShields: React.FC = () => {
  return (
    <>
      <ShieldPreviewProvider>
        <Row gutter={2}>
          <Col xs={24} style={{ padding: '2rem' }}>
            <ShieldsForm />
          </Col>
          <Col xs={24}>
            <ShieldsPreview />
          </Col>
        </Row>
      </ShieldPreviewProvider>
    </>
  );
};

export default SelectShields;
