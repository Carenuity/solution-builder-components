import QueryString from 'qs';
import { SolutionGroupData } from './SolutionGroupList.types';
import { solutionsApiHostname } from '../../../utils/constants.utils';

export type IFilter =
  | 'microcontroller'
  | 'ecosystem'
  | 'application'
  | 'company';

export const fetchSolutionGroups = async ({
  filterId,
  filter,
  limit,
  offset,
}: {
  filterId: string;
  filter: IFilter;
  limit?: number;
  offset?: string;
}): Promise<{ data: SolutionGroupData[]; offset?: string }> => {
  const query = QueryString.stringify({
    mode: 'full',
    limit,
    offset,
    props:
      'id,name,description,sensor,microcontroller,actuator,applications,avatars,manufacturer',
    filter,
    filterId,
  });
  const url = `${solutionsApiHostname}/v1/solution-templates?${query}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText || 'Something went wrong!');
    }

    const _data = await response.json();
    const items = _data.data?.items || [];
    const offset = _data.data?.offset;

    const solutionData: SolutionGroupData[] = items.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data: any): SolutionGroupData => {
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          imageUrl: data.avatars?.[0].url,
          sensor: {
            id: data.sensor.id,
            logo: data.sensor.avatars?.[0].url,
            name: data.sensor.name,
            manufacturer: {
              id: data.sensor.manufacturer.id,
              logo: data.sensor.manufacturer.avatars?.[0].url,
              name: data.sensor.manufacturer.name,
            },
          },
          microcontroller: {
            id: data.microcontroller.id,
            logo: data.microcontroller.avatars?.[0].url,
            name: data.microcontroller.name,
            manufacturer: {
              id: data.microcontroller.manufacturer.id,
              logo: data.microcontroller.manufacturer.avatars?.[0].url,
              name: data.microcontroller.manufacturer.name,
            },
          },
          actuator: {
            id: data.actuator.id,
            logo: data.actuator.avatars?.[0].url,
            name: data.actuator.name,
            manufacturer: {
              id: data.actuator.manufacturer.id,
              logo: data.actuator.manufacturer.avatars?.[0].url,
              name: data.actuator.manufacturer.name,
            },
          },
          tags: data.applications?.map(
            (application: {
              id: string;
              name: string;
              avatars: { url: string }[];
            }) => ({
              id: application.id,
              name: application.name,
              avatar: application.avatars?.[0].url,
            })
          ),
        };
      }
    );
    return { data: solutionData, offset };
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    console.error(err.message, err);
    return { data: [] };
  }
};
