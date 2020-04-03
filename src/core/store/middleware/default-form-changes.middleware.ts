import { IEffectsAction } from 'redux-effects-promise';

import { FormActionBuilder } from '../../component/action.builder';
import { IDefaultFormChangesMiddlewareConfigEntity } from '../../definition';
import {
  calc,
  isObjectNotEmpty,
  orNull,
} from '../../util';

/**
 * @stable [03.04.2020]
 * @param {IDefaultFormChangesMiddlewareConfigEntity<TChanges, TState>} config
 * @returns {IEffectsAction}
 */
export const makeDefaultFormChangesMiddleware =
  <TChanges = {}, TState = {}>(config: IDefaultFormChangesMiddlewareConfigEntity<TChanges, TState>): IEffectsAction =>
    orNull(
      isObjectNotEmpty(config.defaultChanges) && isObjectNotEmpty(calc(config.formSection)),
      () => FormActionBuilder.buildDefaultChangesAction(calc(config.formSection), calc(config.defaultChanges))
    );
