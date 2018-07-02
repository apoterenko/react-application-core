import { IEffectsAction } from 'redux-effects-promise';

import {
  IResolverWrapper,
  IStringSectionWrapper,
  IListSectionWrapper,
  IFilterSectionWrapper,
  IListRoutePathWrapper,
  IFormSectionWrapper,
  IEffectsActionWrapper,
  IPathWrapper,
  IFilterRoutePathWrapper,
  IStateWrapper,
  IUseLazyLoading,
} from '../../definitions.interface';
import { IListWrapperEntity } from '../../entities-definitions.interface';

/* @stable - 01.04.2018 */
export interface IUntouchedListMiddlewareConfig<TApplicationState>
  extends IResolverWrapper<(state: TApplicationState) => IListWrapperEntity>,
          IStringSectionWrapper {
}

/**
 * @stable [09.06.2018]
 */
export interface IFormFilterResetMiddlewareConfig extends IListRoutePathWrapper,
                                                          IListSectionWrapper {
}

/**
 * @stable [09.06.2018]
 */
export interface IFormFilterSubmitMiddlewareConfig extends IListRoutePathWrapper,
                                                           IListSectionWrapper,
                                                           IFilterSectionWrapper {
}

/**
 * @stable [09.06.2018]
 */
export interface IListEmptyMessageActionFormFilterMiddlewareConfig extends IFilterRoutePathWrapper,
                                                                           IListSectionWrapper {
}

/**
 * @stable [29.06.2018]
 */
export interface IEditedListMiddlewareConfig<TEntity, TApplicationState>
  extends IFormSectionWrapper<string | ((entity: TEntity, state: TApplicationState, action: IEffectsAction) => string)>,
          IListSectionWrapper,
          IStateWrapper<TApplicationState>,
          IPathWrapper<string | ((entity: TEntity, state: TApplicationState, action: IEffectsAction) => string)>,
          IEffectsActionWrapper,
          IUseLazyLoading {
}
