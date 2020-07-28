import {
  IEntity,
} from '../../definitions.interface';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IReduxFormEntity,
  IExtendedFormEntity,
  IGenericListEntity,
  IReduxHolderListEntity,
  IReduxPagedEntity,
} from '../../definition';

/**
 * @deprecated mapEditableEntity
 */
export const formMapper = (editableEntity: IReduxFormEntity): IExtendedFormEntity => ({
  form: {
    ...editableEntity,
  },
});

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
  (listEntity: IReduxHolderListEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
    listEntityPageEntityFilterMapper(listEntity.list, pageSize);

/**
 * @deprecated Use selectChanges
 */
export const editableEntityChangesSelector = <TResult extends IEntity = IEntity>(entity: IReduxFormEntity): TResult =>
  entity.changes as TResult;
