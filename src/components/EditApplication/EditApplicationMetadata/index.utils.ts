import axios from 'axios';
import { solutionsApiHostname } from '../../../utils/constants.utils';
import { IHandleUpdateApplicationDetails } from './index.types';
import { IUpdateApplicationResponse } from '../../UpdateApplicationForm/UpdateButton/index.types';
import { processAxiosError } from '../../../utils/common.utils';

export const handleUpdateApplicationDetails = async ({
  id,
  application_id,
  ecosystem_id,
  repository,
  tag,
  access_token,
  signal,
}: IHandleUpdateApplicationDetails) => {
  const formData = new FormData();
  let canProceed = false;

  // set application id
  if (application_id) {
    canProceed = true;
    formData.append('application_id', application_id);
  }

  // set ecosystem id
  if (ecosystem_id) {
    canProceed = true;
    formData.append('ecosystem_id', ecosystem_id);
  }

  // set repository url
  if (repository) {
    canProceed = true;
    formData.append('repository', repository);
  }

  // set tag
  if (tag) {
    canProceed = true;
    formData.append('tag', tag);
  }

  if (!canProceed) {
    throw new Error('Empty fields! Unable to update.');
  }

  const url = `${solutionsApiHostname}/v1/binaries/${id}`;

  try {
    const response = await axios.put<{ data: IUpdateApplicationResponse }>(
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
