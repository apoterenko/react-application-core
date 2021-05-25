import * as React from 'react';
import * as R from 'ramda';
import { injectable } from 'inversify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBackspace,
  faBarcode,
  faBars,
  faCamera,
  faCannabis,
  faChartLine,
  faChartPie,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faChevronDown,
  faChevronUp,
  faCircle,
  faCloud,
  faCogs,
  faCommentDots,
  faCubes,
  faDollarSign,
  faEllipsisH,
  faEraser,
  faExchangeAlt,
  faExclamation,
  faExclamationCircle,
  faExclamationTriangle,
  faExpandAlt,
  faFileDownload,
  faFileInvoiceDollar,
  faFilter,
  faGift,
  faHome,
  faInfo,
  faKey,
  faListUl,
  faLock,
  faLongArrowAltLeft,
  faLongArrowAltRight,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faMinus,
  faMinusCircle,
  faPaperclip,
  faPencilAlt,
  faPeopleCarry,
  faPercent,
  faPlus,
  faPrint,
  faQuestion,
  faReceipt,
  faRedo,
  faSearch,
  faSearchMinus,
  faSearchPlus,
  faShieldAlt,
  faSignInAlt,
  faSignOutAlt,
  faSpinner,
  faStop,
  faSync,
  faTabletAlt,
  faTag,
  faTags,
  faTimes,
  faTimesCircle,
  faTruckMoving,
  faUndo,
  faUnlockAlt,
  faUser,
  faUserEdit,
  faUsers,
  faUserShield,
  faVideo,
  faWarehouse,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  faAdversal,
  faCodepen,
  faGratipay,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAddressCard,
  faArrowAltCircleRight as faArrowAltCircleRightRegular,
  faCalendarAlt as faCalendarAltRegular,
  faCircle as faCircleRegular,
  faClock as faClockRegular,
  faComment as faCommentRegular,
  faComments as faCommentsRegular,
  faCreditCard,
  faFile as faFileRegular,
  faFileAlt,
  faHdd,
  faMinusSquare as faMinusSquareRegular,
  faPaperPlane as faPaperPlaneRegular,
  faPlusSquare as faPlusSquareRegular,
  faQuestionCircle as faQuestionCircleRegular,
  faSave as faSaveRegular,
  faSave,
  faStopCircle,
  faTrashAlt as faTrashAltRegular,
  faUser as faUserRegular,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';

import {
  IconsEnum,
  IIconConfigEntity,
  IUiIconFactory,
} from '../../../../definition';
import { TypeUtils } from '../../../../util';

@injectable()
export class UiIconFactory implements IUiIconFactory {

  // tslint:disable:max-line-length
  // https://svg2jsx.herokuapp.com/
  private static readonly SUPPORTED_ICONS_MAPS: Record<string, JSX.Element> = {
    'cloud': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M23.999 15.958a6.424 6.424 0 0 1-6.315 6.539H7.186a7.46 7.46 0 0 1-7.124-6.5 7.461 7.461 0 0 1 5.234-8.099A8.443 8.443 0 0 1 12.872 3a8.597 8.597 0 0 1 8.383 7.649A6.544 6.544 0 0 1 24 15.958h-.001zm-4.845-3.15l-.75-.404-.045-.85a5.644 5.644 0 0 0-5.489-5.55 5.496 5.496 0 0 0-5.099 3.694l-.315.825-.87.135a4.472 4.472 0 0 0 .6 8.848h10.498A3.433 3.433 0 0 0 21 15.967a3.542 3.542 0 0 0-1.845-3.162v.003z'
        />
      </svg>
    ),
    'power': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M12 23.996A11.997 11.997 0 0 1 5.072 2.202a1.499 1.499 0 0 1 2.363 1.082 1.5 1.5 0 0 1-.624 1.365 9.002 9.002 0 0 0-3.39 10.074 9.001 9.001 0 0 0 17.158 0 9 9 0 0 0-3.39-10.074 1.502 1.502 0 1 1 1.74-2.447 12.001 12.001 0 0 1 4.507 13.431A12.002 12.002 0 0 1 12 23.996zm0-11.998a1.5 1.5 0 0 1-1.5-1.5V1.5a1.5 1.5 0 0 1 3 0v8.998a1.5 1.5 0 0 1-1.5 1.5z'
        />
      </svg>
    ),
    'passport': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M19.5 24h-15a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3H6c0-3.315 2.685-6 6-6s6 2.685 6 6h1.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zM12 3a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3zm7.5 6h-15v12h15V9zM12 12a3 3 0 1 1 0 6 3 3 0 1 1 0-6z'
        />
      </svg>
    ),
    'home': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M18.005 21c0-.013-11.997 0-11.997 0 .01 0 0-7.502 0-7.502a1.5 1.5 0 0 0-3 0v7.501a3 3 0 0 0 3 3.001h11.997a3 3 0 0 0 2.99-3v-7.502a1.5 1.5 0 1 0-3 0l.009 7.501h.001zm4.652-9.006a1.457 1.457 0 0 1-1.096-.343l-.01.007-9.562-8.134-9.553 8.086c-.303.26-.699.383-1.095.34a1.446 1.446 0 0 1-1.002-.559c-.524-.669-.43-1.63.21-2.187L10.907.394a1.636 1.636 0 0 1 2.13 0l10.415 8.853c.64.558.732 1.519.21 2.186-.243.317-.606.52-1.005.561zm-9.157 4.49v4.508h-3V16.5c0-.83.68-1.496 1.5-1.5.82-.004 1.5.67 1.5 1.483z'
        />
      </svg>
    ),
    'favorite': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M21.69 14.242a33.258 33.258 0 0 1-3 3.675 58.134 58.134 0 0 1-3.267 3.23c-.67.611-1.2 1.066-1.515 1.328a3.005 3.005 0 0 1-3.828 0c-.315-.262-.844-.72-1.515-1.329a54.864 54.864 0 0 1-3.273-3.23 33.824 33.824 0 0 1-2.99-3.665A10.843 10.843 0 0 1 .006 8.23a7.273 7.273 0 0 1 2.16-5.452A7.39 7.39 0 0 1 12 2.329a7.384 7.384 0 0 1 9.837.45 7.273 7.273 0 0 1 2.154 5.43 10.809 10.809 0 0 1-2.302 6.034l.001-.001zm-1.975-9.327a4.398 4.398 0 0 0-6.17 0l-1.55 1.533-1.549-1.533a4.415 4.415 0 0 0-6.177 0 4.287 4.287 0 0 0-1.275 3.267c-.06 4.474 9 11.98 9 11.98s9.056-7.5 9-11.985a4.27 4.27 0 0 0-1.28-3.262z'
        />
      </svg>
    ),
    'sale': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M5.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 3a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm13 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 3a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm.272-19.895a1.501 1.501 0 0 1 2.121 0 1.501 1.501 0 0 1 0 2.121L5.226 20.893a1.501 1.501 0 0 1-2.12 0 1.501 1.501 0 0 1 0-2.12L18.771 3.104z'
        />
      </svg>
    ),
    'info': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M13.5 21h1.505c.824 0 1.495.666 1.495 1.5 0 .828-.68 1.5-1.495 1.5h-6.01A1.495 1.495 0 0 1 7.5 22.5c0-.828.68-1.5 1.495-1.5H10.5V9H9.015a1.5 1.5 0 1 1 0-3h2.97c.84 0 1.515.666 1.515 1.5V21zM11.25 4.5a2.25 2.25 0 1 0-.002-4.502A2.25 2.25 0 0 0 11.25 4.5z'
        />
      </svg>
    ),
    'password': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M19.5 24h-15a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3H6c0-3.315 2.685-6 6-6s6 2.685 6 6h1.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zM12 3a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3zm7.5 6h-15v12h15V9zM12 12a3 3 0 1 1 0 6 3 3 0 1 1 0-6z'
        />
      </svg>
    ),
    'chat': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M11.99 20.992A9.008 9.008 0 0 1 7.543 4.156a9.013 9.013 0 0 1 10.88 1.518 9.001 9.001 0 0 1 1.32 10.905c-.21.357-.262.783-.15 1.18l.753 2.553-2.577-.735a1.5 1.5 0 0 0-1.18.15 8.986 8.986 0 0 1-4.6 1.265zm10.095 2.94a1.501 1.501 0 0 0 1.858-1.854c-.15-.525-1.3-4.54-1.299-4.553A11.998 11.998 0 0 0 3.514 3.514 11.996 11.996 0 0 0 17.53 22.642l4.56 1.293h-.004v-.003z'
        />
      </svg>
    ),
    'item-list': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M24 20a1.5 1.5 0 0 0-1.5-1.5h-16a1.5 1.5 0 0 0 0 3h16A1.5 1.5 0 0 0 24 20zm0-7.5a1.5 1.5 0 0 0-1.5-1.5h-16a1.5 1.5 0 0 0 0 3h16a1.5 1.5 0 0 0 1.5-1.5zM24 5a1.5 1.5 0 0 0-1.5-1.5h-16a1.5 1.5 0 0 0 0 3h16A1.5 1.5 0 0 0 24 5zM1.5 21.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0-7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0-7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'/>
      </svg>
    ),
    'ok': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <defs>
          <path id='61000029-3ad6-4fb3-a4a7-c6e231a79d7a' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-3a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9zm-1.5-4.5c.6 0 1.167-.237 1.59-.665l5.472-5.749a1.527 1.527 0 0 0 0-2.142 1.488 1.488 0 0 0-2.121 0L10.5 13.158l-1.94-2.214a1.488 1.488 0 0 0-2.12 0 1.527 1.527 0 0 0 0 2.142l2.468 2.75c.425.427.988.664 1.59.664h.002z'
          />
        </defs>
        <use fill='currentColor' fillRule='evenodd' xlinkHref='#61000029-3ad6-4fb3-a4a7-c6e231a79d7a' />
      </svg>
    ),
    'id': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='80' height='80' viewBox='0 0 80 80'>
        <path fill='currentColor' d='M40 3c-3.302 0-6 2.698-6 6v2H18c-1.645 0-3 1.355-3 3v56c0 1.645 1.355 3 3 3h30.537a18.819 18.819 0 0 1-1.264-2H18c-.565 0-1-.435-1-1V14c0-.565.435-1 1-1h16v2h-1c-2.197 0-4 1.803-4 4v1h.203c.456 1.706 1.953 3 3.797 3h14c1.844 0 3.34-1.294 3.797-3H51v-1c0-2.197-1.803-4-4-4h-1v-2h16c.565 0 1 .435 1 1v29h2V14c0-1.645-1.355-3-3-3H46V9c0-3.302-2.698-6-6-6zm0 2c2.22 0 4 1.78 4 4v7c0 .565-.435 1-1 1h-6c-.565 0-1-.435-1-1V9c0-2.22 1.78-4 4-4zm0 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-18 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm11 0h1.188c.417 1.157 1.519 2 2.812 2h6c1.293 0 2.395-.843 2.813-2H47c1.117 0 2 .883 2 2s-.883 2-2 2H33c-1.117 0-2-.883-2-2s.883-2 2-2zm-11 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm18 0c-3.854 0-7 3.146-7 7a7.004 7.004 0 0 0 3.088 5.799C32.513 47.325 30 50.874 30 55h2c0-4.411 3.589-8 8-8 3.529 0 6.525 2.3 7.586 5.477.402-.69.847-1.35 1.33-1.983a10.066 10.066 0 0 0-5.018-4.687A7.003 7.003 0 0 0 47 40c0-3.854-3.146-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5zm-18 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm42 1c-6.043 0-11.314 3.37-14.035 8.328v-.012c-.122.222-.225.456-.336.684h.006A15.874 15.874 0 0 0 48 62c0 8.822 7.178 16 16 16s16-7.178 16-16-7.178-16-16-16zm0 2c7.72 0 14 6.28 14 14s-6.28 14-14 14-14-6.28-14-14 6.28-14 14-14zm-42 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm48.78 3.227l-9.495 9.289-3.646-3.717-1.428 1.398 5.045 5.145 10.922-10.686-1.399-1.43zM22 57a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'
        />
      </svg>
    ),
    'card': (
      <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
          <path fill='currentColor'  d='M4.571 7A4.585 4.585 0 0 0 0 11.571V40.83A4.585 4.585 0 0 0 4.571 45.4h4.572v6.4a4.585 4.585 0 0 0 4.571 4.571H59.43A4.585 4.585 0 0 0 64 51.8V24.371a4.585 4.585 0 0 0-4.571-4.571h-2.743v-8.229A4.585 4.585 0 0 0 52.114 7H4.571zm0 1.829h47.543a2.73 2.73 0 0 1 2.743 2.742v2.743H1.83v-2.743A2.73 2.73 0 0 1 4.57 8.83zM1.83 17.97h53.028V40.83a2.73 2.73 0 0 1-2.743 2.742H4.571A2.73 2.73 0 0 1 1.83 40.83V17.97zm54.857 3.658h2.743a2.73 2.73 0 0 1 2.742 2.742v2.743h-5.485V21.63zm-51.2 2.742a.916.916 0 0 0-.915.915c0 .503.411.914.915.914.503 0 .914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914.503 0 .914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.915-.41.915-.914a.916.916 0 0 0-.915-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.915-.41.915-.914a.916.916 0 0 0-.915-.915zm3.658 0a.916.916 0 0 0-.915.915c0 .503.411.914.915.914.503 0 .914-.41.914-.914a.916.916 0 0 0-.914-.915zm29.257 6.4h5.485V51.8a2.73 2.73 0 0 1-2.742 2.743H13.714a2.73 2.73 0 0 1-2.743-2.743v-6.4h41.143a4.585 4.585 0 0 0 4.572-4.571V30.77zM5.486 39a.916.916 0 0 0-.915.914c0 .504.411.915.915.915.503 0 .914-.411.914-.915A.916.916 0 0 0 5.486 39zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915.503 0 .914-.411.914-.915A.916.916 0 0 0 9.143 39zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915s.914-.411.914-.915A.916.916 0 0 0 12.8 39zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915s.914-.411.914-.915a.916.916 0 0 0-.914-.914zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915s.915-.411.915-.915a.916.916 0 0 0-.915-.914zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915s.915-.411.915-.915A.916.916 0 0 0 23.77 39zm3.658 0a.916.916 0 0 0-.915.914c0 .504.411.915.915.915.503 0 .914-.411.914-.915a.916.916 0 0 0-.914-.914zm3.657 0a.916.916 0 0 0-.915.914c0 .504.411.915.915.915.503 0 .914-.411.914-.915a.916.916 0 0 0-.914-.914zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915.503 0 .914-.411.914-.915a.916.916 0 0 0-.914-.914zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915s.914-.411.914-.915A.916.916 0 0 0 38.4 39zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915s.914-.411.914-.915a.916.916 0 0 0-.914-.914zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915s.915-.411.915-.915a.916.916 0 0 0-.915-.914zm3.657 0a.916.916 0 0 0-.914.914c0 .504.41.915.914.915s.915-.411.915-.915A.916.916 0 0 0 49.37 39zM14.63 49.971a.916.916 0 0 0-.915.915c0 .503.411.914.915.914.503 0 .914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.915.915c0 .503.411.914.915.914.503 0 .914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914.503 0 .914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.915-.41.915-.914a.916.916 0 0 0-.915-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.915-.41.915-.914a.916.916 0 0 0-.915-.915zm3.658 0a.916.916 0 0 0-.915.915c0 .503.411.914.915.914.503 0 .914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.915.915c0 .503.411.914.915.914.503 0 .914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914.503 0 .914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.914-.41.914-.914a.916.916 0 0 0-.914-.915zm3.657 0a.916.916 0 0 0-.914.915c0 .503.41.914.914.914s.915-.41.915-.914a.916.916 0 0 0-.915-.915z'/>
      </svg>
    ),
    [IconsEnum.PHONE]: (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M20.09 24a4 4 0 0 1-.398-.02 21.994 21.994 0 0 1-9.585-3.405 21.699 21.699 0 0 1-6.673-6.668A22.04 22.04 0 0 1 .016 4.234 3.884 3.884 0 0 1 3.882 0h3.04a3.888 3.888 0 0 1 3.886 3.358c.11.84.316 1.665.611 2.455a3.888 3.888 0 0 1-.881 4.105l-.25.25a14.459 14.459 0 0 0 3.503 3.504l.258-.258a3.883 3.883 0 0 1 4.093-.875c.795.296 1.62.502 2.476.615a3.88 3.88 0 0 1 3.341 3.907v3.041A3.884 3.884 0 0 1 20.091 24zm1.1-6.95a1.12 1.12 0 0 0-.95-1.153 14.012 14.012 0 0 1-3.068-.765A1.113 1.113 0 0 0 16 15.38l-1.294 1.294a.923.923 0 0 1-1.109.15 17.228 17.228 0 0 1-6.46-6.46.923.923 0 0 1 .15-1.11l1.29-1.29c.306-.31.404-.77.25-1.179-.37-.99-.625-2.018-.762-3.057A1.117 1.117 0 0 0 6.94 2.77H3.883a1.112 1.112 0 0 0-1.11 1.201 19.253 19.253 0 0 0 2.99 8.438 18.958 18.958 0 0 0 5.836 5.835 19.229 19.229 0 0 0 8.376 2.983 1.115 1.115 0 0 0 1.215-1.119V17.05z'/>
      </svg>
    ),
    'web': (
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M20.991 19h-7.485a1.5 1.5 0 0 0 1.515 1.5h2.97a1.506 1.506 0 0 1 1.305.744c.27.462.27 1.035.006 1.5-.267.465-.76.753-1.296.756h-12a1.5 1.5 0 0 1-1.5-1.5 1.51 1.51 0 0 1 1.5-1.5h2.949c.4.005.786-.15 1.071-.435.285-.28.444-.664.444-1.065H3.01A3.012 3.012 0 0 1 0 16V4a3.002 3.002 0 0 1 3.012-3h17.973A3.01 3.01 0 0 1 24 4v12.015A3 3 0 0 1 20.991 19zm0-15H3.006l.01 12h17.991l-.015-12h-.001z'/>
      </svg>
    ),
    'return': (
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
           width='24' height='24' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M8.59 20.94a1.485 1.485 0 0 1 0 2.121 1.534 1.534 0 0 1-2.147 0L.667 17.59A2.203 2.203 0 0 1 0 16c0-.6.237-1.167.666-1.59l5.775-5.47a1.538 1.538 0 0 1 2.151 0 1.488 1.488 0 0 1 0 2.12l-3.72 3.44H21V1.5c0-.883.668-1.5 1.5-1.5S24 .617 24 1.5v16H4.869l3.722 3.44z'
        />
      </svg>
    ),
    'change': (
      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
        <path
          fill='currentColor'
          fillRule='evenodd'
          d='M15.557 5.058l-2.85 2.645c-.4.39-1.036.39-1.434 0a.994.994 0 010-1.413l1.473-1.287H2v2a1 1 0 11-2 0v-2a2 2 0 012-2l10.751-.006-1.478-1.29a.992.992 0 010-1.414 1.024 1.024 0 011.433 0l2.85 2.645a1.486 1.486 0 01.001 2.12zM3.3 8.293a1.024 1.024 0 011.433 0 .989.989 0 010 1.413l-1.48 1.29L14 11.004v-2a1 1 0 012 0v2a2 2 0 01-2 2H3.255l1.473 1.288a.989.989 0 010 1.413c-.398.39-1.035.39-1.433 0L.445 13.06a1.483 1.483 0 01-.001-2.12L3.3 8.292z'
        />
      </svg>
    ),
  };
  // tslint:enable:max-line-length

  private static readonly ICONS_MAP = {
    [IconsEnum.ANGLE_DOUBLE_LEFT]: faAngleDoubleLeft,
    [IconsEnum.ANGLE_DOUBLE_RIGHT]: faAngleDoubleRight,
    [IconsEnum.ANGLE_LEFT]: faAngleLeft,
    [IconsEnum.ANGLE_RIGHT]: faAngleRight,
    [IconsEnum.ARROW_DOWN]: faArrowDown,
    [IconsEnum.ARROW_LEFT]: faArrowLeft,
    [IconsEnum.ARROW_RIGHT]: faArrowRight,
    [IconsEnum.ARROW_UP]: faArrowUp,
    [IconsEnum.BACKSPACE]: faBackspace,
    [IconsEnum.BARCODE]: faBarcode,
    [IconsEnum.BARS]: faBars,
    [IconsEnum.CALENDAR_ALT_REGULAR]: faCalendarAltRegular,
    [IconsEnum.CAMERA]: faCamera,
    [IconsEnum.CHART_LINE]: faChartLine,
    [IconsEnum.CHECK]: faCheck,
    [IconsEnum.CHECK_CIRCLE]: faCheckCircle,
    [IconsEnum.CHEVRON_DOWN]: faChevronDown,
    [IconsEnum.CHEVRON_UP]: faChevronUp,
    [IconsEnum.CIRCLE]: faCircle,
    [IconsEnum.CIRCLE_REGULAR]: faCircleRegular,
    [IconsEnum.CLOCK_REGULAR]: faClockRegular,
    [IconsEnum.CODEPEN]: faCodepen,
    [IconsEnum.COGS]: faCogs,
    [IconsEnum.COMMENT]: faCommentRegular,
    [IconsEnum.DOLLAR_SIGN]: faDollarSign,
    [IconsEnum.ELLIPSIS_H]: faEllipsisH,
    [IconsEnum.ERASER]: faEraser,
    [IconsEnum.EXCLAMATION]: faExclamation,
    [IconsEnum.EXCLAMATION_CIRCLE]: faExclamationCircle,
    [IconsEnum.EXCLAMATION_TRIANGLE]: faExclamationTriangle,
    [IconsEnum.EXPAND_ALT]: faExpandAlt,
    [IconsEnum.FILE_DOWNLOAD]: faFileDownload,
    [IconsEnum.FILE_REGULAR]: faFileRegular,
    [IconsEnum.FILTER]: faFilter,
    [IconsEnum.LIST_UL]: faListUl,
    [IconsEnum.LONG_ARROW_ALT_LEFT]: faLongArrowAltLeft,
    [IconsEnum.LONG_ARROW_ALT_RIGHT]: faLongArrowAltRight,
    [IconsEnum.MINUS]: faMinus,
    [IconsEnum.MINUS_CIRCLE]: faMinusCircle,
    [IconsEnum.MINUS_SQUARE_REGULAR]: faMinusSquareRegular,
    [IconsEnum.PAPER_PLANE_REGULAR]: faPaperPlaneRegular,
    [IconsEnum.PAPERCLIP]: faPaperclip,
    [IconsEnum.PENCIL_ALT]: faPencilAlt,
    [IconsEnum.PEOPLE_CARRY]: faPeopleCarry,
    [IconsEnum.PLUS_SQUARE_REGULAR]: faPlusSquareRegular,
    [IconsEnum.PRINT]: faPrint,
    [IconsEnum.QUESTION]: faQuestion,
    [IconsEnum.QUESTION_CIRCLE_REGULAR]: faQuestionCircleRegular,
    [IconsEnum.RECEIPT]: faReceipt,
    [IconsEnum.REDO]: faRedo,
    [IconsEnum.SAVE_REGULAR]: faSaveRegular,
    [IconsEnum.SEARCH]: faSearch,
    [IconsEnum.SEARCH_MINUS]: faSearchMinus,
    [IconsEnum.SEARCH_PLUS]: faSearchPlus,
    [IconsEnum.SHIELD_ALT]: faShieldAlt,
    [IconsEnum.SIGN_OUT_ALT]: faSignOutAlt,
    [IconsEnum.SPINNER]: faSpinner,
    [IconsEnum.SYNC]: faSync,
    [IconsEnum.TIMES]: faTimes,
    [IconsEnum.TIMES_CIRCLE]: faTimesCircle,
    [IconsEnum.TRASH_ALT_REGULAR]: faTrashAltRegular,
    [IconsEnum.UNDO]: faUndo,
    [IconsEnum.USER]: faUser,
    [IconsEnum.USER_REGULAR]: faUserRegular,
    [IconsEnum.VIDEO]: faVideo,
    add: faPlus,
    address_card: faAddressCard,
    adversal: faAdversal,
    arrow_alt_circle_right_regular: faArrowAltCircleRightRegular,
    chart_pie: faChartPie,
    cloud: faCloud,
    comments_regular: faCommentsRegular,
    done: faCheck,
    done_all: faCheckDouble,
    exchange: faExchangeAlt,
    file: faFileAlt,
    file_invoice_dollar: faFileInvoiceDollar,
    gift: faGift,
    group: faUsers,
    hdd: faHdd,
    home: faHome,
    http: faExchangeAlt,
    info: faInfo,
    key: faKey,
    local_offer: faTag,
    location: faMapMarkerAlt,
    location_on: faMapMarkerAlt,
    lock: faLock,
    loyalty: faGratipay,
    map_marked_alt: faMapMarkedAlt,
    map_marker_alt: faMapMarkerAlt,
    payment: faCreditCard,
    percent: faPercent,
    plus: faPlus,
    product: faCannabis,
    remove: faMinus,
    save: faSave,
    signIn: faSignInAlt,
    sms: faCommentDots,
    spa: faCannabis,
    stop: faStop,
    stop_circle: faStopCircle,
    tablet_alt: faTabletAlt,
    tags: faTags,
    truck_moving: faTruckMoving,
    unlock_alt: faUnlockAlt,
    user_circle: faUserCircle,
    user_edit: faUserEdit,
    user_shield: faUserShield,
    warehouse: faWarehouse,
    widgets: faCubes,
  };

  private readonly alternativeIconCtors = new Map<string, JSX.Element>();

  /**
   * @stable [19.04.2020]
   * @param {IIconConfigEntity | string} cfg
   * @returns {JSX.Element}
   */
  public makeIcon(cfg: IIconConfigEntity | string): JSX.Element {
    if (R.isNil(cfg)) {
      return cfg;
    }
    const config = this.toIconConfig(cfg);
    return UiIconFactory.SUPPORTED_ICONS_MAPS[config.type] || this.getAlternativeIconCtor(config);
  }

  /**
   * @stable [19.04.2020]
   * @param {IIconConfigEntity} config
   * @returns {JSX.Element}
   */
  private getAlternativeIconCtor(config: IIconConfigEntity): JSX.Element {
    const icon = UiIconFactory.ICONS_MAP[config.type] || faQuestion;

    let iconCtor = this.alternativeIconCtors.get(icon);
    if (R.isNil(iconCtor)) {
      this.alternativeIconCtors.set(icon, iconCtor = <FontAwesomeIcon icon={icon}/>);
    }
    return iconCtor;
  }

  /**
   * @stable [19.04.2020]
   * @param {IIconConfigEntity | string} cfg
   * @returns {IIconConfigEntity}
   */
  private toIconConfig(cfg: IIconConfigEntity | string): IIconConfigEntity {
    return (TypeUtils.isString(cfg) ? {type: cfg} : cfg)  as IIconConfigEntity;
  }
}
