import {
  EntityIdT,
  IEntityIdWrapper,
  IEntityWrapper,
  INewEntityWrapper,
  IOriginalEntityWrapper,
} from '../definitions.interface';

/**
 * @stable [26.02.2019]
 */
export interface IExtendedEntity<TEntity>
  extends IEntityWrapper<TEntity>,
    INewEntityWrapper,
    IOriginalEntityWrapper<TEntity>,
    IEntityIdWrapper<EntityIdT> {
}
