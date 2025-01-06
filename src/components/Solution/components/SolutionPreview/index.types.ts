import { SliderItem } from '../../../common/Slider/index.types';

type ShieldManufacturer = {
  id: string;
  name: string;
  logo: string;
};

type SolutionShield = {
  id: string;
  name: string;
  logo: string;
  manufacturer: ShieldManufacturer;
  shopUrl?: string;
};

type SolutionEcosystem = {
  name: string;
  logo: string;
};

export type SolutionPreviewProps = {
  name: string;
  applicationCategories: SliderItem[];
  sensor?: SolutionShield;
  microcontroller: SolutionShield;
  actuator?: SolutionShield;
  ecosystem?: SolutionEcosystem;
  contributors?: number;
  totalApplications?: number;
  rating?: number;
  shopUrl?: string;
  setApplicationPageUrl?: (applicationId: string) => string;
  setManufacturerSolutionsPageUrl?: (
    manufacturerId: string,
    type: 'sensor' | 'micro-controller' | 'actuator'
  ) => string;
  viewport: { height: number };
};
