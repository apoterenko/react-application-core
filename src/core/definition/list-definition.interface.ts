import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
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

/**
 * @stable [20.10.2019]
 */
export const INITIAL_LIST_ENTITY = Object.freeze<IListEntity>({
  changes: {},
  directions: {},
  progress: false,
  touched: false,
  lockPage: false,
  data: null,
  rawData: null,
  selected: null,
  page: FIRST_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  totalCount: 0,
});
