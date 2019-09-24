import { History } from 'history';

import { IHistoryWrapper } from '../definitions.interface';

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
