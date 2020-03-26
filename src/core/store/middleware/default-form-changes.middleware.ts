import { IEffectsAction } from 'redux-effects-promise';

import { FormActionBuilder } from '../../component/action.builder';
import { IDefaultFormChangesMiddlewareConfigEntity } from '../../definition';
import { IKeyValue } from '../../definitions.interface';
import {
  calc,
  isObjectNotEmpty,
  orNull,
} from '../../util';

/**
 * @stable [26.03.2020]
 * @param {IDefaultFormChangesMiddlewareConfigEntity<TChanges extends IKeyValue, TState>} config
 * @returns {IEffectsAction}
 */
export const makeDefaultFormChangesMiddleware =
  <TChanges extends IKeyValue = IKeyValue, TState = {}>(config: IDefaultFormChangesMiddlewareConfigEntity<TChanges, TState>
  ): IEffectsAction =>
  orNull(
    isObjectNotEmpty(config.defaultChanges) && isObjectNotEmpty(config.formSection),
    () => FormActionBuilder.buildDefaultChangesAction(config.formSection, calc(config.defaultChanges))
  );
