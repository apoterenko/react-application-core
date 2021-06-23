import * as React from 'react';
import * as R from 'ramda';
import { injectable } from 'inversify';
import { Store } from 'redux';
import { LoggerFactory } from 'ts-smart-logger';

import {
  DI_TYPES,
  lazyInject,
} from '../../../di';
import {
  ComponentClassesEnum,
  ErrorEventCategoriesEnum,
  IconClassesEnum,
  IDomAccessor,
  IEnvironment,
  IIconConfigEntity,
  ILogManager,
  IRouter,
  IRoutesEntity,
  IUiFactory,
  IUiIconFactory,
  IUiMessageConfigEntity,
  IUniversalStoreEntity,
  UiFactoryClassesEnum,
} from '../../../definition';
import { ISettingsEntity } from '../../../settings';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  getCurrentUrlPath,
  NvlUtils,
  PropsUtils,
  TypeUtils,
} from '../../../util';

@injectable()
export class UiFactory implements IUiFactory {
  private static readonly logger = LoggerFactory.makeLogger('UiFactory');
  private static readonly WIN_ERROR_ID = '$$windowErrorElement';

  @lazyInject(DI_TYPES.DomAccessor) protected readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Environment) protected readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.LogManager) protected readonly logManager: ILogManager;
  @lazyInject(DI_TYPES.Router) protected readonly router: IRouter;
  @lazyInject(DI_TYPES.Routes) protected readonly routes: IRoutesEntity;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Store) protected readonly store: Store<IUniversalStoreEntity>;
  @lazyInject(DI_TYPES.UiIconFactory) protected readonly uiIconFactory: IUiIconFactory;

  /**
   * @stable [07.10.2019]
   */
  constructor() {
    this.onRestartAndReload = this.onRestartAndReload.bind(this);
  }

  /**
   * @stable [17.12.2020]
   * @param cfg
   */
  public makeIcon(cfg: IIconConfigEntity | string): JSX.Element {
    if (R.isNil(cfg)) {
      return cfg;
    }
    const config = this.toIconConfig(cfg);
    const disabled = CalcUtils.calc(config.disabled);
    const className = CalcUtils.calc(config.className);
    const {
      onClick,
      ref,
      title,
      touched,
      type,
    } = config;

    return (
      <div
        ref={ref}
        title={title}
        className={
          ClsUtils.joinClassName(
            IconClassesEnum.ICON,
            TypeUtils.isFn(onClick) && (
              ClsUtils.joinClassName(IconClassesEnum.ACTION_ICON, `rac-action-${type}-icon`)
            ),
            disabled && IconClassesEnum.DISABLED_ICON,
            className,
          )
        }
        {...PropsUtils.buildClickHandlerProps(onClick, !disabled, NvlUtils.nvl(touched, false))}
      >
        {this.uiIconFactory.makeIcon(config)}
      </div>
    );
  }

  /**
   * @stable [28.11.2019]
   * @param {IUiMessageConfigEntity} cfg
   * @returns {React.ReactNode}
   */
  public makeMessage(cfg: IUiMessageConfigEntity): React.ReactNode {
    const {message, wrapper = true} = cfg;
    const body = (
      <div className={ClsUtils.joinClassName(...this.getMessageBodyClassNames(), cfg.className)}>
        {message}
      </div>
    );
    if (!wrapper) {
      return body;
    }
    return (
      <div className={ClsUtils.joinClassName(...this.getMessageClassNames(), cfg.wrapperClassName)}>
        {body}
      </div>
    );
  }

  /**
   * @stable [16.10.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  public makeWindowError(e: Error): Element {
    this.logError(ErrorEventCategoriesEnum.WINDOW_ERROR, e);
    UiFactory.logger.error('$[UiFactory][makeWindowError] Error:', e);

    const el = this.domAccessor.getElement(UiFactory.WIN_ERROR_ID);
    if (R.isNil(el)) {
      const errorMessageWrapperEl = this.domAccessor.createElement();
      const errorMessageEl = this.domAccessor.createElement('div', errorMessageWrapperEl);
      errorMessageEl.id = UiFactory.WIN_ERROR_ID;
      this.domAccessor.addClassNames(errorMessageWrapperEl, ...this.getErrorWrapperClassNames());
      this.domAccessor.addClassNames(errorMessageEl, ...this.getErrorClassNames());
      this.makeWindowErrorBodyElement(e, errorMessageEl);
      return errorMessageWrapperEl;
    } else {
      // Do nothing, because only one error is shown
      return el.parentElement;
    }
  }

  /**
   * @stable [24.12.2020]
   * @param e
   */
  public makeReactError(e: Error): React.ReactNode {
    this.logError(ErrorEventCategoriesEnum.REACT_ERROR, e);
    UiFactory.logger.error('$[UiFactory][makeReactError] Error:', e);

    return (
      <div
        className={ClsUtils.joinClassName(...this.getErrorWrapperClassNames())}
      >
        <div
          className={ClsUtils.joinClassName(...this.getErrorClassNames())}
        >
          {this.makeReactErrorBodyElement(e)}
        </div>
      </div>
    );
  }

  /**
   * @stable [16.10.2019]
   * @param {Error} e
   * @param {Element} parent
   */
  protected makeWindowErrorBodyElement(e: Error, parent: Element): void {
    this.makeWindowRestartActionElement(parent);

    const content = this.domAccessor.createElement('div', parent);
    content.textContent = this.buildErrorMessages(e).join('<br>');
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  protected makeReactErrorBodyElement(e: Error): JSX.Element {
    return (
      <React.Fragment>
        {this.makeReactRestartActionElement()}
        {this.getErrorMessagesElement(e)}
      </React.Fragment>
    );
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} error
   * @returns {string[]}
   */
  protected buildErrorMessages(error: Error): string[] {
    const messages = this.settings.messages;
    return [
      messages.SOMETHING_WENT_WRONG,
      messages.PLS_SEND_THIS_SCR_TO_SUPPORT_MANAGER,
      this.errorSystemInfoLine,
      `${messages.ERROR}: ${error.message}`,
      `${messages.DETAILS_INFO}: [${error.stack}]`
    ];
  }

  /**
   * @stable [07.10.2019]
   * @returns {string}
   */
  protected get errorSystemInfoLine(): string {
    const environment = this.environment;
    const messages = this.settings.messages;
    const user = this.store.getState().user;
    return [
      `${messages.ENVIRONMENT}: `,
      [
        ConditionUtils.ifNotNilThanValue(user, () => `${messages.USER} ${user.id}`),
        `${messages.BUILD} ${environment.appVersion}`,
        `${environment.browserName} ${environment.browserVersion}${environment.platformType}`,
        `${messages.PATH} ${getCurrentUrlPath()}`
      ].join(', ')
    ].join('');
  }

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {JSX.Element}
   */
  protected getErrorMessagesElement(e: Error): JSX.Element {
    return (
      <React.Fragment>
        {this.buildErrorMessages(e).map((v, index) => <div key={`error-` + index}>{v}</div>)}
      </React.Fragment>
    );
  }

  /**
   * @stable [28.11.2019]
   * @returns {string[]}
   */
  protected getMessageClassNames(): string[] {
    return [UiFactoryClassesEnum.MESSAGE, ComponentClassesEnum.FULL_SIZE, ComponentClassesEnum.FIXED];
  }

  /**
   * @stable [18.04.2020]
   * @returns {string[]}
   */
  protected getMessageBodyClassNames(): string[] {
    return [UiFactoryClassesEnum.MESSAGE_BODY, ComponentClassesEnum.ALIGNMENT_CENTER];
  }

  /**
   * @stable [07.10.2019]
   * @returns {string[]}
   */
  protected getErrorWrapperClassNames(): string[] {
    return ['rac-window-error-wrapper', ComponentClassesEnum.FULL_SIZE, ComponentClassesEnum.FIXED];
  }

  /**
   * @stable [07.10.2019]
   * @returns {string[]}
   */
  protected getErrorClassNames(): string[] {
    return ['rac-window-error', ComponentClassesEnum.ALIGNMENT_CENTER];
  }

  /**
   * @stable [16.10.2019]
   * @returns {JSX.Element}
   */
  protected makeReactRestartActionElement(): JSX.Element {
    return (
      <button
        {...PropsUtils.buildClickHandlerProps(this.onRestartAndReload)}
        className={ClsUtils.joinClassName(...this.getRestartActionClassName())}>
        {this.settings.messages.RESTART_APP}
      </button>
    );
  }

  /**
   * @stable [16.10.2019]
   * @param {Element} parent
   * @returns {Element}
   */
  protected makeWindowRestartActionElement(parent: Element): Element {
    const actionEl = this.domAccessor.createElement<HTMLButtonElement>('button', parent);
    this.domAccessor.addClassNames(actionEl, ...this.getRestartActionClassName());
    actionEl.textContent = this.settings.messages.RESTART_APP;
    actionEl.onclick = this.onRestartAndReload;
    return actionEl;
  }

  /**
   * @stable [07.10.2019]
   * @returns {string[]}
   */
  protected getRestartActionClassName(): string[] {
    return ['rac-window-error-restart-action'];
  }

  /**
   * In case of an out memory error, it would be better to reload the page
   * @stable [16.10.2019]
   */
  protected async onRestartAndReload(): Promise<void> {
    this.router.go(-this.router.length);

    try {
      await this.onBeforeReload();
    } catch (ignored) {
      // Do nothing
    }
    this.domAccessor.reload(true);
  }

  /**
   * @stable [29.11.2019]
   * @returns {Promise<void>}
   */
  protected async onBeforeReload(): Promise<void> {
    this.router.push(this.routes.logout);
  }

  /**
   * @stable [07.10.2019]
   * @param {ErrorEventCategoriesEnum} errorCategory
   * @param {Error} e
   */
  protected logError(errorCategory: ErrorEventCategoriesEnum, e: Error): void {
    this.logManager.send(errorCategory, e.name, {message: e.message, stack: e.stack});
  }

  /**
   * @stable [18.04.2020]
   * @param {IIconConfigEntity | string} cfg
   * @returns {IIconConfigEntity}
   */
  private toIconConfig(cfg: IIconConfigEntity | string): IIconConfigEntity {
    return (TypeUtils.isString(cfg) ? {type: cfg} : cfg)  as IIconConfigEntity;
  }
}
