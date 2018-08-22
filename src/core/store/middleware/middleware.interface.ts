import { IEffectsAction } from 'redux-effects-promise';

import {
  IResolverWrapper,
  ISectionWrapper,
  IListSectionWrapper,
  IFilterSectionWrapper,
  IListRoutePathWrapper,
  IFormSectionWrapper,
  IEffectsActionWrapper,
  IPathWrapper,
  IFilterRoutePathWrapper,
  IStateWrapper,
  IUseLazyLoading,
  ICanComeBackWrapper,
  IEntity,
  IActivateQueryFilterWrapper,
  ICanUpdateWrapper,
  ISaveMessageWrapper,
  IRelatedEntityWrapper,
} from '../../definitions.interface';
import {
  IListWrapperEntity,
  IApiEntity,
  IApplicationStoreEntity,
} from '../../entities-definitions.interface';

/* @stable - 01.04.2018 */
export interface IUntouchedListMiddlewareConfig<TApplicationState>
  extends IResolverWrapper<(state: TApplicationState) => IListWrapperEntity>,
          ISectionWrapper {
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
                                                                           IListSectionWrapper,
                                                                           IActivateQueryFilterWrapper {
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

/**
 * @stable [06.07.2018]
 */
export interface IFilteredListMiddlewareConfig extends IListSectionWrapper,
                                                       IEffectsActionWrapper {
}

/**
 * @stable [22.08.2018]
 */
export interface ISucceedFormMiddlewareConfig<TEntity extends IEntity = IEntity,
                                              TApplicationState = IApplicationStoreEntity>
  extends ICanComeBackWrapper<boolean | ((apiEntity: IApiEntity<TEntity>, action: IEffectsAction) => boolean)>,
          ICanUpdateWrapper<boolean | ((apiEntity: IApiEntity<TEntity>, action: IEffectsAction) => boolean)>,
          IEffectsActionWrapper,
          IListSectionWrapper,
          IFormSectionWrapper,
          ISaveMessageWrapper,
          IStateWrapper<TApplicationState> {
}

/**
 * @stable [22.08.2018]
 */
export interface ISucceedRelatedFormMiddlewareConfig<TEntity extends IEntity = IEntity,
                                                     TRelatedEntity extends IEntity = IEntity,
                                                     TApplicationState = IApplicationStoreEntity>
    extends IRelatedEntityWrapper<TRelatedEntity>,
            IEffectsActionWrapper,
            IListSectionWrapper,
            IStateWrapper<TApplicationState>,
            ISaveMessageWrapper {
  getEntity?(state: TApplicationState): TEntity;
  getRelatedEntities?(entity: TEntity): TRelatedEntity[];
  makeRelatedChanges?(relatedEntities: TRelatedEntity[]): TEntity;
}
