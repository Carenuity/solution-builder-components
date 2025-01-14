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

/*
const imageUrlToDimensions = ({ imageUrl }: { imageUrl: string }) => {
  return new Promise((resolve: (value?: File) => void, reject) => {
    try {
      const image = new Image();
      image.crossOrigin = '*';
      image.src = imageUrl;
      image.onload = async () => {
        const pixelRatio = window.devicePixelRatio;
        const { naturalWidth, naturalHeight } = image;

        const canvas = document.createElement('canvas');
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error('Unable to get Context!');
        }

        context.scale(pixelRatio, pixelRatio);
        context.imageSmoothingQuality = 'high';
        context.save();

        context.drawImage(image, 0, 0, naturalWidth, naturalHeight);
        context.restore();

        const mimeType = 'image/png';

        // const dataUrl = canvas.toDataURL(mimeType, 1);
        // resolve(dataUrl);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(undefined);
              return;
            }

            const file = new File([blob], `image.png`, {
              type: mimeType,
            });
            resolve(file);
          },
          mimeType,
          1
        );

        // resolve({ pixelRatio, width: naturalWidth, height: naturalHeight });

        // const canvas = new OffscreenCanvas(naturalWidth, naturalHeight);
        // const context = canvas.getContext('2d');

        // if (!context) {
        //   throw new Error('Unable to get Context!');
        // }

        // context.scale(pixelRatio, pixelRatio);
        // context.imageSmoothingQuality = 'high';
        // context.save();

        // context.drawImage(image, 0, 0, naturalWidth, naturalHeight);
        // context.restore();

        // const imageBlob = await canvas.convertToBlob({
        //   quality: 1.0,
        // });

        // const file = new File([imageBlob], `image.png`, {
        //   type: 'image/png',
        // });

        // resolve(file);
      };
    } catch (error) {
      reject(error);
    }
  });
};
*/

/*
const imageUrlToFileWF = async ({
  url,
  height,
  pixelRatio,
  width,
}: {
  url: string;
  width: number;
  height: number;
  pixelRatio: number;
}) => {
  const resp = await fetch(url, {
    mode: 'no-cors',
    method: 'GET',
    headers: {
      'Content-Type': 'image/*',
    },
  });
  if (!resp.ok) {
    const errorMsg = resp.statusText;
    throw errorMsg || 'Network Error';
  }
  const imgBlob = await resp.blob();

  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to get Context!');
  }

  context.scale(pixelRatio, pixelRatio);
  context.imageSmoothingQuality = 'high';
  context.save();

  const imgBitmap = await createImageBitmap(imgBlob);

  context.drawImage(imgBitmap, 0, 0, width, height);
  context.restore();

  const imageBlob = await canvas.convertToBlob({
    quality: 1.0,
  });

  const file = new File([imageBlob], 'image.png', {
    type: 'image/png',
  });
  return file;
};
*/
export const shareSolution = async ({
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

  return 'Solution shared successfully.';

  /*
  return await new Promise((resolve: (value: string) => void, reject) => {
    const w = new Worker(
      URL.createObjectURL(
        new Blob([shareSolutionWorkerContent], {
          type: 'application/javascript',
        })
      )
    );

    w.postMessage({ ...dimensions, url: imageUrl });

    w.onmessage = async (e) => {
      try {
        const { file } = e.data;

        // if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          // files: [file],
          // title: name,
          url,
          text: name,
        });

        w.terminate();
        resolve('Solution shared successfully.');
        // } else {
        //   throw new Error(`Your system doesn't support sharing these files.`);
        // }
      } catch (error) {
        reject(error);
      }
    };

    w.onerror = (e) => {
      try {
        w.terminate();
        throw new Error(e.message || 'Error: Failed to share solution.');
      } catch (error) {
        reject(error);
      }
    };
  });
  */
};
