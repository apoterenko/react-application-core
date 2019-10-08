import { IEffectsAction } from 'redux-effects-promise';

import { IActionWrapper } from '../definitions.interface';

/**
 * @stable [09.10.2019]
 */
export interface IEffectsActionEntity
  extends IActionWrapper<IEffectsAction> {
}
