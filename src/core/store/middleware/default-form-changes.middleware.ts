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
 * @stable [19.09.2020]
 * @param cfg
 */
const makeDefaultFormChangesMiddleware =
  <TChanges = {}, TState = {}>(cfg: IDefaultFormChangesMiddlewareConfigEntity<TChanges, TState>): IEffectsAction => {
    const {
      defaultChanges,
    } = cfg;
    const formSection = SectionUtils.asFormSection(cfg);

    return ConditionUtils.orNull(
      ObjectUtils.isObjectNotEmpty(defaultChanges) && ObjectUtils.isObjectNotEmpty(formSection),
      () => FormActionBuilder.buildDefaultChangesAction(formSection, CalcUtils.calc(defaultChanges, cfg))
    );
  };

/**
 * @stable [19.09.2020]
 */
export class DefaultFormChangesMiddlewareFactories {
  public static readonly defaultFormChangesMiddleware = makeDefaultFormChangesMiddleware;
}
