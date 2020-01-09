import { injectable } from 'inversify';

import {
  appendUrlArgs,
  ifNotNilThanValue,
  isFn,
  nvl,
  orNull,
} from '../../util';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  AsyncLibsEnum,
  EventsEnum,
  IAsyncLibConfigEntity,
  IAsyncLibManager,
  IBootstrapper,
  IDomAccessor,
  IEnvironment,
  IEventManager,
} from '../../definition';
import {
  IBootstrapSettings,
  ISettingsEntity,
} from '../../settings';
import { AnyT } from '../../definitions.interface';
import { IUIFactory } from '../../component/factory/factory.interface';  // TODO Fix import

@injectable()
export class WebBootstrapper implements IBootstrapper {
  @lazyInject(DI_TYPES.AsyncLibManager) private readonly asyncLibManager: IAsyncLibManager;
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.UIFactory) private readonly uiFactory: IUIFactory;

  private readonly asyncLibraries = new Map<string, IAsyncLibConfigEntity>();

  /**
   * @stable [09.01.2020]
   */
  constructor() {
    const {
      asyncLibraries,
      googleMaps,
    } = this.settings;
    const googleMapsKey = this.environment.googleMapsKey;

    ifNotNilThanValue(
      nvl(asyncLibraries, googleMapsKey),
      () => {
        ifNotNilThanValue(
          asyncLibraries.googleMaps,
          (googleMapsLibCfg) => {
            this.registerAsyncLibrary({
              url: appendUrlArgs(
                googleMapsLibCfg,
                {
                  key: googleMapsKey,
                  libraries: googleMaps.libraries,
                },
              ),
              alias: AsyncLibsEnum.GOOGLE_MAPS,
            });
          }
        );
      }
    );
  }

  /**
   * @stable [09.01.2020]
   * @param {IAsyncLibConfigEntity} cfg
   * @returns {IBootstrapper}
   */
  public registerAsyncLibrary(cfg: IAsyncLibConfigEntity): IBootstrapper {
    this.asyncLibraries.set(cfg.alias || cfg.url, cfg);
    return this;
  }

  /**
   * @stable [01.10.2019]
   * @param {() => void} callback
   */
  public init(callback: (() => void)): void {
    const environment = this.environment;
    const document = environment.document;

    const ready = () => {
      this.applyClasses();
      this.addRootElement();
      callback();
    };

    this.initGA();
    this.initErrorHandler();
    this.initAsyncLibraries();

    switch (document.readyState) {
      case 'loading':
      case 'interactive':
        // We cannot use DOMContentLoaded because fonts loading and UI blinking
        this.eventManager.add(environment.window, EventsEnum.LOAD, ready);
        break;
      case 'complete':
        ready();
        break;
    }
  }

  /**
   * @stable [01.10.2019]
   */
  protected addRootElement(): void {
    this.domAccessor.addClassNames(
      this.domAccessor.addRootElement(),
      orNull(this.bSettings.flexEnabled, 'rac-flex')
    );
  }

  /**
   * @stable [01.10.2019]
   */
  protected initErrorHandler(): void {
    this.domAccessor.defineGlobalErrorHandler((e) => this.uiFactory.makeWindowError(e));
  }

  /**
   * @stable [01.10.2019]
   */
  protected initGA(): void {
    const environment = this.environment;
    if (environment.prodMode && environment.googleKey) {
      this.gtag('js', new Date());
      this.gtag('config', environment.googleKey);

      if (isFn(this.window.ga)) {
        this.window.ga('create', environment.googleKey, 'auto');
      }
    }
  }

  /**
   * @stable [09.01.2020]
   */
  protected initAsyncLibraries(): void {
    this.asyncLibraries.forEach((cfg) => this.asyncLibManager.registerLib(cfg));
  }

  /**
   * @stable [01.10.2019]
   */
  protected applyClasses(): void {
    const environment = this.environment;
    const document = environment.document;

    this.domAccessor.addClassNames(
      document.body,
      'rac',
      environment.appProfile,
      environment.mobilePlatform ? 'rac-mobile' : 'rac-desktop',
      orNull(environment.androidPlatform, 'rac-android'),
      orNull(environment.iosPlatform, 'rac-ios'),
      orNull(environment.macPlatform, 'rac-mac'),
      orNull(environment.safariPlatform, 'rac-safari'),
    );
  }

  /**
   * @stable [01.10.2019]
   * @param args
   */
  private gtag(...args: AnyT[]): void {
    const dL = this.window.dataLayer = this.window.dataLayer || [];
    dL.push(arguments);
  }

  /**
   * @stable [@stable [01.10.2019]]
   * @returns {IBootstrapSettings}
   */
  private get bSettings(): IBootstrapSettings {
    return this.settings.bootstrap || {};
  }

  /**
   * @stable [01.10.2019]
   * @returns {Window}
   */
  private get window(): Window {
    return this.environment.window;
  }
}
