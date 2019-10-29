import { injectable } from 'inversify';

import { orNull, isFn } from '../../util';
import { DI_TYPES, lazyInject } from '../../di';
import {
  EventsEnum,
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
import { IUIFactory } from '../../component/factory/factory.interface'; // TODO Fix import

@injectable()
export class WebBootstrapper implements IBootstrapper {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.UIFactory) private readonly uiFactory: IUIFactory;

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
    this.domAccessor.defineGlobalErrorHandler((e) => this.uiFactory.makeWindowErrorElement(e));
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
