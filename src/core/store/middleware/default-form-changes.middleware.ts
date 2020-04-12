import { IEffectsAction } from 'redux-effects-promise';

import { FormActionBuilder } from '../../action';
import { IDefaultFormChangesMiddlewareConfigEntity } from '../../definition';
import {
  calc,
  isObjectNotEmpty,
  orNull,
  toFormSection,
} from '../../util';

/**
 * @stable [03.04.2020]
 * @param {IDefaultFormChangesMiddlewareConfigEntity<TChanges, TState>} cfg
 * @returns {IEffectsAction}
 */
export const makeDefaultFormChangesMiddleware =
  <TChanges = {}, TState = {}>(cfg: IDefaultFormChangesMiddlewareConfigEntity<TChanges, TState>): IEffectsAction =>
    orNull(
      isObjectNotEmpty(cfg.defaultChanges) && isObjectNotEmpty(toFormSection(cfg)),
      () => FormActionBuilder.buildDefaultChangesAction(toFormSection(cfg), calc(cfg.defaultChanges))
    );
