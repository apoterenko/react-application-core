import {
  IDisabledWrapper,
  IListWrapper,
  IProgressWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
  ISectionNameWrapper,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { defValuesFilter } from './filter';
import { ifNotNilThanValue } from './cond';
import {
  IGenericActiveQueryEntity,
  IGenericLifeCycleEntity,
  IGenericPagedEntity,
  IGenericPaginatedEntity,
  IGenericPaginatedLifeCycleEntity,
  IListWrapperEntity,
  IQueryFilterEntity,
} from '../definition';
import { Selectors } from './select';
import { inProgress } from './wrapper';

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {boolean} disabled
 * @returns {IDisabledWrapper}
 */
const mapDisabledAsDisabledWrapper = (disabled: boolean): IDisabledWrapper =>
  defValuesFilter<IDisabledWrapper, IDisabledWrapper>({disabled});

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {IProgressWrapper} entity
 * @returns {IDisabledWrapper}
 */
const mapProgressWrapperAsDisabledWrapper = (entity: IProgressWrapper): IDisabledWrapper =>
  mapDisabledAsDisabledWrapper(inProgress(entity));

/**
 * @stable [07.05.2020]
 * @mapper-generic
 *
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {IDisabledWrapper}
 */
const mapListWrapperEntityAsDisabledWrapper = (listWrapperEntity: IListWrapperEntity): IDisabledWrapper =>
  mapProgressWrapperAsDisabledWrapper(Selectors.list(listWrapperEntity));

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {string} sectionName
 * @returns {ISectionNameWrapper}
 */
const mapSectionName = (sectionName: string): ISectionNameWrapper =>
  defValuesFilter<ISectionNameWrapper, ISectionNameWrapper>({sectionName});

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {TList} list
 * @returns {IListWrapper<TList>}
 */
const mapList = <TList>(list: TList): IListWrapper<TList> =>
  defValuesFilter<IListWrapper<TList>, IListWrapper<TList>>({list});

/**
 * @stable [07.05.2020]
 * @mapper-generic
 *
 * @param {TEntity} queryFilter
 * @returns {IQueryFilterWrapper<TEntity>}
 */
const mapQueryFilter = <TEntity = string>(queryFilter: TEntity): IQueryFilterWrapper<TEntity> =>
  defValuesFilter<IQueryFilterWrapper<TEntity>, IQueryFilterWrapper<TEntity>>({queryFilter});

/**
 * @stable [06.05.2020]
 * @param {string} query
 * @returns {IQueryWrapper}
 */
const mapQuery = (query: string): IQueryWrapper => defValuesFilter<IQueryWrapper, IQueryWrapper>({query});

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {ISectionNameWrapper} wrapper
 * @returns {ISectionNameWrapper}
 */
const mapSectionNameWrapper = (wrapper: ISectionNameWrapper): ISectionNameWrapper =>
  mapSectionName(Selectors.sectionName(wrapper));

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {IListWrapperEntity} wrapper
 * @returns {IListWrapperEntity}
 */
const mapListWrapperEntity = (wrapper: IListWrapperEntity): IListWrapperEntity =>
  mapList(Selectors.list(wrapper));

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {IQueryFilterEntity} entity
 * @returns {IQueryFilterEntity}
 */
const mapQueryFilterEntity = (entity: IQueryFilterEntity): IQueryFilterEntity =>
  mapQueryFilter(Selectors.queryFilter(entity));

/**
 * @stable [07.05.2020]
 * @mapper-generic
 *
 * @param {IQueryFilterEntity} entity
 * @returns {IQueryWrapper}
 */
const mapQueryFilterEntityAsQuery = (entity: IQueryFilterEntity): IQueryWrapper =>
  mapQuery(Selectors.queryFilterEntityQuery(entity));

/**
 * @stable [05.05.2020]
 * @mapper-generic
 *
 * @param {IGenericPagedEntity} entity
 * @returns {IGenericPagedEntity}
 */
const mapPagedEntity = (entity: IGenericPagedEntity): IGenericPagedEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IGenericPagedEntity, IGenericPagedEntity>({
    page: entity.page,
    pageSize: entity.pageSize,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [07.05.2020]
 * @mapper-generic
 *
 * @param {IGenericActiveQueryEntity} entity
 * @returns {IGenericActiveQueryEntity}
 */
const mapActiveQueryEntity = (entity: IGenericActiveQueryEntity): IGenericActiveQueryEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IGenericActiveQueryEntity, IGenericActiveQueryEntity>({
    active: entity.active,
    disabled: entity.disabled,
    query: entity.query,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {IGenericLifeCycleEntity} entity
 * @returns {IGenericLifeCycleEntity}
 */
const mapLifeCycleEntity = (entity: IGenericLifeCycleEntity): IGenericLifeCycleEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IGenericLifeCycleEntity, IGenericLifeCycleEntity>({
    touched: entity.touched,
    progress: entity.progress,
    error: entity.error,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [05.05.2020]
 * @mapper-generic
 *
 * @param {IGenericPaginatedEntity} entity
 * @returns {IGenericPaginatedEntity}
 */
const mapPaginatedEntity = (entity: IGenericPaginatedEntity): IGenericPaginatedEntity =>
  ifNotNilThanValue(
    entity,
    () => defValuesFilter<IGenericPaginatedEntity, IGenericPaginatedEntity>({
      ...mapPagedEntity(entity),
      lockPage: entity.lockPage,
      totalAmount: entity.totalAmount,
      totalCount: entity.totalCount,
    }),
    UNDEF_SYMBOL
  );

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {IGenericPaginatedLifeCycleEntity} entity
 * @returns {IGenericPaginatedLifeCycleEntity}
 */
const mapPaginatedLifeCycleEntity = (entity: IGenericPaginatedLifeCycleEntity): IGenericPaginatedLifeCycleEntity =>
  ifNotNilThanValue(
    entity,
    () => ({
      ...mapLifeCycleEntity(entity),
      ...mapPaginatedEntity(entity),
    }),
    UNDEF_SYMBOL
  );

/**
 * @stable [06.05.2020]
 */
export class GenericMappers {
  public static activeQueryEntity = mapActiveQueryEntity;                                               /* stable [07.05.2020] */
  public static listWrapperEntity = mapListWrapperEntity;                                               /* stable [07.05.2020] */
  public static listWrapperEntityAsDisabledWrapper = mapListWrapperEntityAsDisabledWrapper;             /* stable [07.05.2020] */
  public static pagedEntity = mapPagedEntity;                                                           /* stable [07.05.2020] */
  public static paginatedEntity = mapPaginatedEntity;                                                   /* stable [07.05.2020] */
  public static paginatedLifeCycleEntity = mapPaginatedLifeCycleEntity;                                 /* stable [07.05.2020] */
  public static progressWrapperAsDisabledWrapper = mapProgressWrapperAsDisabledWrapper;                 /* stable [07.05.2020] */
  public static query = mapQuery;
  public static queryFilterEntity = mapQueryFilterEntity;                                               /* stable [07.05.2020] */
  public static queryFilterEntityAsQuery = mapQueryFilterEntityAsQuery;                                 /* stable [07.05.2020] */
  public static sectionNameWrapper = mapSectionNameWrapper;                                             /* stable [07.05.2020] */
}
