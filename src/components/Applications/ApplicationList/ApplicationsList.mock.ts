import { ApplicationData } from './ApplicationsList.types';

export const generateApplicationsData = ({
  count,
  page,
}: {
  count: number;
  page: number;
}) => {
  const getId = (i: number) => i + page;

  return Array.from({ length: count }).map(
    (_, i): ApplicationData => ({
      id: `werty-${getId(i)}`,
      tag: `Version-${getId(i)}`,
      developer: {
        id: `dev-${getId(i)}`,
        name: `john ${getId(i)}`,
        subtitle: 'Embedded Systems developer',
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${getId(i)}`,
        socialHandles: [{ id: `handle-${getId(i)}`, url: '#' }],
      },
      manifest: `https://api.dicebear.com/7.x/miniavs/svg?seed=${getId(i)}`,
      repository: 'https://github.com/ant-design/ant-design',
      downVotes: getId(i) * 1,
      downloads: getId(i) * 3,
      hasDownVoted: getId(i) % 3 === 0,
      hasUpVoted: getId(i) % 2 === 0,
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      reviews: [
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      ],
      hasReviewed: getId(i) % 5 === 0,
      totalValidators: getId(i) * 2,
      upVotes: getId(i) * 3,
    })
  );
};
