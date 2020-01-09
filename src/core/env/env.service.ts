import { injectable } from 'inversify';
import * as P from 'platform';
import { LoggerFactory } from 'ts-smart-logger';

import { AnyT } from '../definitions.interface';
import { ENV } from './env.interface';
import { getCurrentUrlPath } from '../util';
import { IEnvironment } from '../definition';

@injectable()
export class Environment implements IEnvironment {
  private static readonly logger = LoggerFactory.makeLogger('Environment');

  public readonly appProfile = ENV.appProfile;
  public readonly appVersion = ENV.appVersion;
  public readonly basePath = ENV.basePath;
  public readonly document = ENV.document;
  public readonly host = ENV.host;
  public readonly prodMode = ENV.prodMode;
  public readonly window = ENV.window;

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
    Environment.logger.info(`[$Environment] ${JSON.stringify(payload)}`);
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
   * @stable [08.10.2019]
   * @returns {string}
   */
  public get platformVersion(): string {
    return this.ios13Platform ? '13.x' : P.os.version;
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
    return this.isMacPlatform && this.safariPlatform && 'ontouchstart' in this.window;
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
