import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/action.builder';
import { IListEffectsMiddlewareConfig } from '../../definition';
import {
  isValueValid,
  orNull,
  selectValidFromAction,
} from '../../util';

/**
 * @stable [27.03.2020]
 * @param {IListEffectsMiddlewareConfig} config
 * @returns {IEffectsAction}
 */
export const makeLoadedListOnValidMiddleware = (config: IListEffectsMiddlewareConfig): IEffectsAction =>
  orNull(
    isValueValid(selectValidFromAction(config.action)),
    () => ListActionBuilder.buildLoadAction(config.listSection)
  );
