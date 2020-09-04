import { IEffectsAction } from 'redux-effects-promise';

import { FormActionBuilder } from '../../action';
import { IDefaultFormChangesMiddlewareConfigEntity } from '../../definition';
import {
  CalcUtils,
  ConditionUtils,
  ObjectUtils,
  toFormSection,
} from '../../util';

/**
 * @stable [04.09.2020]
 * @param cfg
 */
export const makeDefaultFormChangesMiddleware =
  <TChanges = {}, TState = {}>(cfg: IDefaultFormChangesMiddlewareConfigEntity<TChanges, TState>): IEffectsAction =>
    ConditionUtils.orNull(
      ObjectUtils.isObjectNotEmpty(cfg.defaultChanges) && ObjectUtils.isObjectNotEmpty(toFormSection(cfg)),
      () => FormActionBuilder.buildDefaultChangesAction(toFormSection(cfg), CalcUtils.calc(cfg.defaultChanges))
    );
