import {
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { defValuesFilter } from './filter';
import { ifNotNilThanValue } from './cond';
import {
  IGenericPagedEntity,
  IGenericPaginatedEntity,
} from '../definition';

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
 */
export class GenericMappers {

  public static mapPagedEntity = mapPagedEntity;
  public static mapPaginatedEntity = mapPaginatedEntity;
}
