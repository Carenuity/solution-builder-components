export const setOffCanvasPreview = async ({
  originalImageDimensions,
  imageBlob,
  crop,
  pixelRatio,
  preferredWidth,
}) => {
  const { naturalWidth, naturalHeight, width, height, mimeType } =
    originalImageDimensions;

  const scaleX = naturalWidth / width;
  const scaleY = naturalHeight / height;

  const canvasWidth = Math.floor(crop.width * scaleX * pixelRatio);
  const canvasHeight = Math.floor(crop.height * scaleY * pixelRatio);

  const osc = new OffscreenCanvas(canvasWidth, canvasHeight);
  const ctx = osc.getContext('2d');
  if (!ctx) throw new Error('No 2d context!');

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const arrBuffer = await imageBlob.arrayBuffer();
  const imgB = new Blob([arrBuffer], {
    type: mimeType,
  });
  const imageBitmap = await createImageBitmap(imgB);

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    imageBitmap,
    0,
    0,
    naturalWidth,
    naturalHeight,
    0,
    0,
    naturalWidth,
    naturalHeight
  );

  ctx.restore();

  const mimeArr = mimeType.split('/');
  const blob = await osc.convertToBlob({
    type: mimeType,
    quality: 1.0,
  });

  const dataBlob = await getSizedImageBlob({
    blob,
    mimeType,
    naturalWidth: canvasWidth,
    naturalHeight: canvasHeight,
    pixelRatio,
    width: preferredWidth,
  });

  const file = new File([dataBlob], `image.${mimeArr[1]}`, {
    type: dataBlob.type,
  });
  return file;
};

export const getSizedImageBlob = async ({
  mimeType,
  width,
  naturalWidth,
  naturalHeight,
  pixelRatio,
  blob,
}) => {
  const ratio = width / naturalWidth;
  const height = Math.floor(naturalHeight * ratio);

  const canvasWidth = Math.floor(width * pixelRatio);
  const canvasHeight = Math.floor(height * pixelRatio);

  const canvas = new OffscreenCanvas(canvasWidth, canvasHeight);

  const context = canvas.getContext('2d');
  if (!context) return undefined;

  context.scale(pixelRatio, pixelRatio);
  context.imageSmoothingQuality = 'high';
  context.save();

  const imageBitmap = await createImageBitmap(blob);

  context.drawImage(imageBitmap, 0, 0, width, height);
  context.restore();

  const sizedImageBlob = await canvas.convertToBlob({
    type: mimeType,
    quality: 1.0,
  });
  return sizedImageBlob;
};

export const previewWorkerOnMessage = async function (e) {
  const {
    originalImageDimensions,
    imageBlob,
    crop,
    pixelRatio,
    preferredWidth,
  } = e.data;

  const file = await setOffCanvasPreview({
    originalImageDimensions,
    imageBlob,
    crop,
    pixelRatio,
    preferredWidth,
  });

  self.postMessage({ file });
};
