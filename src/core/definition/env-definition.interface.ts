import {
  AnyT,
  IKeyValue,
} from '../definitions.interface';

/**
 * @stable [28.08.2019]
 */
export enum EnvironmentGlobalVariablesEnum {
  DATE_CONVERTER = '$$dateConverter',
  ENVIRONMENT = '$$env',
  TRANSPORT = '$$transport',
}

/**
 * @stable [11.09.2019]
 */
export interface IEnvironment {
  androidPlatform?: boolean;
  appNamespace?: string;
  appProfile?: string;
  appVersion?: string;
  basePath?: string;
  browserName?: string;
  browserVersion?: string;
  chromePlatform?: boolean;
  document?: Document;
  googleKey?: string;
  googleMapsKey?: string;
  host?: string;
  ios13Platform?: boolean;
  iosPlatform?: boolean;
  macPlatform?: boolean;
  mobilePlatform?: boolean;
  passwordPlaceholder?: string;
  path?: string;
  platformName?: string;
  platformType?: string;
  platformVersion?: string;
  prodMode?: boolean;
  safariMobilePlatform?: boolean;
  safariOrSafariMobilePlatform?: boolean;
  safariPlatform?: boolean;
  touchedPlatform?: boolean;
  window?: Window;
  windowsPhonePlatform?: boolean;
  windowsPlatform?: boolean;
  getSectionFullPath?(sectionRoute: string): string;
  getUrlQueryParams?<TParams = IKeyValue>(): TParams;
  setVariable?(name: string, scope: AnyT): void;
}
