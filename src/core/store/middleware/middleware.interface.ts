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
 * @stable [03.05.2018]
 */
export interface IEditedListMiddlewareConfig<TEntity> extends IFormSectionWrapper,
                                                              IPathWrapper<(entity: TEntity) => string>,
                                                              IEffectsActionWrapper {
}
