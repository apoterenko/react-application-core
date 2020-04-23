import {
  IEntity,
  IFormSectionWrapper,
  IListSectionWrapper,
  INavigateBackWrapper,
  IRelatedEntityWrapper,
  IStateWrapper,
  ISucceedTextWrapper,
} from '../../definitions.interface';
import {
  IEffectsActionEntity,
  IStoreEntity,
} from '../../definition';

/**
 * @stable [06.07.2018]
 */
export interface IFilteredListMiddlewareConfig extends IListSectionWrapper,
                                                       IEffectsActionEntity {
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
            ISucceedTextWrapper {
  getEntity?(state: TApplicationState): TEntity;
  getRelatedEntities?(entity: TEntity): TRelatedEntity[];
  makeRelatedChanges?(relatedEntities: TRelatedEntity[]): TEntity;
}
