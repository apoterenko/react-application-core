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
  faHome,
  faExchangeAlt,
  faMapMarkerAlt,
  faFilter,
  faEllipsisV,
  faListOl,
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
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faFileInvoiceDollar,
  faSignOutAlt,
  faSearch,
  faUsers,
  faMoneyBill,
  faUser as faSolidUser,
  faHistory,
  faCommentDots,
  faBriefcase,
  faShieldAlt,
  faCheckDouble,
  faMinus,
  faClock,
  faClipboardCheck,
  faCheckCircle,
  faPen,
  faPhone,
  faEraser,
  faPrint,
  faPaperclip,
  faServer,
  IconDefinition,
  faFileDownload,
  faExclamationCircle,
  faGift,
  faChevronRight,
  faChevronLeft,
  faPlug,
  faKey,
  faInfo,
  faBinoculars,
  faUserPlus,
  faCloud,
  faFileImport,
  faEye,
  faSearchPlus,
  faUserClock,
  faUndo,
  faArrowRight,
  faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHouzz,
  faCodepen,
  faGratipay,
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
  faArrowAltCircleRight,
  faMinusSquare,
  faThumbsUp,
  faPlusSquare,
  faIdCard,
  faAddressCard,
} from '@fortawesome/free-regular-svg-icons';
import { LoggerFactory } from 'ts-smart-logger';

import { isFn, isString, toClassName, uuid } from '../../../util';
import { IUIFactory } from '../../factory';
import { IBasicEvent } from '../../../definitions.interface';
import { IUIIconConfiguration } from '../../../configurations-definitions.interface';

@injectable()
export class UIMaterialFactory implements IUIFactory {
  public static ICONS_MAP = {
    product: faCannabis,
    supplier: faTruckMoving,
    delivery: faShippingFast,
    menu: faBars,
    category: faCodepen,
    local_offer: faTag,
    home: faHome,
    timelapse: faSpinner,
    http: faExchangeAlt,
    location_on: faMapMarkerAlt,
    search: faSearch,
    more_vert: faEllipsisV,
    save: faSave,
    refresh: faSync,
    clear: faTimes,
    keyboard_arrow_left: faAngleLeft,
    keyboard_arrow_right: faAngleRight,
    expand_more: faChevronDown,
    block: faBan,
    widgets: faCubes,
    spa: faCannabis,
    add: faPlus,
    lock: faLock,
    warning: faExclamationTriangle,
    close: faTimes,
    lock_open: faUnlockAlt,
    filter_list: faFilter,
    error_outline: faExclamation,
    done: faCheck,
    check: faCheck,
    first_page: faAngleDoubleLeft,
    last_page: faAngleDoubleRight,
    date_range: faCalendarAlt,
    payment: faCreditCard,
    account_circle: faUserCircle,
    shopping_cart: faFileInvoiceDollar,
    exit_to_app: faSignOutAlt,
    group: faUsers,
    people_outline: faUser,
    person_outline: faUser,
    person: faSolidUser,
    loyalty: faGratipay,
    local_atm: faMoneyBill,
    access_time: faHistory,
    sms: faCommentDots,
    work: faBriefcase,
    verified_user: faShieldAlt,
    done_all: faCheckDouble,
    remove: faMinus,
    clock: faClock,
    cancel: faBan,
    playlist_add_check: faClipboardCheck,
    done_outline: faCheckCircle,
    contact_phone: faPhone,
    contact_mail: faEnvelope,
    edit: faPen,
    priority_high: faExclamation,
    format_list_numbered: faListOl,
    attach_file: faPaperclip,
    help_outline: faQuestionCircle,
    question: faQuestion,
    clear_all: faEraser,
    stop: faStopCircle,
    forward: faArrowAltCircleRight,
    print: faPrint,
    router: faServer,
    error: faExclamationCircle,
    cloud_download: faFileDownload,
    cloud: faCloud,
    vpn_key: faKey,
    card_giftcard: faGift,
    navigate_before: faChevronLeft,
    navigate_next: faChevronRight,
    plug: faPlug,
    info: faInfo,
    binoculars: faBinoculars,
    search_plus: faSearchPlus,
    eye: faEye,
    file_import: faFileImport,
    houzz: faHouzz,
    undo: faUndo,
    user: faUser,
    user_clock: faUserClock,
    minus_square: faMinusSquare,
    arrow_right: faArrowRight,
    user_plus: faUserPlus,
    plus_square: faPlusSquare,
    thumbs_up: faThumbsUp,
    id_card: faIdCard,
    map_marked_alt: faMapMarkedAlt,
    address_card: faAddressCard,
  };
  private static logger = LoggerFactory.makeLogger(UIMaterialFactory);

  public icons = 'material-icons';
  public persistentDrawerToolbarSpacer = 'mdc-drawer__toolbar-spacer';
  public toolbar = 'mdc-toolbar';
  public toolbarSection = 'mdc-toolbar__section';
  public toolbarSectionAlignEnd = 'mdc-toolbar__section--align-end';
  public toolbarSectionAlignStart = 'mdc-toolbar__section--align-start';
  public toolbarRow = 'mdc-toolbar__row';
  public toolbarTitle = 'mdc-toolbar__title';
  public toolbarMenuIcon = 'mdc-toolbar__menu-icon';
  public list = 'mdc-list';
  public listTwoLine = 'mdc-list--two-line';
  public listAvatar = 'mdc-list--avatar-list';
  public listNonInteractive = 'mdc-list--non-interactive';
  public tabBarIndicator = 'mdc-tab-bar__indicator';
  public tabBarScrollerFrameTabs = 'mdc-tab-bar-scroller__scroll-frame__tabs';
  public tabBarScrollerFrame = 'mdc-tab-bar-scroller__scroll-frame';
  public tabBar = 'mdc-tab-bar';
  public tab = 'mdc-tab';
  public tabIcon = 'mdc-tab__icon';
  public tabIconText = 'mdc-tab__icon-text';
  public tabActive = 'mdc-tab--active';
  public tabBarScroller = 'mdc-tab-bar-scroller';
  public tabBarScrollerIndicator = 'mdc-tab-bar-scroller__indicator';
  public tabBarScrollerIndicatorBack = 'mdc-tab-bar-scroller__indicator--back';
  public tabBarScrollerIndicatorForward = 'mdc-tab-bar-scroller__indicator--forward';
  public tabBarScrollerIndicatorInner = 'mdc-tab-bar-scroller__indicator__inner';
  public button = 'mdc-button';
  public buttonOutlined = 'mdc-button--outlined';
  public buttonRaised = 'mdc-button--raised';
  public listItem = 'mdc-list-item';
  public listItemGraphic = 'mdc-list-item__graphic';
  public listItemMeta = 'mdc-list-item__meta';
  public listItemText = 'mdc-list-item__text';
  public listItemSecondaryText = 'mdc-list-item__secondary-text';
  public listDivider = 'mdc-list-divider';
  public listGroupSubHeader = 'mdc-list-group__subheader';
  public formField = 'mdc-form-field';
  public textField = 'mdc-text-field';
  public textFieldBox = 'mdc-text-field--box';
  public checkbox = 'mdc-checkbox';
  public textFieldInput = 'mdc-text-field__input';
  public textFieldTextArea = 'mdc-text-field--textarea';
  public textFieldFocused = 'mdc-text-field--focused';
  public textFieldInvalid = 'mdc-text-field--invalid';
  public textFieldUpgraded = 'mdc-text-field--upgraded';
  public textFieldHelpText = 'mdc-text-field-helper-text';
  public textFieldValidationText = 'mdc-text-field-helper-text--validation-msg';
  public textFieldLabel = 'mdc-floating-label';
  public textFieldFocusedLabel = 'mdc-floating-label--float-above';
  public checkboxInput = 'mdc-checkbox__native-control';
  public card = 'mdc-card';
  public cardActions = 'mdc-card__actions';
  public cardActionButtons = 'mdc-card__action-buttons';
  public cardActionIcons = 'mdc-card__action-icons';
  public rippleSurface = 'mdc-ripple-surface';
  public menuAnchor = 'mdc-menu-anchor';
  public menu = 'mdc-menu';
  public menuItems = 'mdc-menu__items';
  public fab = 'mdc-fab';
  public dialog = 'mdc-dialog';
  public dialogSurface = 'mdc-dialog__surface';
  public dialogBody = 'mdc-dialog__body';
  public dialogHeader = 'mdc-dialog__header';
  public dialogHeaderTitle = 'mdc-dialog__header__title';
  public dialogBackdrop = 'mdc-dialog__backdrop';
  public dialogFooter = 'mdc-dialog__footer';
  public dialogFooterButton = 'mdc-dialog__footer__button';
  public dialogFooterButtonCancel = 'mdc-dialog__footer__button--cancel';
  public dialogFooterButtonAccept = 'mdc-dialog__footer__button--accept';

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
      <div key={uuid()}
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
  public makeTabBarScrollerIndicatorIcon(cfg: IUIIconConfiguration | string): JSX.Element {
    const config = this.toIconConfig(cfg);
    return this.makeIcon(
      cfg
        ? {
          ...config,
          className: toClassName(config.className, this.tabBarScrollerIndicatorInner),
        }
        : cfg
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
   * @stable [18.05.2018]
   * @param {UniversalUIIconConfigurationT} cfg
   * @returns {IUIIconConfiguration}
   */
  private toIconConfig(cfg: IUIIconConfiguration | string): IUIIconConfiguration {
    return (isString(cfg) ? {type: cfg} : cfg)  as IUIIconConfiguration;
  }
}
