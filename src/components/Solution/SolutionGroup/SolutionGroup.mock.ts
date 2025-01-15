import QueryString from 'qs';
import { generateApplicationsData } from '../../Applications/ApplicationList/ApplicationsList.mock';
import { InstallButton } from '../../Applications/ApplicationList/ApplicationsList.stories';
import { ApplicationData } from '../../Applications/ApplicationList/ApplicationsList.types';
import { sliderProps } from '../../common/Slider/index.mock';
import { SolutionGroupProps } from './SolutionGroup.types';
import { SolutionGroupData } from '../SolutionGroupList/SolutionGroupList.types';

const sensorImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fiot_component%252Favatars%252FBw2OFYjZDgrDmFmRhC3B%252F1719586250894_S_BMP180.png%3Falt%3Dmedia%26token%3Da056fd8d-65c6-4e40-8b5a-977c3f1b205a&w=256&q=75`;
const boardImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fiot_component%252Favatars%252F4OQQy4edGswvbN6boCKw%252F1719656936332_c3-mini_carenuity.png%3Falt%3Dmedia%26token%3D054555e4-e04b-466f-aef7-1c257c533b33&w=256&q=75`;
const actuatorImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fiot_component%252Favatars%252Fb0A3sJ4VNoi9brJB7eR4%252F1719585948570_OLED.png%3Falt%3Dmedia%26token%3Dbb2567e3-2ea8-40bf-b365-162cb1a64905&w=256&q=75`;
const ecosystemImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fecosystem%252Favatars%252FmxPH5kGodhJBicKPFXwx%252F1719573578337_Cloudfree_Profile-Preview_transp.PNG%3Falt%3Dmedia%26token%3D01a79023-fedd-4b0c-a758-b6a08019890d&w=32&q=75`;
const companyImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fcompany%252Favatars%252FZpPTBErPqSiOwSxON6t5%252F1719655090636_carenuity.png%3Falt%3Dmedia%26token%3D41ced7d7-4d43-4e3f-9bc3-d3d441fa8e73&w=384&q=75`;
const solutionImage =
  'https://firebasestorage.googleapis.com/v0/b/solution-builder-421307.appspot.com/o/images%2Fsolution_template%2Favatars%2F0Y4yJH5yr1JXd5PCjQih%2F1727429801621_HP303B_ESP32-Mini_0.66-OLED_cloudfree.png?alt=media&token=baa223ba-0ecd-41a9-8d4b-604b36b9b326';
// 'https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fsolution_template%252Favatars%252FeieQlkAmwh1LUePfYXmW%252F1723542605619_SGP30_C3-Mini_0.66-OLED_couldfree.png%3Falt%3Dmedia%26token%3D47a6d73a-8f26-4659-bbd0-3f5ec4a90979&w=640&q=75';

export const generateSolutionGroupData = ({
  id,
}: {
  id: number;
}): SolutionGroupData => ({
  id: String(id),
  tags: sliderProps.items,
  name: `Air-Quality-Meter: Air Quality (VOCs, CO2 and Humidity) by SGP30
                (SENSIRION) - C3-Mini`,
  imageUrl: solutionImage,
  sensor: {
    name: 'BMP180',
    id: '2',
    logo: sensorImage,
    shopUrl: '#',
    manufacturer: { id: '1', logo: companyImage, name: 'Carenuity' },
  },
  microcontroller: {
    name: 'C3-Mini',
    id: '1',
    logo: boardImage,
    shopUrl: '#',
    manufacturer: { id: '1', logo: companyImage, name: 'Carenuity' },
  },
  actuator: {
    name: '0.66 OLED',
    id: '3',
    logo: actuatorImage,
    shopUrl: '#',
    manufacturer: { id: '1', logo: companyImage, name: 'Carenuity' },
  },
  ecosystem: {
    name: 'Cloudfree Applications',
    logo: ecosystemImage,
  },
  contributors: 10,
  rating: 5,
  totalApplications: 20,
  shopUrl: '#',
  description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium voluptatum consequuntur sit inventore explicabo maxime excepturi nihil iure eum dolorum rerum cum iusto nemo, itaque ea quaerat culpa a aspernatur impedit ut eaque possimus libero aliquid. Dolor architecto, vel harum quaerat distinctio pariatur quisquam asperiores eaque odio rem tempora quia consequatur expedita voluptatibus nam recusandae alias modi minus minima adipisci perferendis ad corrupti consectetur dignissimos! Rerum illum saepe quos dolorum accusamus doloribus provident cum nemo, deleniti fugiat sint incidunt amet similique harum numquam praesentium sit rem quia, eos molestias libero, explicabo iure consequuntur eaque. Quibusdam commodi saepe ipsa deserunt expedita perferendis, quis maxime molestiae nesciunt consectetur eius corrupti, libero tempora sint. Aspernatur tempore provident hic eligendi deleniti, earum eveniet aut voluptatum amet unde. Delectus neque hic, harum, nostrum commodi culpa voluptas repellat possimus, corrupti eveniet ducimus! Provident culpa doloribus eveniet nihil minus cupiditate beatae iste esse totam libero. Ipsa, adipisci!`,
});

export const defaultSolutionData: SolutionGroupProps = {
  defaultView: 'preview',
  ...generateSolutionGroupData({ id: 1 }),
  tagUrlGenerator: (id) => `/applications/${id}`,
  manufacturerSolutionsUrlGenerator: (id, type) => {
    switch (type) {
      case 'sensor':
        return `sensors/${id}`;

      case 'micro-controller':
        return `boards/${id}`;

      case 'actuator':
        return `actuators/${id}`;
    }
  },
  solutionUrlGenerator: (solutionId) =>
    `https://solutions.carenuity.com/solutions/${solutionId}`,
  embeddingGenerator: (solutionId) => {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/l--a30OOf8k?si=qdLrk7g2qM7al6eD&id=${solutionId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  },
  limit: 5,
  InstallButton: InstallButton,
  onInitialApplicationsLoad: async (solutionId, { limit }) => {
    const data = generateApplicationsData({ count: limit, page: 0 });
    return { data, cursor: String(data.length) };
  },
  createApplicationUrlGenerator: (solutionId) =>
    `/${solutionId}/applications/create`,
  onDispatchDeveloper: ({ name }) => {
    // alert(name);
    console.log(name);
  },
  onResetDeveloperDispatch() {
    setTimeout(() => {
      console.log('Developer reset');
    }, 100);
  },
  developerApplicationsUrlGenerator: (developerId) =>
    `/developers/${developerId}`,
};

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

    const solutionData: SolutionGroupProps = {
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
      tags: data.applications.map(
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
      tagUrlGenerator: (applicationId) => `/applications/${applicationId}`,
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
    return defaultSolutionData;
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
