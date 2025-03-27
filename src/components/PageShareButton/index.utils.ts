export const sharePage = async ({
  url,
  name,
}: {
  url?: string;
  name: string;
}) => {
  await navigator.share({
    url,
    title: name,
    text: name,
  });

  return 'Page shared successfully.';
};
