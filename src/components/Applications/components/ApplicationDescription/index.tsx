import { Divider, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import ActionButton from '../ActionButton';
import { ReadOutlined } from '@ant-design/icons';
import { ApplicationDescriptionProps } from './index.types';
import { useTheme } from 'antd-style';
import parse from 'html-react-parser';
import { createPortal } from 'react-dom';

const { Text, Paragraph } = Typography;

const ApplicationDescription: React.FC<ApplicationDescriptionProps> = ({
  description,
  developerName,
  solutionName,
  tag,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const token = useTheme();

  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    // body: {
    //   boxShadow: 'inset 0 0 5px #999',
    //   borderRadius: 5,
    // },
    mask: {
      backdropFilter: 'blur(5px)',
    },
    footer: {
      borderTop: '1px solid #333',
    },
    content: {
      boxShadow: '0 0 30px #999',
    },
  };

  return (
    <>
      {createPortal(
        <>
          <Modal
            title={
              <>
                {tag} <Divider type={'vertical'} />{' '}
                <Text
                  type={'secondary'}
                  ellipsis={{ tooltip: developerName }}
                  style={{ fontSize: '.75rem', width: '12rem' }}
                >
                  By {developerName}
                </Text>
              </>
            }
            open={openModal}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
            width={{
              xs: '95%',
              sm: '85%',
              md: '75%',
              lg: '65%',
              xl: '55%',
              xxl: '45%',
            }}
            footer={
              <>
                <Text
                  type={'secondary'}
                  ellipsis={{
                    tooltip: solutionName,
                  }}
                >
                  {solutionName}
                </Text>
              </>
            }
            styles={modalStyles}
            style={{ fontSize: '.6rem' }}
          >
            <Paragraph
              ellipsis={{
                rows: 6,
                expandable: true,
                symbol: (
                  <Text
                    style={{ fontSize: '.8rem', color: token.colorPrimary }}
                  >
                    Read More
                  </Text>
                ),
              }}
            >
              {parse(description || '')}
            </Paragraph>
          </Modal>
        </>,
        document.body
      )}

      <ActionButton
        icon={<ReadOutlined />}
        title={'Description'}
        onClick={() => setOpenModal(true)}
      />
    </>
  );
};

export default ApplicationDescription;
