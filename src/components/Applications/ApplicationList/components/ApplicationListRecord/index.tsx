import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
  SafetyCertificateOutlined,
  GithubOutlined,
  CloudDownloadOutlined,
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
import MoreApplicationActions from '../../../components/MoreApplicationActions';
// import dynamic from 'next/dynamic';

// const ApplicationDescription = dynamic(
//   () => import('../../../components/ApplicationDescription'),
//   {
//     loading: () => <p>Loading...</p>,
//     ssr: false,
//   }
// );

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
  solutionName,
  ...developerProps
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

    const _actions: ReactNode[] = [];

    // Set Downloads
    if (downloads) {
      _actions.push(
        <ActionText
          key={`downloads-${id}`}
          title={'Downloads'}
          icon={CloudDownloadOutlined}
          text={String(downloads)}
        />
      );
    }

    // Set Up-Votes
    if (upVotes) {
      _actions.push(
        <ActionButton
          key={`likes-${id}`}
          count={upVotes}
          icon={<LikeOutlined />}
          actionedIcon={<LikeFilled />}
          hasActioned={hasUpVoted}
          title={'Likes'}
        />
      );
    }

    // Set Down-Votes
    if (downVotes) {
      _actions.push(
        <ActionButton
          key={`dislikes-${id}`}
          count={downVotes}
          icon={<DislikeOutlined />}
          actionedIcon={<DislikeFilled />}
          hasActioned={hasDownVoted}
          title={'Dislikes'}
        />
      );
    }

    // Set Beta Tests
    if (totalValidators) {
      _actions.push(
        <ActionText
          title={'Beta Tests'}
          icon={SafetyCertificateOutlined}
          text={String(totalValidators)}
          key={`validations-${id}`}
        />
      );

      // Set Verification Status
      setIsVerified(totalValidators > 0);
    }

    // Set Reviews
    if (reviews) {
      _actions.push(
        <ApplicationReviews
          key={`reviews-${id}`}
          tag={applicationName}
          reviews={reviews}
          hasReviewed={hasReviewed}
        />
      );
    }

    // Set Description
    if (description) {
      _actions.push(
        <ApplicationDescription
          key={`description-${id}`}
          description={description}
          developerName={developer.name}
          solutionName={solutionName}
          tag={tag}
        />
      );
    }

    // Set Repository
    _actions.push(
      <ActionButton
        key={`repository-${id}`}
        href={repository}
        target={'_blank'}
        referrerPolicy={'no-referrer'}
        title={'Repository'}
        type={'link'}
        icon={<GithubOutlined />}
      />
    );

    // Set Modification Request
    _actions.push(
      <ApplicationModificationRequest key={`modification-${id}`} />
    );

    const [action1, action2, action3, ...moreActions] = _actions;

    // Set Show More Button
    if (moreActions.length > 0) {
      const moreActionsDropdown = (
        <MoreApplicationActions
          key={`more-app-actions-${id}`}
          actions={moreActions}
        />
      );
      setActions(() => [action1, action2, action3, moreActionsDropdown]);
    } else {
      setActions(() => _actions);
    }
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
        description={
          <ApplicationDeveloperName {...developerProps} developer={developer} />
        }
      />

      <Flex gap={10} vertical={isMobile}>
        <InstallButton manifest={manifest} />
      </Flex>
    </List.Item>
  );
};

export default ApplicationListRecord;
