import * as React from 'react';
import { injectable } from 'inversify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTruckMoving,
  faCannabis,
  faQuestion,
  faCubes,
  faStop,
  faTag,
  faShoppingCart,
  faHome,
  faExchangeAlt,
  faMapMarkerAlt,
  faEllipsisV,
  faListOl,
  faShoppingBasket,
  faShippingFast,
  faSpinner,
  faSync,
  faAngleLeft,
  faAngleRight,
  faBan,
  faPlus,
  faLock,
  faExclamationTriangle,
  faUnlockAlt,
  faExclamation,
  faCheck,
  faTaxi,
  faAngleDoubleRight,
  faTabletAlt,
  faArrowAltCircleDown,
  faAngleDoubleLeft,
  faArrowDown,
  faFileInvoiceDollar,
  faSignOutAlt,
  faSearch,
  faUserEdit,
  faWarehouse,
  faUsers,
  faMoneyBill,
  faUser as faSolidUser,
  faHistory,
  faVideo,
  faPeopleCarry,
  faCommentDots,
  faBriefcase,
  faShieldAlt,
  faCheckDouble,
  faMinus,
  faClipboardCheck,
  faCheckCircle,
  faPen,
  faPhone,
  faEraser,
  faChartPie,
  faPrint,
  faPaperclip,
  faServer,
  IconDefinition,
  faFileDownload,
  faTruck,
  faGift,
  faChevronRight,
  faChartLine,
  faChevronLeft,
  faPlug,
  faKey,
  faEllipsisH,
  faPowerOff,
  faInfo,
  faBinoculars,
  faUserPlus,
  faCloud,
  faFileImport,
  faLevelDownAlt,
  faEye,
  faSearchPlus,
  faUserClock,
  faUndo,
  faArrowRight,
  faArrowLeft,
  faMapMarkedAlt,
  faSignInAlt,
  faExclamationCircle,
  faUserTie,
  faStoreAlt,
  faArrowAltCircleUp,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faLongArrowAltRight,
  faMinusCircle,
  faLongArrowAltLeft,
  faUserShield,
  faGripHorizontal,
  faTimesCircle,
  faBarcode,
  faRetweet,
  faPercent,
  faArrowUp,
  faDollarSign,
  faArrowAltCircleRight,
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
  faCalendarAlt,
  faUser,
  faEnvelope,
  faQuestionCircle,
  faStopCircle,
  faArrowAltCircleRight as faArrowAltCircleRightRegular,
  faArrowAltCircleLeft,
  faArrowAltCircleUp as faArrowAltCircleUpRegular,
  faComments as faCommentsRegular,
  faThumbsUp,
  faIdCard,
  faClock as faClockRegular,
  faAddressCard,
  faPlayCircle as faPlayCircleRegular,
  faObjectGroup as faObjectGroupRegular,
  faTrashAlt,
  faHdd,
  faStopCircle as faStopCircleRegular,
  faFileAlt,
  faSmileBeam,
  faCircle as faCircleRegular,
  faCheckCircle as faCheckCircleRegular,
  faComment as faCommentRegular,
  faUser as faUserRegular,
  faHeart as faHeartRegular
} from '@fortawesome/free-regular-svg-icons';
import { LoggerFactory } from 'ts-smart-logger';

import { isFn, isString, toClassName, uuid } from '../../../util';
import { IUIFactory } from '../../factory';
import { IBasicEvent } from '../../../react-definitions.interface';
import { IUIIconConfiguration } from '../../../configurations-definitions.interface';
import { DI_TYPES, lazyInject } from '../../../di';
import { ApplicationTranslatorT } from '../../../translation';
import { IUIDefaultIconFactory } from '../../icon';

@injectable()
export class UIMaterialFactory implements IUIFactory {

  public static ICONS_MAP = {
    access_time: faHistory,
    add: faPlus,
    address_card: faAddressCard,
    adversal: faAdversal,
    arrow_alt_circle_down: faArrowAltCircleDown,
    arrow_alt_circle_right: faArrowAltCircleRight,
    arrow_alt_circle_right_regular: faArrowAltCircleRightRegular,
    arrow_alt_circle_up: faArrowAltCircleUp,
    arrow_alt_circle_up_regular: faArrowAltCircleUpRegular,
    arrow_down: faArrowDown,
    arrow_left: faArrowLeft,
    arrow_right: faArrowRight,
    arrow_up: faArrowUp,
    attach_file: faPaperclip,
    attention: faExclamationCircle,
    backward: faArrowAltCircleLeft,
    ban: faBan,
    barcode: faBarcode,
    binoculars: faBinoculars,
    block: faBan,
    calendar_alt: faCalendarAlt,
    card_giftcard: faGift,
    category: faCodepen,
    chart_pie: faChartPie,
    check: faCheck,
    check_circle: faCheckCircle,
    check_circle_regular: faCheckCircleRegular,
    circle_regular: faCircleRegular,
    clear_all: faEraser,
    clock_regular: faClockRegular,
    cloud: faCloud,
    cloud_download: faFileDownload,
    comment_regular: faCommentRegular,
    comments_regular: faCommentsRegular,
    contact_mail: faEnvelope,
    contact_phone: faPhone,
    dashboard: faChartLine,
    dollar_sign: faDollarSign,
    done: faCheck,
    done_all: faCheckDouble,
    down: faArrowAltCircleDown,
    edit: faPen,
    error: faExclamationCircle,
    error_outline: faExclamation,
    exchange: faExchangeAlt,
    exchange_alt: faExchangeAlt,
    exclamation_circle: faExclamationCircle,
    exclamation_triangle: faExclamationTriangle,
    eye: faEye,
    fa_heart_regular: faHeartRegular,
    file: faFileAlt,
    file_import: faFileImport,
    file_invoice_dollar: faFileInvoiceDollar,
    first_page: faAngleDoubleLeft,
    format_list_numbered: faListOl,
    gift: faGift,
    grip_horizontal: faGripHorizontal,
    group: faUsers,
    hdd: faHdd,
    help_outline: faQuestionCircle,
    history: faHistory,
    home: faHome,
    houzz: faHouzz,
    http: faExchangeAlt,
    id_card: faIdCard,
    info: faInfo,
    key: faKey,
    keyboard_arrow_left: faAngleLeft,
    keyboard_arrow_right: faAngleRight,
    last_page: faAngleDoubleRight,
    level_down_alt: faLevelDownAlt,
    local_atm: faMoneyBill,
    local_offer: faTag,
    location: faMapMarkerAlt,
    location_on: faMapMarkerAlt,
    lock: faLock,
    lock_open: faUnlockAlt,
    long_arrow_alt_down: faLongArrowAltDown,
    long_arrow_alt_left: faLongArrowAltLeft,
    long_arrow_alt_right: faLongArrowAltRight,
    long_arrow_alt_up: faLongArrowAltUp,
    loyalty: faGratipay,
    map_marked_alt: faMapMarkedAlt,
    map_marker_alt: faMapMarkerAlt,
    menu: faBars,
    minus: faMinus,
    minus_circle: faMinusCircle,
    more_hor: faEllipsisH,
    more_vert: faEllipsisV,
    navigate_before: faChevronLeft,
    navigate_next: faChevronRight,
    object_group_regular: faObjectGroupRegular,
    payment: faCreditCard,
    pen: faPen,
    people_carry: faPeopleCarry,
    people_outline: faUser,
    percent: faPercent,
    person: faSolidUser,
    person_outline: faUser,
    phone: faPhone,
    play_circle_regular: faPlayCircleRegular,
    playlist_add_check: faClipboardCheck,
    plug: faPlug,
    plus: faPlus,
    power_off: faPowerOff,
    print: faPrint,
    priority_high: faExclamation,
    product: faCannabis,
    question: faQuestion,
    refresh: faSync,
    remove: faMinus,
    retweet: faRetweet,
    router: faServer,
    save: faSave,
    search: faSearch,
    search_plus: faSearchPlus,
    shield_alt: faShieldAlt,
    shipping_fast: faShippingFast,
    shopping_basket: faShoppingBasket,
    shopping_cart: faShoppingCart,
    sign_out_alt: faSignOutAlt,
    signIn: faSignInAlt,
    smile_beam: faSmileBeam,
    sms: faCommentDots,
    spa: faCannabis,
    spinner: faSpinner,
    stop: faStop,
    stop_circle: faStopCircle,
    stop_circle_regular: faStopCircleRegular,
    store_alt: faStoreAlt,
    tablet: faTabletAlt,
    taxi: faTaxi,
    thumbs_up: faThumbsUp,
    timelapse: faSpinner,
    times_circle: faTimesCircle,
    trash: faTrashAlt,
    truck: faTruck,
    truck_moving: faTruckMoving,
    undo: faUndo,
    user: faUser,
    user_circle: faUserCircle,
    user_clock: faUserClock,
    user_edit: faUserEdit,
    user_plus: faUserPlus,
    user_regular: faUserRegular,
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

  public list = 'mdc-list';
  public switch = 'mdc-switch';
  public switchInput = 'mdc-switch__native-control';
  public switchInputWrapper = 'mdc-switch__thumb-underlay';
  public switchInputWrapperBody = 'mdc-switch__thumb';
  public snackbar = 'mdc-snackbar';
  public snackbarText = 'mdc-snackbar__text';
  public snackbarActionWrapper = 'mdc-snackbar__action-wrapper';
  public snackbarActionButton = 'mdc-snackbar__action-button';
  public icons = 'material-icons';
  public toolbar = 'mdc-toolbar';
  public tabBarScrollerScrollArea = 'mdc-tab-scroller__scroll-area';
  public tabBarScrollerScrollAreaScroll = 'mdc-tab-scroller__scroll-area--scroll';
  public tabBarScrollerScrollContent = 'mdc-tab-scroller__scroll-content';
  public tabRipple = 'mdc-tab__ripple';
  public tabBar = 'mdc-tab-bar';
  public tab = 'mdc-tab';
  public tabContent = 'mdc-tab__content';
  public tabIcon = 'mdc-tab__icon';
  public tabIconText = 'mdc-tab__icon-text';
  public tabActive = 'mdc-tab--active';
  public tabIndicator = 'mdc-tab-indicator';
  public tabIndicatorActive = 'mdc-tab-indicator--active';
  public tabIndicatorContent = 'mdc-tab-indicator__content';
  public tabIndicatorContentUnderline = 'mdc-tab-indicator__content--underline';
  public tabBarScroller = 'mdc-tab-scroller';
  public listItemMeta = 'mdc-list-item__meta';
  public listDivider = 'mdc-list-divider';
  public listGroupSubHeader = 'mdc-list-group__subheader';
  public textFieldBox = 'mdc-text-field--box';
  public checkbox = 'mdc-checkbox';
  public checkboxInput = 'mdc-checkbox__native-control';
  public card = 'mdc-card';
  public cardActions = 'mdc-card__actions';
  public cardActionButtons = 'mdc-card__action-buttons';
  public cardActionIcons = 'mdc-card__action-icons';
  public rippleSurface = 'mdc-ripple-surface';
  public menuAnchor = 'mdc-menu-surface--anchor';
  public menuSurface = 'mdc-menu-surface';
  public menu = 'mdc-menu';
  public fab = 'mdc-fab';
  public dialog = 'mdc-dialog';
  public dialogSurface = 'mdc-dialog__surface';
  public dialogContent = 'mdc-dialog__content';
  public dialogContainer = 'mdc-dialog__container';
  public dialogTitle = 'mdc-dialog__title';
  public dialogScrim = 'mdc-dialog__scrim';
  public dialogActions = 'mdc-dialog__actions';

  @lazyInject(DI_TYPES.Translate) private t: ApplicationTranslatorT;
  @lazyInject(DI_TYPES.UIIconFactory) private uiIconFactory: IUIDefaultIconFactory;

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
    const isButton = isFn(config.onClick);

    return (
      <div key={config.key || uuid()}
           title={this.t(config.title)}
           className={toClassName(
                        config.className,
                        'rac-flex',
                        'rac-flex-center',
                        'rac-icon',
                        isButton && `rac-action-icon rac-action-${config.type}-icon`,
                        config.disabled && 'rac-disabled-icon',
                      )}
           onClick={(event: IBasicEvent) => {
             if (!config.disabled && isButton) {
               config.onClick(event);
             }
           }}>
        {uiIconCtor || <FontAwesomeIcon icon={iconCtor}/>}
      </div>
    );
  }

  /**
   * @stable [18.05.2018]
   * @param {IUIIconConfiguration | string} cfg
   * @returns {JSX.Element}
   */
  public makeListItemMetaIcon(cfg: IUIIconConfiguration | string): JSX.Element {
    const config = this.toIconConfig(cfg);
    return this.makeIcon(
      cfg
        ? {
          ...config,
          className: toClassName(config.className, 'rac-list-item-meta-icon'),
        }
        : cfg
    );
  }

  public makeCheckboxAttachment(): JSX.Element {
    return (
      <div className='mdc-checkbox__background'>
        <svg className='mdc-checkbox__checkmark'
             viewBox='0 0 24 24'>
          <path className='mdc-checkbox__checkmark-path'
                fill='none'
                stroke='white'
                d='M1.73,12.91 8.1,19.28 22.79,4.59'/>
        </svg>
        <div className='mdc-checkbox__mixedmark'/>
      </div>
    );
  }

  /**
   * @stable [30.08.2018]
   * @returns {JSX.Element}
   */
  public makeSwitchAttachment(): JSX.Element {
    return <div className='mdc-switch__track'/>;
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
