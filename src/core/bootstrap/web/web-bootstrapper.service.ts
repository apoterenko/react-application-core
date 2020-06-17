import { injectable } from 'inversify';

import {
  appendUrlArgs,
  ConditionUtils,
  nvl,
  orNull,
  TypeUtils,
} from '../../util';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  AsyncLibsEnum,
  ComponentClassesEnum,
  EventsEnum,
  IAsyncLibConfigEntity,
  IAsyncLibManager,
  IBootstrapper,
  IDomAccessor,
  IEnvironment,
  IEventManager,
  IUiFactory,
} from '../../definition';
import {
  IBootstrapSettings,
  ISettingsEntity,
} from '../../settings';
import { AnyT } from '../../definitions.interface';

@injectable()
export class WebBootstrapper implements IBootstrapper {
  @lazyInject(DI_TYPES.AsyncLibManager) private readonly asyncLibManager: IAsyncLibManager;
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.UiFactory) private readonly uiFactory: IUiFactory;

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

    ConditionUtils.ifNotNilThanValue(
      nvl(asyncLibraries, googleMapsKey),
      () => {
        ConditionUtils.ifNotNilThanValue(
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
      orNull(this.bSettings.flexEnabled, 'rac-flex') // TODO Drop later
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

      if (TypeUtils.isFn(this.window.ga)) {
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
      ComponentClassesEnum.RAC,
      environment.appProfile,
      environment.mobilePlatform ? ComponentClassesEnum.MOBILE : ComponentClassesEnum.DESKTOP,
      orNull(environment.androidPlatform, ComponentClassesEnum.ANDROID),
      orNull(environment.iosPlatform, ComponentClassesEnum.IOS),
      orNull(environment.macPlatform, ComponentClassesEnum.MAC),
      orNull(environment.chromePlatform, ComponentClassesEnum.CHROME),
      orNull(environment.safariPlatform, ComponentClassesEnum.SAFARI),
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
