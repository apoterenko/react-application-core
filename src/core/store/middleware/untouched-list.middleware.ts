import { IEffectsAction } from 'redux-effects-promise';

import {
  ifNotEmptyThanValue,
  isTouched,
  notNilValuesArrayFilter,
  orNull,
} from '../../util';
import { ListActionBuilder } from '../../component/action.builder';
import { IUntouchedListMiddlewareConfigEntity } from '../../definition';
import { makeDefaultFormChangesMiddleware } from './default-form-changes.middleware';

/**
 * @stable [27.03.2020]
 * @param {IUntouchedListMiddlewareConfigEntity<TState>} config
 * @returns {(action: IEffectsAction, state: TState) => IEffectsAction}
 */
export const makeUntouchedListMiddleware = <TState>(config: IUntouchedListMiddlewareConfigEntity<TState>) =>
  (action: IEffectsAction, state: TState): IEffectsAction[] =>
    ifNotEmptyThanValue(
      notNilValuesArrayFilter(
        makeDefaultFormChangesMiddleware(config),
        orNull(!isTouched(config.listAccessor(state)), () => ListActionBuilder.buildLoadAction(config.listSection))
      ),
      (actions) => actions
    );

/**
 * @stable [27.03.2020]
 * @param {IUntouchedListMiddlewareConfigEntity<TState>} config
 * @returns {() => IEffectsAction}
 */
export const makeUntouchedLazyLoadedListMiddleware = <TState>(config: IUntouchedListMiddlewareConfigEntity<TState>) =>
  (action: IEffectsAction, state: TState): IEffectsAction => ListActionBuilder.buildLoadAction(config.listSection);
