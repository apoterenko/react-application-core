import { IEffectsAction } from 'redux-effects-promise';

import { FormActionBuilder } from '../../action';
import { IDefaultFormChangesMiddlewareConfigEntity } from '../../definition';
import {
  CalcUtils,
  ConditionUtils,
  ObjectUtils,
  SectionUtils,
} from '../../util';

/**
 * @stable [04.09.2020]
 * @param cfg
 */
export const makeDefaultFormChangesMiddleware =
  <TChanges = {}, TState = {}>(cfg: IDefaultFormChangesMiddlewareConfigEntity<TChanges, TState>): IEffectsAction =>
    ConditionUtils.orNull(
      ObjectUtils.isObjectNotEmpty(cfg.defaultChanges) && ObjectUtils.isObjectNotEmpty(SectionUtils.asFormSection(cfg)),
      () => FormActionBuilder.buildDefaultChangesAction(SectionUtils.asFormSection(cfg), CalcUtils.calc(cfg.defaultChanges))
    );
