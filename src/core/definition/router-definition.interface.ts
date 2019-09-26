import { History } from 'history';

import {
  IHistoryWrapper,
  IHomeWrapper,
  ILogoutWrapper,
  IProfileWrapper,
  ISignInWrapper,
} from '../definitions.interface';

/**
 * @stable [24.09.2019]
 */
export interface IRouterEntity
  extends History {
}

/**
 * @stable [24.09.2019]
 */
export interface IRouterWrapperEntity
  extends IHistoryWrapper<IRouterEntity> {
}

/**
 * @stable [26.09.2019]
 */
export interface IRoutesEntity
  extends IHomeWrapper<string>,
    IProfileWrapper<string>,
    ILogoutWrapper<string>,
    ISignInWrapper<string> {
}
