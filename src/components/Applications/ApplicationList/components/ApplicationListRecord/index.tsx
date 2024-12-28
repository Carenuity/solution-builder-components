import {
  DownloadOutlined,
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
  SafetyCertificateOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { Flex, List } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import ActionButton from '../../../components/ActionButton';
import ActionText from '../../../components/ActionText';
import ApplicationDescription from '../../../components/ApplicationDescription';
import ApplicationModificationRequest from '../../../components/ApplicationModificationRequest';
import ApplicationReviews from '../../../components/ApplicationReviews';
import ApplicationDeveloperName from '../ApplicationDeveloperName';
import ApplicationRecordTitleV1 from '../ApplicationRecordTitleV1';
import { ApplicationListRecordProps } from './index.types';
import { useScreenSize } from '../../../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../../../Solution/Solution.constants';

const ApplicationListRecord: React.FC<ApplicationListRecordProps> = ({
  developer,
  id,
  InstallButton,
  manifest,
  repository,
  description,
  downVotes,
  downloads,
  hasDownVoted,
  hasReviewed,
  hasUpVoted,
  reviews,
  tag,
  upVotes,
  totalValidators,
}) => {
  const { width } = useScreenSize();
  const [actions, setActions] = useState<ReactNode[]>([]);
  const [isVerified, setIsVerified] = useState<boolean | undefined>();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);

  const applicationName = tag || 'App version';

  useEffect(() => {
    setIsMobile(width < screenThreshold);
  }, [width]);

  useEffect(() => {
    if (!window.document) {
      return;
    }

    // Set Downloads
    if (downloads) {
      setActions((old) => [
        ...old,
        <ActionText
          key={`downloads-${id}`}
          title={'Downloads'}
          icon={DownloadOutlined}
          text={String(downloads)}
        />,
      ]);
    }

    // Set Up-Votes
    if (upVotes) {
      setActions((old) => [
        ...old,
        <ActionButton
          key={`likes-${id}`}
          count={upVotes}
          icon={<LikeOutlined />}
          actionedIcon={<LikeFilled />}
          hasActioned={hasUpVoted}
          title={'Likes'}
        />,
      ]);
    }

    // Set Down-Votes
    if (downVotes) {
      setActions((old) => [
        ...old,
        <ActionButton
          key={`dislikes-${id}`}
          count={downVotes}
          icon={<DislikeOutlined />}
          actionedIcon={<DislikeFilled />}
          hasActioned={hasDownVoted}
          title={'Dislikes'}
        />,
      ]);
    }

    // Set Beta Tests
    if (totalValidators) {
      setActions((old) => [
        ...old,
        <ActionText
          title={'Beta Tests'}
          icon={SafetyCertificateOutlined}
          text={String(totalValidators)}
          key={`validations-${id}`}
        />,
      ]);

      // Set Verification Status
      setIsVerified(totalValidators > 0);
    }

    // Set Reviews
    if (reviews) {
      setActions((old) => [
        ...old,
        <ApplicationReviews
          key={`reviews-${id}`}
          tag={applicationName}
          reviews={reviews}
          hasReviewed={hasReviewed}
        />,
      ]);
    }

    // Set Description
    if (description) {
      setActions((old) => [
        ...old,
        <ApplicationDescription key={`description-${id}`} />,
      ]);
    }

    // Set Repository
    setActions((old) => [
      ...old,
      <ActionButton
        href={repository}
        target={'_blank'}
        referrerPolicy={'no-referrer'}
        title={'Repository'}
        type={'link'}
        icon={<GithubOutlined />}
      />,
    ]);

    // Set Modification Request
    setActions((old) => [...old, <ApplicationModificationRequest />]);
  }, []);

  return (
    <List.Item actions={actions}>
      <List.Item.Meta
        title={
          <ApplicationRecordTitleV1
            value={applicationName}
            isVerified={isVerified}
          />
        }
        description={<ApplicationDeveloperName value={developer.name} />}
      />

      <Flex gap={10} vertical={isMobile}>
        <InstallButton manifest={manifest} />
      </Flex>
    </List.Item>
  );
};

export default ApplicationListRecord;
