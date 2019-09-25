/**
 * @stable [28.08.2019]
 */
export enum EnvironmentVariablesEnum {
  TRANSPORT = '$$transport',
}

/**
 * @stable [11.09.2019]
 */
export interface IEnvironmentOs {
  architecture: number;
  family: string;
  version: string;
}

/**
 * @stable [11.09.2019]
 */
export interface IEnvironment {
  androidPlatform: boolean;
  appNamespace: string;
  appProfile: string;
  basePath: string;
  browserVersion: string;
  chromePlatform: boolean;
  document: Document;
  documentClickEvent: string;
  iosPlatform: boolean;
  macPlatform: boolean;
  mobilePlatform: boolean;
  platformOs: IEnvironmentOs;
  safariPlatform: boolean;
  window: Window;
  windowsPhonePlatform: boolean;
  windowsPlatform: boolean;
}
