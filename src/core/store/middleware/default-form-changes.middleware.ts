import { IEffectsAction } from 'redux-effects-promise';

import { FormActionBuilder } from '../../component/action.builder';
import { IDefaultFormChangesMiddlewareConfigEntity } from '../../definition';
import {
  calc,
  isObjectNotEmpty,
  orNull,
} from '../../util';

/**
 * @stable [29.03.2020]
 * @param {IDefaultFormChangesMiddlewareConfigEntity<TState, TChanges>} config
 * @returns {IEffectsAction}
 */
export const makeDefaultFormChangesMiddleware =
  <TState = {}, TChanges = {}>(config: IDefaultFormChangesMiddlewareConfigEntity<TState, TChanges>): IEffectsAction =>
    orNull(
      isObjectNotEmpty(config.defaultChanges) && isObjectNotEmpty(calc(config.formSection)),
      () => FormActionBuilder.buildDefaultChangesAction(calc(config.formSection), calc(config.defaultChanges))
    );
