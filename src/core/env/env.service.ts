import { injectable } from 'inversify';
import * as P from 'platform';
import { LoggerFactory } from 'ts-smart-logger';

import {
  AnyT,
  IKeyValue,
} from '../definitions.interface';
import {
  getCurrentUrlPath,
  getFullPath,
  getSectionFullPath,
  JsonUtils,
  UrlUtils,
} from '../util';
import {
  DefaultEntities,
  EnvironmentGlobalVariablesEnum,
  IEnvironment,
} from '../definition';

@injectable()
export class Environment implements IEnvironment {
  private static readonly logger = LoggerFactory.makeLogger('Environment');

  public readonly appProfile = DefaultEntities.ENVIRONMENT_ENTITY.appProfile;
  public readonly appVersion = DefaultEntities.ENVIRONMENT_ENTITY.appVersion;
  public readonly basePath = DefaultEntities.ENVIRONMENT_ENTITY.basePath;
  public readonly devMode = DefaultEntities.ENVIRONMENT_ENTITY.devMode;
  public readonly document = DefaultEntities.ENVIRONMENT_ENTITY.document;
  public readonly host = DefaultEntities.ENVIRONMENT_ENTITY.host;
  public readonly normalizedBasePath = DefaultEntities.ENVIRONMENT_ENTITY.normalizedBasePath;
  public readonly port = DefaultEntities.ENVIRONMENT_ENTITY.port;
  public readonly prodMode = DefaultEntities.ENVIRONMENT_ENTITY.prodMode;
  public readonly window = DefaultEntities.ENVIRONMENT_ENTITY.window;

  /**
   * @stable [08.10.2019]
   */
  constructor() {
    const payload: IEnvironment = {
      androidPlatform: this.androidPlatform,
      appNamespace: this.appNamespace,
      browserName: this.browserName,
      browserVersion: this.browserVersion,
      chromePlatform: this.chromePlatform,
      googleKey: this.googleKey,
      ios13Platform: this.ios13Platform,
      iosPlatform: this.iosPlatform,
      macPlatform: this.macPlatform,
      mobilePlatform: this.mobilePlatform,
      passwordPlaceholder: this.passwordPlaceholder,
      platformName: this.platformName,
      platformType: this.platformType,
      platformVersion: this.platformVersion,
      safariPlatform: this.safariPlatform,
      windowsPhonePlatform: this.windowsPhonePlatform,
      windowsPlatform: this.windowsPlatform,
    };
    Environment.logger.info(`[$Environment] ${JsonUtils.formatJson(payload)}`);

    this.setVariable(EnvironmentGlobalVariablesEnum.ENVIRONMENT, this);
  }

  /**
   * @stable [09.01.2020]
   * @returns {string}
   */
  public get googleMapsKey(): string {
    return process.env.GOOGLE_MAPS_KEY;
  }

  /**
   * @stable [19.12.2019]
   * @returns {string}
   */
  public get path(): string {
    return getCurrentUrlPath();
  }

  /**
   * @stable [13.03.2020]
   * @returns {string}
   */
  public get fullPath(): string {
    return getFullPath();
  }

  /**
   * @stable [08.10.2019]
   * @returns {string}
   */
  public get platformType(): string {
    return this.mobilePlatform ? 'M' : 'D';
  }

  /**
   * @stable [08.10.2019]
   * @returns {string}
   */
  public get appNamespace(): string {
    return process.env.APP_NAMESPACE;
  }

  /**
   * @stable [08.10.2019]
   * @returns {string}
   */
  public get googleKey(): string {
    return process.env.GOOGLE_KEY;
  }

  /**
   * @stable [08.10.2019]
   * @returns {string}
   */
  public get browserVersion(): string {
    return String(P.version);
  }

  /**
   * @stable [08.10.2019]
   * @returns {string}
   */
  public get browserName(): string {
    return P.name;
  }

  /**
   * @stable [27.01.2021]
   */
  public get platformVersion(): string {
    return this.ios13Platform
      ? `13.x,14.x,.. (${P.os.version})`
      : P.os.version;
  }

  /**
   * @stable [08.10.2019]
   * @returns {string}
   */
  public get platformName(): string {
    return this.ios13Platform ? 'iOS' : this.osFamily;
  }

  /**
   * @stable [08.10.2019]
   * @returns {string}
   */
  public get passwordPlaceholder(): string {
    return this.safariPlatform && this.iosPlatform ? '●' : '•';
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public get mobilePlatform(): boolean {
    return this.androidPlatform || this.iosPlatform || this.windowsPhonePlatform;
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public get windowsPhonePlatform(): boolean {
    return this.osFamily === 'Windows Phone';
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public get safariPlatform(): boolean {
    return this.browserName === 'Safari';
  }

  /**
   * @stable [21.01.2020]
   * @returns {boolean}
   */
  public get safariMobilePlatform(): boolean {
    return this.browserName === 'Safari Mobile';
  }

  /**
   * @stable [21.01.2020]
   * @returns {boolean}
   */
  public get safariOrSafariMobilePlatform(): boolean {
    return this.safariMobilePlatform || this.safariPlatform;
  }

  /**
   * @stable [16.01.2020]
   * @returns {boolean}
   */
  public get touchedPlatform(): boolean {
    return 'ontouchstart' in this.window;
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public get chromePlatform(): boolean {
    return this.browserName === 'Chrome';
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public get windowsPlatform(): boolean {
    return this.osFamily === 'Windows';
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public get macPlatform(): boolean {
    return this.isMacPlatform && !this.ios13Platform;
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public get androidPlatform(): boolean {
    return this.osFamily === 'Android';
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public get ios13Platform(): boolean {
    return this.isMacPlatform && this.safariOrSafariMobilePlatform && this.touchedPlatform;
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public get iosPlatform(): boolean {
    return this.osFamily === 'iOS' || this.ios13Platform;
  }

  /**
   * @stable [08.10.2019]
   * @param {string} name
   * @param {AnyT} scope
   */
  public setVariable(name: string, scope: AnyT): void {
    Reflect.set(this.window, name, scope);
  }

  /**
   * @stable [13.03.2020]
   * @param {string} sectionRoute
   * @returns {string}
   */
  public getSectionFullPath(sectionRoute: string): string {
    return getSectionFullPath(sectionRoute);
  }

  /**
   * @stable [30.06.2021]
   */
  public asUrlQueryParams<TParams = IKeyValue>(): TParams {
    return UrlUtils.asUrlQueryParams();
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  private get isMacPlatform(): boolean {
    return this.osFamily === 'OS X';
  }

  /**
   * @stable [08.10.2019]
   * @returns {string}
   */
  private get osFamily(): string {
    return P.os.family;
  }
}
