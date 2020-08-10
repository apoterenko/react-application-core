import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IGenericListEntity,
  IReduxListHolderEntity,
  IReduxPagedEntity,
} from '../../definition';

/**
 * @deprecated Use mapListPagedEntity
 */
export const listEntityPageEntityFilterMapper = (listEntity: IGenericListEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity => ({
  page: listEntity.lockPage ? listEntity.page : FIRST_PAGE,
  pageSize,
});

/**
 * @deprecated Use mapListWrapperPagedEntity
 */
export const listEntityWrapperPageEntityFilterMapper =
  (listEntity: IReduxListHolderEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
    listEntityPageEntityFilterMapper(listEntity.list, pageSize);
