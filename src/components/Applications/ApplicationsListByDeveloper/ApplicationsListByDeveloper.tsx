import {
  AndroidOutlined,
  CommentOutlined,
  DislikeOutlined,
  DownloadOutlined,
  EditOutlined,
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LikeFilled,
  LinkedinOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  XOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Flex,
  List,
  Popover,
  Select,
  Space,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../Solution/Solution.constants';

const { Text } = Typography;

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `Developer ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ApplicationsListByDeveloper = () => {
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);

  useEffect(() => {
    setIsMobile(width < screenThreshold);
  }, [width]);

  return (
    <>
      <List
        itemLayout={'vertical'}
        size={'small'}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={data}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <Badge.Ribbon
            text={
              <>
                <SafetyCertificateOutlined /> verified
              </>
            }
            color={'green'}
          >
            <List.Item
              key={item.title}
              //   style={{ backgroundColor: '#ccc1' }}
              actions={[
                <IconText
                  icon={DownloadOutlined}
                  text="20"
                  key="list-vertical-star-o"
                />,
                <>
                  <Button
                    type={'text'}
                    size={'small'}
                    icon={<LikeFilled /> /*<LikeOutlined />*/}
                    style={{ color: 'rgba(0,0,0,0.45)' }}
                  >
                    10
                  </Button>
                </>,
                <>
                  <Button
                    type={'text'}
                    size={'small'}
                    icon={<DislikeOutlined /> /*<DislikeFilled />*/}
                    style={{ color: 'rgba(0,0,0,0.45)' }}
                  >
                    2
                  </Button>
                </>,
                <>
                  <Popover
                    title={'Application version-1 Reviews'}
                    content={<div>Reviews list here coming soon..!</div>}
                  >
                    <Button
                      type={'text'}
                      size={'small'}
                      icon={<CommentOutlined />}
                      style={{ color: 'rgba(0,0,0,0.45)' }}
                    >
                      2
                    </Button>
                  </Popover>
                </>,
                <IconText
                  icon={SafetyCertificateOutlined}
                  text="5"
                  key="list-vertical-star-o"
                />,
                <>
                  <Popover
                    title={'Description'}
                    content={
                      <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nihil, veritatis? Voluptate omnis animi eaque tenetur
                        sunt deserunt magni adipisci incidunt!
                      </div>
                    }
                  >
                    <Button
                      title={'Description'}
                      type={'text'}
                      size={'small'}
                      icon={<ReadOutlined />}
                      style={{ color: 'rgba(0,0,0,0.45)' }}
                    />
                  </Popover>
                </>,
                <Button
                  href={'#'}
                  target={'_blank'}
                  referrerPolicy={'no-referrer'}
                  title={'Repository'}
                  type={'link'}
                  size={'small'}
                  icon={<GithubOutlined />}
                  style={{ color: 'rgba(0,0,0,0.45)' }}
                />,
                <>
                  <Popover
                    title={'Request Modification'}
                    content={
                      <div>Request modification form coming soon..!</div>
                    }
                  >
                    <Button
                      title={'Request Modification'}
                      type={'text'}
                      size={'small'}
                      icon={<EditOutlined />}
                      style={{ color: 'rgba(0,0,0,0.45)' }}
                    />
                  </Popover>
                </>,
              ]}
              extra={
                <>
                  {!isMobile && (
                    <Flex
                      vertical={true}
                      justify={'center'}
                      align={'center'}
                      style={{ height: '100%' }}
                    >
                      <Button
                        type={'primary'}
                        shape={'round'}
                        icon={<DownloadOutlined />}
                      >
                        Install
                      </Button>
                    </Flex>
                  )}
                </>
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={
                  <>
                    <Flex vertical={true}>
                      <Text type={'secondary'} ellipsis>
                        Embedded System Engineer
                      </Text>

                      {!isMobile && (
                        <Space direction={'horizontal'} wrap>
                          <Button
                            title="LinkedIn"
                            href={'#'}
                            type={'link'}
                            target={'_blank'}
                            referrerPolicy={'no-referrer'}
                            icon={
                              <Avatar
                                icon={
                                  <LinkedinOutlined
                                    style={{ color: '#0077B5' }}
                                  />
                                }
                                size={'small'}
                                style={{ backgroundColor: 'transparent' }}
                              />
                            }
                          />
                          <Button
                            title="Instagram"
                            href={'#'}
                            type={'link'}
                            target={'_blank'}
                            referrerPolicy={'no-referrer'}
                            icon={
                              <Avatar
                                icon={
                                  <InstagramOutlined
                                    style={{ color: '#c1558b' }}
                                  />
                                }
                                style={{ backgroundColor: 'transparent' }}
                                size={'small'}
                              />
                            }
                          />
                          <Button
                            title="Facebook"
                            href={'#'}
                            type={'link'}
                            target={'_blank'}
                            referrerPolicy={'no-referrer'}
                            icon={
                              <Avatar
                                icon={
                                  <FacebookOutlined
                                    style={{ color: '#3b5998' }}
                                  />
                                }
                                style={{ backgroundColor: 'transparent' }}
                                size={'small'}
                              />
                            }
                          />
                          <Button
                            title="X"
                            href={'#'}
                            type={'link'}
                            target={'_blank'}
                            referrerPolicy={'no-referrer'}
                            icon={
                              <Avatar
                                icon={<XOutlined style={{ color: '#111' }} />}
                                style={{ backgroundColor: 'transparent' }}
                                size={'small'}
                              />
                            }
                          />
                          <Button
                            title="Github"
                            href={'#'}
                            type={'link'}
                            target={'_blank'}
                            referrerPolicy={'no-referrer'}
                            icon={
                              <Avatar
                                icon={
                                  <GithubOutlined
                                    style={{ color: '#24292e' }}
                                  />
                                }
                                style={{ backgroundColor: 'transparent' }}
                                size={'small'}
                              />
                            }
                          />
                          <Button
                            title="YouTube"
                            href={'#'}
                            type={'link'}
                            target={'_blank'}
                            referrerPolicy={'no-referrer'}
                            icon={
                              <Avatar
                                icon={
                                  <YoutubeOutlined
                                    style={{ color: '#CD201F' }}
                                  />
                                }
                                style={{ backgroundColor: 'transparent' }}
                                size={'small'}
                              />
                            }
                          />
                          <Button
                            title="Hackster.io"
                            href={'#'}
                            type={'link'}
                            target={'_blank'}
                            referrerPolicy={'no-referrer'}
                            icon={
                              <Avatar
                                src={
                                  'https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fsocial_handle%252F1733818250451_hackster-io.png%3Falt%3Dmedia%26token%3D5a5f8d36-82f9-4551-9086-3ea6a88ccc8e&w=48&q=75'
                                }
                                icon={
                                  <AndroidOutlined style={{ color: '#ccc' }} />
                                }
                                style={{ backgroundColor: 'transparent' }}
                                size={'small'}
                              />
                            }
                          />
                          <Button
                            title="Wokwi"
                            href={'#'}
                            type={'link'}
                            target={'_blank'}
                            referrerPolicy={'no-referrer'}
                            icon={
                              <Avatar
                                src={
                                  'https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fsocial_handle%252F1733818219677_wokwi.png%3Falt%3Dmedia%26token%3Da1b269f3-1fc4-4d99-8965-7289c7512fb3&w=48&q=75'
                                }
                                icon={
                                  <AndroidOutlined style={{ color: '#ccc' }} />
                                }
                                style={{ backgroundColor: 'transparent' }}
                                size={'small'}
                              />
                            }
                          />
                        </Space>
                      )}
                    </Flex>
                  </>
                }
              />
              {/* {item.content} */}
              <Flex gap={10} vertical={isMobile}>
                <Text>version:</Text>
                <Select
                  defaultValue="jelly"
                  size={'small'}
                  style={{ minWidth: 120 }}
                  // onChange={handleChange}
                  options={[
                    { value: 'jack', label: 'Version 1' },
                    { value: 'jelly', label: 'Jelly' },
                    { value: 'Yiminghe', label: 'Version 3' },
                  ]}
                />

                {isMobile && (
                  <Button
                    type={'primary'}
                    shape={'round'}
                    icon={<DownloadOutlined />}
                  >
                    Install
                  </Button>
                )}
              </Flex>
            </List.Item>
          </Badge.Ribbon>
        )}
      />
    </>
  );
};

export default ApplicationsListByDeveloper;
