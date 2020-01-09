import { AnyT } from '../definitions.interface';

/**
 * @stable [28.08.2019]
 */
export enum EnvironmentGlobalVariablesEnum {
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
  safariPlatform?: boolean;
  window?: Window;
  windowsPhonePlatform?: boolean;
  windowsPlatform?: boolean;
  setVariable?(name: string, scope: AnyT): void;
}
