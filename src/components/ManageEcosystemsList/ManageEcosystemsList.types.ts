import { TableProps, GetProp } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { Avatar } from '../../utils/types.utils';

export type EcosystemsListColumnsType<T extends object = object> =
  TableProps<T>['columns'];

type TablePaginationConfig = Exclude<
  GetProp<TableProps, 'pagination'>,
  boolean
>;

export interface EcosystemsListDataType {
  id: string;
  name: string;
  avatars: Avatar[];
}

export interface ManageEcosystemsListPropsCallbacks {
  deleteDispatch?: (formData: FormData) => void | Promise<void>;
  editUrlCallback?: (id: string) => string;
  editAvatarCallback?: (id: string) => string;
  editBannerCallback?: (id: string) => string;
}

export interface ManageEcosystemsListProps
  extends ManageEcosystemsListPropsCallbacks {
  url: string;
  limit: number;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sortField?: SorterResult<any>['field'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
  offset?: string;
  //   limit?: number;
}
