export interface IApplicationSettings {
  apiUrl?: string;
  companyName?: string;
  usePersistence?: boolean;
}

export const DEFAULT_APPLICATION_SETTINGS: IApplicationSettings = {
  usePersistence: true,
  apiUrl: '/api',
  companyName: 'Test company',
};
