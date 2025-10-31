export type ApplicationMetadata = {
  id?: string;
  tag?: string;
  application_id?: string;
  ecosystem_id?: string;
  repository?: string;
};

export type IHandleUpdateApplicationDetails = {
  id: string;
  application_id?: string;
  ecosystem_id?: string;
  repository?: string;
  tag?: string;
  access_token: string;
  signal: AbortSignal;
};

export type IEditApplicationMetadata = {
  applicationId: string;
  accessToken: string;
};
