import * as React from 'react';
import * as R from 'ramda';
import { injectable } from 'inversify';
import { Store } from 'redux';
import { LoggerFactory } from 'ts-smart-logger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faArrowAltCircleDown,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBarcode,
  faBars,
  faBriefcase,
  faCannabis,
  faChartLine,
  faChartPie,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faCloud,
  faCommentDots,
  faCubes,
  faEllipsisV,
  faEraser,
  faExchangeAlt,
  faExclamation,
  faExclamationCircle,
  faExclamationTriangle,
  faFileInvoiceDollar,
  faGift,
  faHistory,
  faHome,
  faInfo,
  faKey,
  faLock,
  faLongArrowAltLeft,
  faLongArrowAltRight,
  faLongArrowAltUp,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faMinus,
  faPaperclip,
  faPeopleCarry,
  faPercent,
  faPlus,
  faPrint,
  faQuestion,
  faSearch,
  faSearchMinus,
  faSearchPlus,
  faServer,
  faShieldAlt,
  faShippingFast,
  faSignInAlt,
  faSignOutAlt,
  faStop,
  faSync,
  faTabletAlt,
  faTag,
  faTags,
  faTimesCircle,
  faTruck,
  faTruckMoving,
  faUndo,
  faUnlockAlt,
  faUserClock,
  faUserEdit,
  faUsers,
  faUserShield,
  faUserTie,
  faVideo,
  faWarehouse,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCodepen,
  faGratipay,
  faAdversal,
} from '@fortawesome/free-brands-svg-icons';
import {
  faUserCircle,
  faCreditCard,
  faSave,
  faUser,
  faStopCircle,
  faArrowAltCircleRight as faArrowAltCircleRightRegular,
  faArrowAltCircleUp as faArrowAltCircleUpRegular,
  faComments as faCommentsRegular,
  faAddressCard,
  faHdd,
  faFileAlt,
  faCircle as faCircleRegular,
} from '@fortawesome/free-regular-svg-icons';

import {
  DI_TYPES,
  lazyInject,
} from '../../../di';
import {
  ComponentClassesEnum,
  ErrorEventCategoriesEnum,
  IconClassesEnum,
  IconsEnum,
  IDomAccessor,
  IEnvironment,
  IIconConfigEntity,
  ILogManager,
  IRouter,
  IRoutesEntity,
  IUiFactory,
  IUiMessageConfigEntity,
  IUniversalStoreEntity,
} from '../../../definition';
import { ISettingsEntity } from '../../../settings';
import {
  getCurrentUrlPath,
  handlerPropsFactory,
  ifNotNilThanValue,
  joinClassName,
} from '../../../util';
import {
  calc,
  isFn,
  isString,
  nvl,
} from '../../../util';
import { IUiDefaultIconFactory } from '../../icon';

@injectable()
export class UiFactory implements IUiFactory {
  private static readonly logger = LoggerFactory.makeLogger('UiFactory');
  private static readonly WIN_ERROR_ID = '$$windowErrorElement';
  private static readonly ICONS_MAP = {
    [IconsEnum.EXCLAMATION_TRIANGLE]: faExclamationTriangle,
    [IconsEnum.PAPERCLIP]: faPaperclip,
    [IconsEnum.PEOPLE_CARRY]: faPeopleCarry,
    [IconsEnum.PRINT]: faPrint,
    [IconsEnum.SEARCH_MINUS]: faSearchMinus,
    [IconsEnum.SEARCH_PLUS]: faSearchPlus,
    [IconsEnum.SIGN_OUT_ALT]: faSignOutAlt,
    [IconsEnum.SYNC]: faSync,
    add: faPlus,
    address_card: faAddressCard,
    adversal: faAdversal,
    angle_double_right: faAngleDoubleRight,
    angle_left: faAngleLeft,
    angle_right: faAngleRight,
    arrow_alt_circle_down: faArrowAltCircleDown,
    arrow_alt_circle_right_regular: faArrowAltCircleRightRegular,
    arrow_alt_circle_up_regular: faArrowAltCircleUpRegular,
    arrow_down: faArrowDown,
    arrow_left: faArrowLeft,
    arrow_right: faArrowRight,
    arrow_up: faArrowUp,
    barcode: faBarcode,
    category: faCodepen,
    chart_pie: faChartPie,
    check: faCheck,
    check_circle: faCheckCircle,
    circle_regular: faCircleRegular,
    clear_all: faEraser,
    cloud: faCloud,
    comments_regular: faCommentsRegular,
    dashboard: faChartLine,
    done: faCheck,
    done_all: faCheckDouble,
    error: faExclamationCircle,
    exchange: faExchangeAlt,
    exclamation: faExclamation,
    exclamation_circle: faExclamationCircle,
    file: faFileAlt,
    file_invoice_dollar: faFileInvoiceDollar,
    gift: faGift,
    group: faUsers,
    hdd: faHdd,
    history: faHistory,
    home: faHome,
    http: faExchangeAlt,
    info: faInfo,
    key: faKey,
    local_offer: faTag,
    location: faMapMarkerAlt,
    location_on: faMapMarkerAlt,
    lock: faLock,
    long_arrow_alt_left: faLongArrowAltLeft,
    long_arrow_alt_right: faLongArrowAltRight,
    long_arrow_alt_up: faLongArrowAltUp,
    loyalty: faGratipay,
    map_marked_alt: faMapMarkedAlt,
    map_marker_alt: faMapMarkerAlt,
    menu: faBars,
    minus: faMinus,
    more_vert: faEllipsisV,
    payment: faCreditCard,
    percent: faPercent,
    plus: faPlus,
    product: faCannabis,
    question: faQuestion,
    remove: faMinus,
    router: faServer,
    save: faSave,
    search: faSearch,
    shield_alt: faShieldAlt,
    shipping_fast: faShippingFast,
    signIn: faSignInAlt,
    sms: faCommentDots,
    spa: faCannabis,
    stop: faStop,
    stop_circle: faStopCircle,
    tablet_alt: faTabletAlt,
    tags: faTags,
    times_circle: faTimesCircle,
    truck: faTruck,
    truck_moving: faTruckMoving,
    undo: faUndo,
    unlock_alt: faUnlockAlt,
    user: faUser,
    user_circle: faUserCircle,
    user_clock: faUserClock,
    user_edit: faUserEdit,
    user_shield: faUserShield,
    user_tie: faUserTie,
    verified_user: faShieldAlt,
    video: faVideo,
    warehouse: faWarehouse,
    widgets: faCubes,
    work: faBriefcase,
  };

  @lazyInject(DI_TYPES.DomAccessor) protected readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Environment) protected readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.LogManager) protected readonly logManager: ILogManager;
  @lazyInject(DI_TYPES.Router) protected readonly router: IRouter;
  @lazyInject(DI_TYPES.Routes) protected readonly routes: IRoutesEntity;
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Store) protected readonly store: Store<IUniversalStoreEntity>;
  @lazyInject(DI_TYPES.UiIconFactory) protected readonly uiDefaultIconFactory: IUiDefaultIconFactory;

  private readonly alternativeIconCtors = new Map<string, JSX.Element>();

  /**
   * @stable [07.10.2019]
   */
  constructor() {
    this.onRestartAndReload = this.onRestartAndReload.bind(this);
  }

  /**
   * @stable [18.04.2020]
   * @param {IIconConfigEntity | string} cfg
   * @returns {JSX.Element}
   */
  public makeIcon(cfg: IIconConfigEntity | string): JSX.Element {
    if (R.isNil(cfg)) {
      return cfg;
    }
    const config = this.toIconConfig(cfg);

    return (
      <div
        ref={config.ref}
        title={config.title as string}
        className={joinClassName(
          IconClassesEnum.ICON,
          isFn(config.onClick) && (
            joinClassName(
              IconClassesEnum.ACTION_ICON,
              `rac-action-${config.type}-icon`
            )
          ),
          config.disabled && IconClassesEnum.DISABLED_ICON,
          calc(config.className),
        )}
        {...handlerPropsFactory(config.onClick, !config.disabled, nvl(config.touched, false))}
      >
        {this.uiDefaultIconFactory.makeInstance(config.type) || this.getAlternativeIconCtor(config)}
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
      <div className={joinClassName(...this.getMessageBodyClassNames(), cfg.className)}>
        {message}
      </div>
    );
    if (!wrapper) {
      return body;
    }
    return (
      <div className={joinClassName(...this.getMessageWrapperClassNames(), cfg.wrapperClassName)}>
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
   * @stable [02.12.2019]
   * @param {Error} e
   * @param {boolean} logging
   * @returns {React.ReactNode}
   */
  public makeReactError(e: Error, logging?: boolean): React.ReactNode {
    if (logging !== false) {
      this.logError(ErrorEventCategoriesEnum.REACT_ERROR, e);
      UiFactory.logger.error('$[UiFactory][makeReactError] Error:', e);
    }

    return (
      <div className={joinClassName(...this.getErrorWrapperClassNames())}>
        <div className={joinClassName(...this.getErrorClassNames())}>
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
        ifNotNilThanValue(user, () => `${messages.USER} ${user.id}`),
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
  protected getMessageWrapperClassNames(): string[] {
    return ['rac-message-wrapper', ComponentClassesEnum.FULL_SIZE, ComponentClassesEnum.FIXED];
  }

  /**
   * @stable [18.04.2020]
   * @returns {string[]}
   */
  protected getMessageBodyClassNames(): string[] {
    return ['rac-message-body', ComponentClassesEnum.ALIGNMENT_CENTER];
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
        {...handlerPropsFactory(this.onRestartAndReload)}
        className={joinClassName(...this.getRestartActionClassName())}>
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
   * @param {IIconConfigEntity} config
   * @returns {JSX.Element}
   */
  private getAlternativeIconCtor(config: IIconConfigEntity): JSX.Element {
    const icon = UiFactory.ICONS_MAP[config.type] || faQuestion;

    let iconCtor = this.alternativeIconCtors.get(icon);
    if (R.isNil(iconCtor)) {
      this.alternativeIconCtors.set(icon, iconCtor = <FontAwesomeIcon icon={icon}/>);
    }
    return iconCtor;
  }

  /**
   * @stable [18.04.2020]
   * @param {IIconConfigEntity | string} cfg
   * @returns {IIconConfigEntity}
   */
  private toIconConfig(cfg: IIconConfigEntity | string): IIconConfigEntity {
    return (isString(cfg) ? {type: cfg} : cfg)  as IIconConfigEntity;
  }
}
