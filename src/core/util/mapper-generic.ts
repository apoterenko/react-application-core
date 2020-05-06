import {
  ISectionNameWrapper,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { defValuesFilter } from './filter';
import { ifNotNilThanValue } from './cond';
import {
  IGenericLifeCycleEntity,
  IGenericPagedEntity,
  IGenericPaginatedEntity,
  IGenericPaginatedLifeCycleEntity,
  IListWrapperEntity,
} from '../definition';
import {
  selectList,
  selectSectionName,
} from './select';
import {
  mapList,
  mapSectionName,
} from './mapper';

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {ISectionNameWrapper} wrapper
 * @returns {ISectionNameWrapper}
 */
export const mapSectionNameWrapper = (wrapper: ISectionNameWrapper): ISectionNameWrapper =>
  mapSectionName(selectSectionName(wrapper));

/**
 * @stable [06.05.2020]
 * @mapper-generic
 *
 * @param {IListWrapperEntity} wrapper
 * @returns {IListWrapperEntity}
 */
export const mapListWrapperEntity = (wrapper: IListWrapperEntity): IListWrapperEntity =>
  mapList(selectList(wrapper));

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
export const mapPaginatedEntity = (entity: IGenericPaginatedEntity): IGenericPaginatedEntity =>
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
export const mapPaginatedLifeCycleEntity =
  (entity: IGenericPaginatedLifeCycleEntity): IGenericPaginatedLifeCycleEntity =>
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

  public static listWrapperEntity = mapListWrapperEntity;
  public static pagedEntity = mapPagedEntity;
  public static paginatedEntity = mapPaginatedEntity;
  public static paginatedLifeCycleEntity = mapPaginatedLifeCycleEntity;
  public static sectionNameWrapper = mapSectionNameWrapper;
}
