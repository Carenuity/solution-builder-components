import axios from 'axios';
import { solutionsApiHostname } from '../../../utils/constants.utils';
import {
  ICreateApplicationResponse,
  IHandleCreateApplication,
} from './index.types';
import { processAxiosError } from '../../../utils/common.utils';

export const handleCreateApplication = async ({
  application_id,
  ecosystem_id,
  solution_id,
  chip_family,
  repository,
  tag,
  binaries,
  access_token,
  signal,
}: IHandleCreateApplication) => {
  const formData = new FormData();

  // set application id
  if (!application_id) {
    throw new Error('Associated application required! Return to step 3.');
  }
  formData.append('application_id', application_id);

  // set ecosystem id
  if (!ecosystem_id) {
    throw new Error('Associated ecosystem required! Return to step 3.');
  }
  formData.append('ecosystem_id', ecosystem_id);

  // set solution id
  if (!solution_id) {
    throw new Error('Associated solution required! Return to step 2.');
  }
  formData.append('solution_id', solution_id);

  // set board's chip family
  formData.append('chip_family', chip_family);

  // set repository url
  if (!repository) {
    throw new Error('Repository url required! Return to step 3.');
  }
  formData.append('repository', repository);

  // set tag
  if (!tag) {
    throw new Error('Tag is required! Return to step 3.');
  }
  formData.append('tag', tag);

  if (!binaries) {
    throw new Error('Unable to proceed! No binary file uploaded.');
  }

  if (!binaries.main) {
    throw new Error('Main binary file required!');
  }
  formData.append('mainFile', binaries.main.file);
  formData.append('mainFileOffset', String(binaries.main.offset));

  if (binaries.boot) {
    formData.append('bootFile', binaries.boot.file);
    formData.append('bootFileOffset', String(binaries.boot.offset));
  }

  if (binaries.bootloader) {
    formData.append('bootLoaderFile', binaries.bootloader.file);
    formData.append('bootLoaderFileOffset', String(binaries.bootloader.offset));
  }

  if (binaries.partitions) {
    formData.append('partitionsFile', binaries.partitions.file);
    formData.append('partitionsFileOffset', String(binaries.partitions.offset));
  }

  const url = `${solutionsApiHostname}/v1/binaries`;

  try {
    const response = await axios.post<{ data: ICreateApplicationResponse }>(
      url,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access_token}`,
        },
        signal,
      }
    );
    return response.data.data;
  } catch (error) {
    processAxiosError(error, (errorMessage) => {
      throw new Error(errorMessage);
    });
  }
};
