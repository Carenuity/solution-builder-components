import { SliderItem } from '../../../../common/Slider/index.types';

type ShieldManufacturer = {
  id: string;
  name: string;
  logo: string;
};

type SolutionGroupShield = {
  id: string;
  name: string;
  logo: string;
  manufacturer: ShieldManufacturer;
  shopUrl?: string;
};

type SolutionGroupEcosystem = {
  name: string;
  logo: string;
};

export type SolutionGroupPreviewProps = {
  name: string;
  applicationCategories: SliderItem[];
  sensor?: SolutionGroupShield;
  microcontroller: SolutionGroupShield;
  actuator?: SolutionGroupShield;
  ecosystem?: SolutionGroupEcosystem;
  contributors?: number;
  totalApplications?: number;
  rating?: number;
  shopUrl?: string;
  applicationUrlGenerator?: (applicationId: string) => string;
  manufacturerSolutionsUrlGenerator?: (
    manufacturerId: string,
    type: 'sensor' | 'micro-controller' | 'actuator'
  ) => string;
  viewport: { height: number };
};
