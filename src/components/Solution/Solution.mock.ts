import QueryString from 'qs';
import { SolutionProps } from './Solution.types';
import { InstallButton } from '../Applications/ApplicationList/ApplicationsList.stories';
import { ApplicationData } from '../Applications/ApplicationList/ApplicationsList.types';

export const fetchSolution = async ({ id }: { id: string }) => {
  const query = QueryString.stringify({
    mode: 'full',
    props:
      'id,name,description,sensor,microcontroller,actuator,applications,avatars',
  });
  const url = `https://solutions-api.carenuity.com/v1/solution-templates/${id}?${query}`;

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
    const data = _data.data;

    const solutionData: SolutionProps = {
      id: data.id,
      name: data.name,
      description: data.description,
      imageUrl: data.avatars?.[0].url,
      limit: 5,
      defaultView: 'preview',
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
      applicationCategories: data.applications.map(
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
      onInitialApplicationsLoad: async (solutionId, { limit }) => {
        return await fetchApplications({ solutionId, limit });
      },
      applicationUrlGenerator: (applicationId) =>
        `/applications/${applicationId}`,
      InstallButton: InstallButton,
      manufacturerSolutionsUrlGenerator: (manufacturerId, type) =>
        `companies/${manufacturerId}?category=${type}`,
      solutionUrlGenerator: (solutionId) => `/solutions/${solutionId}`,
      embeddingGenerator(solutionId) {
        return `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/l--a30OOf8k?si=qdLrk7g2qM7al6eD&id=${solutionId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;
      },
      developerApplicationsUrlGenerator: (developerId) =>
        `/developers/${developerId}`,
      onDispatchDeveloper: (developer) => {
        console.log(`Dispatched: `, developer);
      },
      onResetDeveloperDispatch: () => {
        console.log(`Reset Dispatch`);
      },
      createApplicationUrlGenerator: (solutionId) =>
        `/applications/create?solution-id=${solutionId}`,
    };
    return solutionData;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    console.log(err.message);
    return undefined;
  }
};

const fetchApplications = async ({
  solutionId,
  limit,
}: {
  solutionId: string;
  limit?: number;
}) => {
  const query = QueryString.stringify({
    mode: 'full',
    props: 'id,tag,developer,repository,manifest',
    limit,
    solution_id: solutionId,
  });
  const url = `https://solutions-api.carenuity.com/v1/binaries?${query}`;

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
    const offset = _data.data.offset;
    const data = _data.data.items;

    const applicationsData: ApplicationData[] = data.map(
      (application: {
        id: string;
        tag?: string;
        manifest: string;
        repository: string;
        developer: {
          id: string;
          first_name: string;
          last_name: string;
          occupation: string;
          image: string;
          social_handles: { id: string; url: string }[];
        };
      }): ApplicationData => {
        return {
          id: application.id,
          tag: application.tag,
          manifest: application.manifest,
          repository: application.repository,
          developer: {
            id: application.developer.id,
            name: `${application.developer.first_name} ${application.developer.last_name}`,
            subtitle: application.developer.occupation,
            avatar: application.developer.image,
            socialHandles: application.developer.social_handles.map(
              (handle) => ({
                id: handle.id,
                url: handle.url,
              })
            ),
          },
        };
      }
    );

    return { data: applicationsData, cursor: offset };
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    console.log(err.message);
    return {
      data: [],
    };
  }
};
