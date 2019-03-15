import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { orNull, isFn } from '../../util';
import { ListActionBuilder } from '../../component/action.builder';
import { IUntouchedListMiddlewareConfig } from './middleware.interface';

/**
 * @stable [31.08.2018]
 * @param {IUntouchedListMiddlewareConfig<TApplicationState>} config
 * @returns {(action: IEffectsAction, state: TApplicationState) => IEffectsAction}
 */
export const makeUntouchedListMiddleware = <TApplicationState>(config: IUntouchedListMiddlewareConfig<TApplicationState>) =>
  (action: IEffectsAction, state: TApplicationState): IEffectsAction =>
    orNull<IEffectsAction>(
      !(isFn(config.listAccessor)
        ? config.listAccessor(state).touched
        : config.resolver(state).list.touched), // Deprecated
      () => ListActionBuilder.buildLoadAction(config.listSection)
    );

/**
 * @stable [31.08.2018]
 * @param {IUntouchedListMiddlewareConfig<TApplicationState>} config
 * @returns {(action: IEffectsAction, state: TApplicationState) => IEffectsAction}
 */
export const makeUntouchedLazyLoadedListMiddleware = <TApplicationState>(config: IUntouchedListMiddlewareConfig<TApplicationState>) =>
  (action: IEffectsAction, state: TApplicationState): IEffectsAction => {
    if (!isFn(config.lazyLoadedSection)) {
      return ListActionBuilder.buildLoadAction(config.listSection);
    }
    const lazyLoadedSection = config.lazyLoadedSection(state, action);
    return orNull<IEffectsAction>(
      !R.isNil(lazyLoadedSection) && !config.lazyLoadedResolver(state, action).list.touched,
      () => ListActionBuilder.buildLoadAction(lazyLoadedSection)
    );
  };
