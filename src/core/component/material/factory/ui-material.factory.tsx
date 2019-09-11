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
  faShippingFast,
  faSync,
  faAngleLeft,
  faAngleRight,
  faPlus,
  faTags,
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
  faPhone,
  faEraser,
  faChartPie,
  faPrint,
  faPaperclip,
  faServer,
  IconDefinition,
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
  faCloud,
  faFileImport,
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
  faLongArrowAltUp,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faUserShield,
  faGripHorizontal,
  faTimesCircle,
  faBarcode,
  faRetweet,
  faPercent,
  faArrowUp,
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

import { isFn, isString, joinClassName, uuid } from '../../../util';
import { IUIFactory } from '../../factory';
import { IUIIconConfiguration } from '../../../configurations-definitions.interface';
import { DI_TYPES, lazyInject } from '../../../di';
import { TranslatorT } from '../../../translation';
import { IUIDefaultIconFactory } from '../../icon';
import { FlexLayout } from '../../layout';

@injectable()
export class UIMaterialFactory implements IUIFactory {

  public static ICONS_MAP = {
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
    more_hor: faEllipsisH,
    more_vert: faEllipsisV,
    navigate_before: faChevronLeft,
    navigate_next: faChevronRight,
    payment: faCreditCard,
    people_carry: faPeopleCarry,
    percent: faPercent,
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
    shopping_cart: faShoppingCart,
    sign_out_alt: faSignOutAlt,
    signIn: faSignInAlt,
    smile_beam: faSmileBeam,
    sms: faCommentDots,
    spa: faCannabis,
    stop: faStop,
    stop_circle: faStopCircle,
    sync: faSync,
    tablet: faTabletAlt,
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

  public list = 'mdc-list';
  public switch = 'mdc-switch';
  public switchInput = 'mdc-switch__native-control';
  public switchInputWrapper = 'mdc-switch__thumb-underlay';
  public snackbar = 'mdc-snackbar';
  public snackbarText = 'mdc-snackbar__text';
  public snackbarActionWrapper = 'mdc-snackbar__action-wrapper';
  public snackbarActionButton = 'mdc-snackbar__action-button';
  public icons = 'material-icons';
  public toolbar = 'mdc-toolbar';
  public tabBarScrollerScrollArea = 'mdc-tab-scroller__scroll-area';
  public tabBarScrollerScrollAreaScroll = 'mdc-tab-scroller__scroll-area--scroll';
  public tabBarScrollerScrollContent = 'mdc-tab-scroller__scroll-content';
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
  public dialog = 'mdc-dialog';
  public dialogContainer = 'mdc-dialog__container';
  public dialogScrim = 'mdc-dialog__scrim';

  @lazyInject(DI_TYPES.Translate) private t: TranslatorT;
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
    const isActionIcon = isFn(config.onClick);

    return (
      <FlexLayout
        key={config.key || uuid()}
        title={config.title}
        inline={true}
        className={joinClassName(
          'rac-icon',
          isActionIcon && `rac-action-icon rac-action-${config.type}-icon`,
          config.disabled && 'rac-disabled-icon',
          config.className,
        )}
        justifyContentCenter={true}
        alignItemsCenter={true}
        disabled={config.disabled}
        onClick={config.onClick}
      >
        {uiIconCtor || <FontAwesomeIcon icon={iconCtor}/>}
      </FlexLayout>
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
          className: joinClassName(config.className, 'rac-list-item-meta-icon'),
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
