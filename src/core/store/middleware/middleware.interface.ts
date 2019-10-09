import { IEffectsAction } from 'redux-effects-promise';

import {
  IEntity,
  IFilterSectionWrapper,
  IFormSectionWrapper,
  ILazyLoadedResolverWrapper,
  ILazyLoadedSectionWrapper,
  IListAccessorWrapper,
  IListRoutePathWrapper,
  IListSectionWrapper,
  INavigateBackWrapper,
  IRelatedEntityWrapper,
  IResolverWrapper,
  IStateWrapper,
  ISucceedMessageWrapper,
} from '../../definitions.interface';
import {
  IListWrapperEntity,
  IListEntity,
} from '../../entities-definitions.interface';
import {
  IEffectsActionEntity,
  IStoreEntity,
} from '../../definition';

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
 * @stable [06.07.2018]
 */
export interface IFilteredListMiddlewareConfig extends IListSectionWrapper,
                                                       IEffectsActionEntity {
}

/**
 * @stable [21.01.2019]
 */
export interface IDestroyedFormMiddlewareConfig extends IFormSectionWrapper {
}

/**
 * @stable [22.08.2018]
 */
export interface ISucceedRelatedFormMiddlewareConfig<TEntity extends IEntity = IEntity,
                                                     TRelatedEntity extends IEntity = IEntity,
                                                     TApplicationState = IStoreEntity>
    extends IRelatedEntityWrapper<TRelatedEntity>,
            IEffectsActionEntity,
            IListSectionWrapper,
            IFormSectionWrapper,
            INavigateBackWrapper,
            IStateWrapper<TApplicationState>,
            ISucceedMessageWrapper {
  getEntity?(state: TApplicationState): TEntity;
  getRelatedEntities?(entity: TEntity): TRelatedEntity[];
  makeRelatedChanges?(relatedEntities: TRelatedEntity[]): TEntity;
}

/**
 * @stable [13.09.2018]
 */
export interface IRefreshedListMiddlewareConfig extends IListSectionWrapper,
                                                        IEffectsActionEntity {
}

/**
 * @stable [18.02.2019]
 */
export interface IRefreshedListOnValidFormMiddlewareConfig
  extends IListSectionWrapper,
    IEffectsActionEntity {
}

/**
 * @stable [11.03.2019]
 */
export interface IFilterFormDialogMiddlewareConfig
  extends IListSectionWrapper,
    IFormSectionWrapper {
}

/**
 * @stable [11.03.2019]
 */
export interface IToolbarToolsMiddlewareConfig
  extends IListSectionWrapper {
}
