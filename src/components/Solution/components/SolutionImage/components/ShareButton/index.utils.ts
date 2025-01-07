/*const dataUrlToFile = ({
  dataUrl,
  filename,
}: {
  dataUrl: string;
  filename: string;
}) => {
  const dataUrlParts = dataUrl.split(',');
  const mime = dataUrlParts[0]?.match(/:(.*?);/)?.[1];
  const data = dataUrlParts[1];

  if (data && mime) {
    const encodedData = atob(data);
    let encodedDataLength = encodedData.length;
    const dataBuffer = new Uint8Array(encodedDataLength);

    while (encodedDataLength--) {
      dataBuffer[encodedDataLength] = encodedData.charCodeAt(encodedDataLength);
    }

    const mimeParts = mime.split('/');
    const extension = mimeParts[1];

    const file = new File([dataBuffer], `${filename}.${extension}`, {
      type: mime,
    });
    return file;
  }
  return undefined;
};*/

const imageUrlToFile = ({ url }: { url: string }) => {
  return new Promise((resolve: (value: File) => void, reject) => {
    try {
      const image = new Image();
      image.src = url;
      image.onload = async () => {
        const pixelRatio = window.devicePixelRatio;
        const { naturalWidth, naturalHeight } = image;

        const canvas = new OffscreenCanvas(naturalWidth, naturalHeight);
        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error('Unable to get Context!');
        }

        context.scale(pixelRatio, pixelRatio);
        context.imageSmoothingQuality = 'high';
        context.save();

        context.drawImage(image, 0, 0, naturalWidth, naturalHeight);
        context.restore();

        const imageBlob = await canvas.convertToBlob({
          quality: 1.0,
        });

        const file = new File([imageBlob], `image.png`, {
          type: 'image/png',
        });

        resolve(file);
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const shareSolution = async ({
  url,
  imageUrl,
  name,
}: {
  url?: string;
  imageUrl: string;
  name: string;
}) => {
  // feature detecting navigator.canShare() also implies
  // the same for the navigator.share()
  if (!navigator.canShare) {
    throw new Error(`Your browser doesn't support the Web Share API.`);
  }

  const file = await imageUrlToFile({ url: imageUrl });

  if (navigator.canShare({ files: [file] })) {
    // try {
    await navigator.share({
      files: [file],
      //   title: 'Images',
      url,
      text: name,
    });

    return 'Solution shared successfully.';
    // } catch (error) {
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   const err = error as any;
    //   throw new Error(`Error: ${err.message}`);
    // }
  } else {
    throw new Error(`Your system doesn't support sharing these files.`);
  }
};
