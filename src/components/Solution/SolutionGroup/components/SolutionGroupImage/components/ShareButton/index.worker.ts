export const shareSolutionWorkerContent = `

const imageUrlToFileWF = async ({
    url,
    height,
    pixelRatio,
    width,
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

self.onmessage = async function (e) {
    const { url, height, pixelRatio, width } = e.data;
  
    // const file = await imageUrlToFileWF({
    //   url,
    //   height,
    //   pixelRatio,
    //   width,
    // });
  
    self.postMessage({ file: '' });
  };
`;
