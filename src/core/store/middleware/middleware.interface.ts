import {
  IResolverWrapper,
  IStringSectionWrapper,
  IListSectionWrapper,
  IFilterSectionWrapper,
  IListRoutePathWrapper,
  IFormSectionWrapper,
  IEffectsActionWrapper,
  IPathWrapper,
} from '../../definitions.interface';
import { IListWrapperEntity } from '../../entities-definitions.interface';

/* @stable - 01.04.2018 */
export interface IUntouchedListMiddlewareConfig<TApplicationState>
  extends IResolverWrapper<(state: TApplicationState) => IListWrapperEntity>,
          IStringSectionWrapper {
}

/**
 * @stable [14.05.2018]
 */
export interface IFormFilterMiddlewareConfig extends IListRoutePathWrapper,
                                                     IListSectionWrapper,
                                                     IFilterSectionWrapper {
}

/**
 * @stable [03.05.2018]
 */
export interface IEditedListMiddlewareConfig<TEntity> extends IFormSectionWrapper,
                                                              IPathWrapper<(entity: TEntity) => string>,
                                                              IEffectsActionWrapper {
}
