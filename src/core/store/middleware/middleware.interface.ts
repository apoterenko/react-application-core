import { IEffectsAction } from 'redux-effects-promise';

import {
  IResolverWrapper,
  IListSectionWrapper,
  IFilterSectionWrapper,
  IListRoutePathWrapper,
  IFormSectionWrapper,
  IEffectsActionWrapper,
  IPathWrapper,
  IFilterRoutePathWrapper,
  IStateWrapper,
  IUseLazyLoadingWrapper,
  ICanComeBackWrapper,
  IEntity,
  IActivateQueryFilterWrapper,
  ICanUpdateWrapper,
  ISaveMessageWrapper,
  IRelatedEntityWrapper,
  ILazyLoadedSectionWrapper,
  ILazyLoadedResolverWrapper,
} from '../../definitions.interface';
import {
  IListWrapperEntity,
  IApiEntity,
  IApplicationStoreEntity,
} from '../../entities-definitions.interface';

/**
 * @stable [31.08.2018]
 */
export interface IUntouchedListMiddlewareConfig<TApplicationState>
  extends IResolverWrapper<(state: TApplicationState) => IListWrapperEntity>,
          IListSectionWrapper,
          ILazyLoadedResolverWrapper<(state: TApplicationState, action?: IEffectsAction) => IListWrapperEntity>,
          ILazyLoadedSectionWrapper<(state: TApplicationState, action?: IEffectsAction) => string> {
}

/**
 * @stable [09.06.2018]
 */
export interface IFormFilterResetMiddlewareConfig extends IListRoutePathWrapper,
                                                          IListSectionWrapper {
}

/**
 * @stable [26.08.2018]
 */
export interface IFormFilterClearMiddlewareConfig extends IListSectionWrapper {
}

/**
 * @stable [26.08.2018]
 */
export interface IFormFilterSubmitMiddlewareConfig extends IListSectionWrapper,
                                                           IFilterSectionWrapper {
}

/**
 * @stable [26.08.2018]
 */
export interface IFormFilterMiddlewareConfig extends IFormFilterSubmitMiddlewareConfig,
                                                     IFormFilterClearMiddlewareConfig,
                                                     IFormFilterResetMiddlewareConfig {
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
          IUseLazyLoadingWrapper {
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

/**
 * @stable [13.09.2018]
 */
export interface IRefreshedListMiddlewareConfig extends IListSectionWrapper,
                                                        IEffectsActionWrapper {
}

/**
 * @stable [16.10.2018]
 */
export interface IRefreshedListOnValidateFormMiddlewareConfig extends IListSectionWrapper,
                                                                      IEffectsActionWrapper {
}
