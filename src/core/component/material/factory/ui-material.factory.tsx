import * as React from 'react';
import { injectable } from 'inversify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTruckMoving,
  faCannabis,
  faQuestion,
  faCubes,
  faTag,
  faShoppingCart,
  faHome,
  faExchangeAlt,
  faMapMarkerAlt,
  faFilter,
  faEllipsisV,
  faListOl,
  faShoppingBasket,
  faShippingFast,
  faSpinner,
  faSync,
  faTimes,
  faAngleLeft,
  faAngleRight,
  faBan,
  faPlus,
  faLock,
  faExclamationTriangle,
  faChevronDown,
  faUnlockAlt,
  faExclamation,
  faCheck,
  faTaxi,
  faAngleDoubleRight,
  faTabletAlt,
  faArrowAltCircleDown,
  faAngleDoubleLeft,
  faFileExport,
  faListUl,
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
  faChevronUp,
  faChevronRight,
  faChartLine,
  faChevronLeft,
  faPlug,
  faKey,
  faEllipsisH,
  faInfo,
  faBinoculars,
  faUserPlus,
  faCloud,
  faFileImport,
  faLevelDownAlt,
  faArrowsAltH,
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
  faTimesCircle,
  faBarcode,
  faRetweet,
  faArrowUp,
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
  faMinusSquare,
  faComments as faCommentsRegular,
  faThumbsUp,
  faPlusSquare,
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
  faCheckCircle as faCheckCircleRegular,
  faComment as faCommentRegular,
  faUser as faUserRegular,
} from '@fortawesome/free-regular-svg-icons';
import { LoggerFactory } from 'ts-smart-logger';

import { isFn, isString, toClassName, uuid } from '../../../util';
import { IUIFactory } from '../../factory';
import { IBasicEvent } from '../../../definitions.interface';
import { IUIIconConfiguration } from '../../../configurations-definitions.interface';
import { DI_TYPES, lazyInject } from '../../../di';
import { ApplicationTranslatorT } from '../../../translation';

@injectable()
export class UIMaterialFactory implements IUIFactory {
  public static ICONS_MAP = {
    retweet: faRetweet,
    barcode: faBarcode,
    dashboard: faChartLine,
    warehouse: faWarehouse,
    minus_circle: faMinusCircle,
    product: faCannabis,
    supplier: faTruckMoving,
    check_circle_regular: faCheckCircleRegular,
    shopping_basket: faShoppingBasket,
    shipping_fast: faShippingFast,
    stop_circle_regular: faStopCircleRegular,
    file: faFileAlt,
    menu: faBars,
    category: faCodepen,
    local_offer: faTag,
    home: faHome,
    long_arrow_alt_up: faLongArrowAltUp,
    long_arrow_alt_down: faLongArrowAltDown,
    long_arrow_alt_right: faLongArrowAltRight,
    long_arrow_alt_left: faLongArrowAltLeft,
    level_down_alt: faLevelDownAlt,
    timelapse: faSpinner,
    arrow_up: faArrowUp,
    http: faExchangeAlt,
    exchange: faExchangeAlt,
    user_clock: faUserClock,
    tablet: faTabletAlt,
    chart_pie: faChartPie,
    location: faMapMarkerAlt,
    location_on: faMapMarkerAlt,
    map_marker_alt: faMapMarkerAlt,
    search: faSearch,
    more_vert: faEllipsisV,
    more_hor: faEllipsisH,
    save: faSave,
    refresh: faSync,
    user_edit: faUserEdit,
    clear: faTimes,
    people_carry: faPeopleCarry,
    keyboard_arrow_left: faAngleLeft,
    keyboard_arrow_right: faAngleRight,
    expand_more: faChevronDown,
    chevron_down: faChevronDown,
    chevron_up: faChevronUp,
    attention: faExclamationCircle,
    arrows_alt_h: faArrowsAltH,
    file_export: faFileExport,
    block: faBan,
    ban: faBan,
    user_tie: faUserTie,
    widgets: faCubes,
    taxi: faTaxi,
    times_circle: faTimesCircle,
    spa: faCannabis,
    add: faPlus,
    plus: faPlus,
    lock: faLock,
    warning: faExclamationTriangle,
    exclamation_triangle: faExclamationTriangle,
    exclamation_circle: faExclamationCircle,
    close: faTimes,
    lock_open: faUnlockAlt,
    filter_list: faFilter,
    error_outline: faExclamation,
    done: faCheck,
    object_group_regular: faObjectGroupRegular,
    check: faCheck,
    first_page: faAngleDoubleLeft,
    last_page: faAngleDoubleRight,
    date_range: faCalendarAlt,
    payment: faCreditCard,
    user_circle: faUserCircle,
    comment_regular: faCommentRegular,
    file_invoice_dollar: faFileInvoiceDollar,
    shopping_cart: faShoppingCart,
    truck: faTruck,
    exit_to_app: faSignOutAlt,
    signIn: faSignInAlt,
    group: faUsers,
    people_outline: faUser,
    person_outline: faUser,
    user_regular: faUserRegular,
    person: faSolidUser,
    loyalty: faGratipay,
    local_atm: faMoneyBill,
    access_time: faHistory,
    history: faHistory,
    sms: faCommentDots,
    work: faBriefcase,
    verified_user: faShieldAlt,
    shield_alt: faShieldAlt,
    user_shield: faUserShield,
    done_all: faCheckDouble,
    remove: faMinus,
    clock_regular: faClockRegular,
    cancel: faBan,
    playlist_add_check: faClipboardCheck,
    done_outline: faCheckCircle,
    contact_phone: faPhone,
    phone: faPhone,
    comments_regular: faCommentsRegular,
    contact_mail: faEnvelope,
    edit: faPen,
    priority_high: faExclamation,
    format_list_numbered: faListOl,
    attach_file: faPaperclip,
    help_outline: faQuestionCircle,
    question: faQuestion,
    clear_all: faEraser,
    stop: faStopCircle,
    hdd: faHdd,
    backward: faArrowAltCircleLeft,
    down: faArrowAltCircleDown,
    arrow_alt_circle_down: faArrowAltCircleDown,
    arrow_alt_circle_up: faArrowAltCircleUp,
    arrow_alt_circle_up_regular: faArrowAltCircleUpRegular,
    arrow_alt_circle_right: faArrowAltCircleRight,
    arrow_alt_circle_right_regular: faArrowAltCircleRightRegular,
    print: faPrint,
    router: faServer,
    error: faExclamationCircle,
    cloud_download: faFileDownload,
    cloud: faCloud,
    card_giftcard: faGift,
    play_circle_regular: faPlayCircleRegular,
    navigate_before: faChevronLeft,
    navigate_next: faChevronRight,
    plug: faPlug,
    info: faInfo,
    list_ul: faListUl,
    binoculars: faBinoculars,
    search_plus: faSearchPlus,
    eye: faEye,
    file_import: faFileImport,
    houzz: faHouzz,
    undo: faUndo,
    user: faUser,
    minus_square: faMinusSquare,
    arrow_right: faArrowRight,
    arrow_left: faArrowLeft,
    user_plus: faUserPlus,
    plus_square: faPlusSquare,
    thumbs_up: faThumbsUp,
    id_card: faIdCard,
    map_marked_alt: faMapMarkedAlt,
    address_card: faAddressCard,
    video: faVideo,
    store_alt: faStoreAlt,
    key: faKey,
    trash: faTrashAlt,
    smile_beam: faSmileBeam,
    adversal: faAdversal,
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
  public textFieldTextArea = 'mdc-text-field--textarea';
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
  public dialogFooterButton = 'mdc-dialog__footer__button';
  public dialogFooterButtonCancel = 'mdc-dialog__footer__button--cancel';
  public dialogFooterButtonAccept = 'mdc-dialog__footer__button--accept';

  @lazyInject(DI_TYPES.Translate) private t: ApplicationTranslatorT;

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

    const awIconCtor = UIMaterialFactory.ICONS_MAP[config.type];
    if (!awIconCtor) {
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
                        isButton && `rac-action-icon rac-button-${config.type}-icon`,
                        config.disabled && 'rac-disabled-icon',
                      )}
           onClick={(event: IBasicEvent) => {
             if (!config.disabled && isButton) {
               config.onClick(event);
             }
           }}>
        <FontAwesomeIcon icon={iconCtor}/>
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
