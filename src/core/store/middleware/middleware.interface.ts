import { IEffectsAction } from 'redux-effects-promise';

import {
  ICanComeBackWrapper,
  ICanReturnWrapper,
  ICanUpdateWrapper,
  IEffectsActionWrapper,
  IEntity,
  IEntityWrapper,
  IFilterSectionWrapper,
  IFormSectionWrapper,
  ILazyLoadedResolverWrapper,
  ILazyLoadedSectionWrapper,
  IListRoutePathWrapper,
  IListSectionWrapper,
  IPathWrapper,
  IRelatedEntityWrapper,
  IResolverWrapper,
  ISaveMessageWrapper,
  IStateWrapper,
  IListAccessorWrapper,
  IUseLazyLoadingWrapper,
} from '../../definitions.interface';
import {
  IListWrapperEntity,
  IApplicationStoreEntity,
  IListEntity,
} from '../../entities-definitions.interface';
import { IApiEntity } from '../../definition';

/**
 * @stable [31.08.2018]
 */
export interface IUntouchedListMiddlewareConfig<TApplicationState>
  extends IListAccessorWrapper<(state: TApplicationState) => IListEntity>,
          IResolverWrapper<(state: TApplicationState) => IListWrapperEntity>,
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
 * @stable [29.06.2018]
 */
export interface IEditedListMiddlewareConfig<TEntity extends IEntity, TApplicationState>
  extends IFormSectionWrapper<string | ((entity: TEntity, state: TApplicationState, action: IEffectsAction) => string)>,
          IListSectionWrapper,
          IStateWrapper<TApplicationState>,
          IPathWrapper<string | ((entity: TEntity, state: TApplicationState, action: IEffectsAction) => string)>,
          IEffectsActionWrapper,
          IUseLazyLoadingWrapper,
          IEntityWrapper<TEntity> {
}

/**
 * @stable [06.07.2018]
 */
export interface IFilteredListMiddlewareConfig extends IListSectionWrapper,
                                                       IEffectsActionWrapper {
}

/**
 * @stable [21.01.2019]
 */
export interface IDestroyedFormMiddlewareConfig extends IFormSectionWrapper {
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
            ICanReturnWrapper,
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
 * @stable [18.02.2019]
 */
export interface IRefreshedListOnValidFormMiddlewareConfig
  extends IListSectionWrapper,
    IEffectsActionWrapper {
}

/**
 * @stable [11.03.2019]
 */
export interface IFilterFormDialogMiddlewareConfig
  extends IListSectionWrapper,
    IFormSectionWrapper,
    IFilterSectionWrapper {
}

/**
 * @stable [11.03.2019]
 */
export interface IToolbarToolsMiddlewareConfig
  extends IListSectionWrapper {
}
