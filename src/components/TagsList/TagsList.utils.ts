import axios from 'axios';
import { processAxiosError } from '../../utils/common.utils';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';
import { TagDataType, TagRecord } from './TagsList.types';

export const fetchTags = async ({
  signal,
  offset,
}: {
  signal?: AbortSignal;
  offset?: string;
}) => {
  let tags: TagDataType[] = [];
  let nextPageStart = undefined;

  const url = `${solutionsApiHostname}/v1/applications`;

  try {
    const response = await axios.get<ListApiResponse<TagRecord>>(url, {
      params: {
        mode: 'full',
        offset,
        limit: 10,
        props: 'id,name,avatars',
      },
      signal,
    });

    if (response.status === 200) {
      const { items, offset: _offset } = response.data.data;
      nextPageStart = _offset;

      tags = items.map(
        ({ id, avatars, name }): TagDataType => ({
          icon: avatars[0]?.url,
          key: id,
          name,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }

  return { tags, nextPageStart };
};

export const deleteTag = async ({
  accessToken,
  tagId,
  signal,
}: {
  tagId: string;
  accessToken: string;
  signal?: AbortSignal;
}) => {
  const url = `${solutionsApiHostname}/v1/applications/${tagId}`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal,
    });
  } catch (error) {
    processAxiosError(error, (message) => {
      throw new Error(message);
    });
  }
};
