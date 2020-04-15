import * as React from 'react';
import { injectable } from 'inversify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
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
  faBinoculars,
  faBriefcase,
  faCannabis,
  faChartLine,
  faChartPie,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faChevronLeft,
  faChevronRight,
  faClipboardCheck,
  faCloud,
  faCommentDots,
  faCubes,
  faEllipsisV,
  faEraser,
  faExchangeAlt,
  faExclamation,
  faExclamationCircle,
  faExclamationTriangle,
  faEye,
  faFileImport,
  faFileInvoiceDollar,
  faGift,
  faGripHorizontal,
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
  faMoneyBill,
  faPaperclip,
  faPeopleCarry,
  faPercent,
  faPhone,
  faPlug,
  faPlus,
  faPowerOff,
  faPrint,
  faQuestion,
  faRetweet,
  faSearch,
  faSearchMinus,
  faSearchPlus,
  faServer,
  faShieldAlt,
  faShippingFast,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faStop,
  faSync,
  faTabletAlt,
  faTag,
  faTags,
  faTaxi,
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
  faHouzz,
  faCodepen,
  faGratipay,
  faAdversal,
} from '@fortawesome/free-brands-svg-icons';
import {
  faUserCircle,
  faCreditCard,
  faSave,
  faUser,
  faEnvelope,
  faStopCircle,
  faArrowAltCircleRight as faArrowAltCircleRightRegular,
  faArrowAltCircleUp as faArrowAltCircleUpRegular,
  faComments as faCommentsRegular,
  faThumbsUp,
  faIdCard,
  faAddressCard,
  faPlayCircle as faPlayCircleRegular,
  faHdd,
  faFileAlt,
  faSmileBeam,
  faCircle as faCircleRegular,
  faHeart as faHeartRegular,
} from '@fortawesome/free-regular-svg-icons';
import { LoggerFactory } from 'ts-smart-logger';

import {
  calc,
  handlerPropsFactory,
  isFn,
  isString,
  joinClassName,
  nvl,
} from '../../../util';
import { IUIFactory } from '../../factory';
import { IUIIconConfiguration } from '../../../configurations-definitions.interface';
import {
  DI_TYPES,
  lazyInject,
} from '../../../di';
import { IUiDefaultIconFactory } from '../../icon';
import {
  IconsEnum,
  IUniversalUiMessageConfigEntity,
  TranslatorT,
} from '../../../definition';

@injectable()
export class UIMaterialFactory implements IUIFactory {

  public static ICONS_MAP = {
    [IconsEnum.PEOPLE_CARRY]: faPeopleCarry,
    [IconsEnum.PRINT]: faPrint,
    [IconsEnum.SEARCH_MINUS]: faSearchMinus,
    [IconsEnum.SEARCH_PLUS]: faSearchPlus,
    [IconsEnum.SIGN_OUT_ALT]: faSignOutAlt,
    [IconsEnum.SYNC]: faSync,
    access_time: faHistory,
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
    attach_file: faPaperclip,
    attention: faExclamationCircle,
    barcode: faBarcode,
    binoculars: faBinoculars,
    card_giftcard: faGift,
    category: faCodepen,
    chart_pie: faChartPie,
    check: faCheck,
    check_circle: faCheckCircle,
    circle_regular: faCircleRegular,
    clear_all: faEraser,
    cloud: faCloud,
    comments_regular: faCommentsRegular,
    contact_mail: faEnvelope,
    contact_phone: faPhone,
    dashboard: faChartLine,
    done: faCheck,
    done_all: faCheckDouble,
    error: faExclamationCircle,
    exchange: faExchangeAlt,
    exchange_alt: faExchangeAlt,
    exclamation: faExclamation,
    exclamation_circle: faExclamationCircle,
    exclamation_triangle: faExclamationTriangle,
    eye: faEye,
    fa_heart_regular: faHeartRegular,
    file: faFileAlt,
    file_import: faFileImport,
    file_invoice_dollar: faFileInvoiceDollar,
    first_page: faAngleDoubleLeft,
    gift: faGift,
    grip_horizontal: faGripHorizontal,
    group: faUsers,
    hdd: faHdd,
    history: faHistory,
    home: faHome,
    houzz: faHouzz,
    http: faExchangeAlt,
    id_card: faIdCard,
    info: faInfo,
    key: faKey,
    local_atm: faMoneyBill,
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
    navigate_before: faChevronLeft,
    navigate_next: faChevronRight,
    payment: faCreditCard,
    percent: faPercent,
    phone: faPhone,
    play_circle_regular: faPlayCircleRegular,
    playlist_add_check: faClipboardCheck,
    plug: faPlug,
    plus: faPlus,
    power_off: faPowerOff,
    priority_high: faExclamation,
    product: faCannabis,
    question: faQuestion,
    remove: faMinus,
    retweet: faRetweet,
    router: faServer,
    save: faSave,
    search: faSearch,
    shield_alt: faShieldAlt,
    shipping_fast: faShippingFast,
    shopping_cart: faShoppingCart,
    signIn: faSignInAlt,
    smile_beam: faSmileBeam,
    sms: faCommentDots,
    spa: faCannabis,
    stop: faStop,
    stop_circle: faStopCircle,
    tablet_alt: faTabletAlt,
    tags: faTags,
    taxi: faTaxi,
    thumbs_up: faThumbsUp,
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
    warning: faExclamationTriangle,
    widgets: faCubes,
    work: faBriefcase,
  };
  private static logger = LoggerFactory.makeLogger('UIMaterialFactory');

  public snackbar = 'mdc-snackbar';
  public snackbarText = 'mdc-snackbar__text';
  public snackbarActionWrapper = 'mdc-snackbar__action-wrapper';
  public snackbarActionButton = 'mdc-snackbar__action-button';
  public card = 'mdc-card';
  public cardActions = 'mdc-card__actions';
  public cardActionButtons = 'mdc-card__action-buttons';
  public cardActionIcons = 'mdc-card__action-icons';
  public rippleSurface = 'mdc-ripple-surface';

  @lazyInject(DI_TYPES.Translate) private t: TranslatorT;
  @lazyInject(DI_TYPES.UiIconFactory) private uiIconFactory: IUiDefaultIconFactory;
  @lazyInject(DI_TYPES.UIDefaultFactory) private defaultUIFactory: IUIFactory;

  /**
   * @stable [18.05.2018]
   * @param {UniversalUIIconConfigurationT} cfg
   * @returns {JSX.Element}
   */
  public makeIcon(cfg: IUIIconConfiguration | string): JSX.Element {
    if (!cfg) {
      return null;
    }
    const config = this.toIconConfig(cfg);

    const uiIconCtor = this.uiIconFactory.makeInstance(config.type);
    const awIconCtor = UIMaterialFactory.ICONS_MAP[config.type];
    if (!awIconCtor && !uiIconCtor) {
      UIMaterialFactory.logger.warn(
        `[$UIMaterialFactory] The icon ${config.type} is not defined.`
      );
    }

    const iconCtor = awIconCtor || faQuestion;
    const hasHandler = isFn(config.onClick);

    return (
      <div
        ref={config.ref}
        key={config.key}
        title={config.title as string}
        className={joinClassName(
          'rac-icon',
          hasHandler && `rac-action-icon rac-action-${config.type}-icon`,
          config.disabled && 'rac-disabled-icon',
          calc(config.className),
        )}
        {...handlerPropsFactory(config.onClick, !config.disabled, nvl(config.touched, false))}
      >
        {uiIconCtor || <FontAwesomeIcon icon={iconCtor}/>}
      </div>
    );
  }

  /**
   * @stable [30.09.2019]
   * @param {Error} e
   * @returns {Element}
   */
  public makeWindowError(e: Error): Element {
    return this.defaultUIFactory.makeWindowError(e);
  }

  /**
   * @stable [02.12.2019]
   * @param {Error} e
   * @param {boolean} logging
   * @returns {React.ReactNode}
   */
  public makeReactError(e: Error, logging?: boolean): React.ReactNode {
    return this.defaultUIFactory.makeReactError(e, logging);
  }

  /**
   * @stable [28.11.2019]
   * @param {IUniversalUiMessageConfigEntity} cfg
   * @returns {React.ReactNode}
   */
  public makeMessage(cfg: IUniversalUiMessageConfigEntity): React.ReactNode {
    return this.defaultUIFactory.makeMessage(cfg);
  }

  /**
   * @stable [18.05.2018]
   * @param {UniversalUIIconConfigurationT} cfg
   * @returns {IUIIconConfiguration}
   */
  private toIconConfig(cfg: IUIIconConfiguration | string): IUIIconConfiguration {
    return (isString(cfg) ? {type: cfg} : cfg)  as IUIIconConfiguration;
  }
}
