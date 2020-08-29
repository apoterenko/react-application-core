import {
  IAddWrapper,
  IEditWrapper,
  IEntity,
  IEntityIdTWrapper,
  IIndexWrapper,
  INewEntityWrapper,
  IRemoveWrapper,
  ISourceWrapper,
} from '../definitions.interface';
import { IFieldChangeEntity } from './field-definition.interface';

/**
 * @entity
 * @stable [29.08.2020]
 */
export interface IMultiItemEntity
  extends IFieldChangeEntity,
    IEntityIdTWrapper,
    IIndexWrapper,
    INewEntityWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxMultiEntity<TEntity extends IEntity = IEntity>
  extends IAddWrapper<TEntity[]>,
    IEditWrapper<IMultiItemEntity[]>,
    IRemoveWrapper<TEntity[]>,
    ISourceWrapper<TEntity[]> {
}
