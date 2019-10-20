import {
  IChangesWrapper,
  IDataWrapper,
  IEntity,
  IListWrapper,
  IOriginalDataWrapper,
  IRawDataWrapper,
} from '../definitions.interface';
import {
  ILifeCycleEntity,
  ISelectedWrapperEntity,
} from './entity-definition.interface';
import {
  IPaginatedEntity,
} from './page-definition.interface';
import {
  ISortDirectionsWrapperEntity,
} from './sort-definition.interface';

/**
 * @stable [19.10.2019]
 */
export interface IListEntity<TEntity extends IEntity = IEntity>
  extends ILifeCycleEntity,
    IPaginatedEntity,
    IDataWrapper<TEntity[]>,
    IRawDataWrapper,
    IOriginalDataWrapper<TEntity[]>,
    ISelectedWrapperEntity<TEntity>,
    ISortDirectionsWrapperEntity,
    IChangesWrapper {
}

/**
 * @stable [19.10.2019]
 */
export interface IListWrapperEntity<TEntity extends IEntity = IEntity>
  extends IListWrapper<IListEntity<TEntity>> {
}
