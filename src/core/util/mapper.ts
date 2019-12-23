import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { defValuesFilter } from './filter';
import {
  IDictionaryEntity,
  IEditableEntity,
  IExtendedEntity,
  IFormWrapperEntity,
  IListEntity,
  IListWrapperEntity,
  IOperationEntity,
  IOptionEntity,
  IPagedEntity,
  IPaginatedEntity,
  IPreviousActionWrapperEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
  ISelectOptionEntity,
  ISortDirectionEntity,
  ISortDirectionsEntity,
  ISortDirectionsWrapperEntity,
  IStackEntity,
  IStackItemEntity,
  IStackWrapperEntity,
  ITabPanelEntity,
  ITabPanelWrapperEntity,
  ITransportEntity,
  ITransportWrapperEntity,
  IUniversalApplicationEntity,
  IUserEntity,
  IUserWrapperEntity,
  ToolbarToolsEnum,
} from '../definition';
import {
  AnyT,
  DEFAULT_PAGE_SIZE,
  EntityIdT,
  FIRST_PAGE,
  IActionsDisabledWrapper,
  IDisabledWrapper,
  IEntity,
  IEntityIdTWrapper,
  IKeyValue,
  IPayloadWrapper,
  IPreventEffectsWrapper,
  IProgressWrapper,
  IQueryWrapper,
  IQueueWrapper,
  IRawDataWrapper,
  ISelectedWrapper,
  ITokenWrapper,
  StringNumberT,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import {
  ifNotEmptyThanValue,
  ifNotNilThanValue,
  orUndef,
} from './cond';
import {
  isFn,
  isString,
} from './type';
import { isNewEntity } from './entity';
import {
  coalesce,
  nvl,
  trimmedUndefEmpty,
} from './nvl';
import {
  doesErrorExist,
  inProgress,
  isReady,
} from './wrapper';

/**
 * @stable [17.11.2019]
 * @param {ITokenWrapper} entity
 * @returns {StringNumberT}
 */
export const selectToken = (entity: ITokenWrapper): string =>
  ifNotNilThanValue(entity, (): string => entity.token, UNDEF_SYMBOL);

/**
 * @stable [25.11.2019]
 * @param {IQueueWrapper<TValue>} entity
 * @returns {TValue}
 */
export const selectQueue = <TValue>(entity: IQueueWrapper<TValue>): TValue =>
  ifNotNilThanValue(entity, (): TValue => entity.queue, UNDEF_SYMBOL);

/**
 * @stable [17.11.2019]
 * @param {ITransportWrapperEntity} entity
 * @returns {string}
 */
export const selectTransportWrapperToken = (entity: ITransportWrapperEntity): string =>
  selectToken(selectTransport(entity));

/**
 * @stable [25.11.2019]
 * @param {ITransportWrapperEntity} entity
 * @returns {string[]}
 */
export const selectTransportWrapperQueue = (entity: ITransportWrapperEntity): string[] =>
  selectQueue(selectTransport(entity));

/**
 * @stable [17.11.2019]
 * @param {ITransportWrapperEntity} entity
 * @returns {ITransportEntity}
 */
export const selectTransport = (entity: ITransportWrapperEntity): ITransportEntity =>
  ifNotNilThanValue(entity, (): ITransportEntity => entity.transport, UNDEF_SYMBOL);

/**
 * @stable [20.10.2019]
 * @param {IEntityIdTWrapper} entity
 * @returns {EntityIdT}
 */
export const selectEntityId = (entity: IEntityIdTWrapper): EntityIdT =>
  ifNotNilThanValue(entity, (): EntityIdT => entity.id, UNDEF_SYMBOL);

/**
 * @stable [04.09.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} entity
 * @returns {IEditableEntity<TEntity extends IEntity>}
 */
export const selectEditableEntity =
  <TEntity extends IEntity = IEntity>(entity: IFormWrapperEntity<TEntity>): IEditableEntity<TEntity> =>
    ifNotNilThanValue(entity, (): IEditableEntity<TEntity> => entity.form, UNDEF_SYMBOL);

/**
 * @stable [04.09.2019]
 * @param {IEditableEntity} entity
 * @returns {TResult}
 */
export const selectChanges = <TResult extends IEntity = IEntity>(entity: IEditableEntity): TResult =>
  ifNotNilThanValue(entity, (): TResult => entity.changes as TResult, UNDEF_SYMBOL);

/**
 * @stable [20.12.2019]
 * @param {IEditableEntity} entity
 * @returns {TResult}
 */
export const selectDefaultChanges = <TResult extends IEntity = IEntity>(entity: IEditableEntity): TResult =>
  ifNotNilThanValue(entity, (): TResult => entity.defaultChanges as TResult, UNDEF_SYMBOL);

/**
 * @stable [21.11.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} entity
 * @returns {TEntity}
 */
export const selectEditableEntityChanges =
  <TEntity extends IEntity = IEntity>(entity: IFormWrapperEntity<TEntity>): TEntity =>
    ifNotNilThanValue(entity, (): TEntity => selectChanges<TEntity>(selectEditableEntity(entity)), UNDEF_SYMBOL);

/**
 * @stable [19.10.2019]
 * @param {IListWrapperEntity<TEntity extends IEntity>} entity
 * @returns {IListEntity<TEntity extends IEntity>}
 */
export const selectListEntity =
  <TEntity extends IEntity = IEntity>(entity: IListWrapperEntity<TEntity>): IListEntity<TEntity> =>
    ifNotNilThanValue(entity, (): IListEntity<TEntity> => entity.list, UNDEF_SYMBOL);

/**
 * @stable [18.10.2019]
 * @param {IListEntity} entity
 * @returns {ISortDirectionsEntity}
 */
export const selectListEntityDirections = (entity: IListEntity): ISortDirectionsEntity =>
  ifNotNilThanValue(entity, (): ISortDirectionsEntity => entity.directions, UNDEF_SYMBOL);

/**
 * @stable [28.09.2019]
 * @param {IUserWrapperEntity} entity
 * @returns {IUserEntity}
 */
export const selectUserEntity = (entity: IUserWrapperEntity): IUserEntity =>
  ifNotNilThanValue(entity, (): IUserEntity => entity.user, UNDEF_SYMBOL);

/**
 * @stable [04.09.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {IQueryFilterEntity}
 */
export const selectQueryFilterEntity = (entity: IQueryFilterWrapperEntity): IQueryFilterEntity =>
  ifNotNilThanValue(entity, (): IQueryFilterEntity => entity.filter, UNDEF_SYMBOL);

/**
 * @stable [19.10.2019]
 * @param {IQueryWrapper} entity
 * @returns {string}
 */
export const selectQuery = (entity: IQueryWrapper): string =>
  ifNotNilThanValue(entity, (): string => trimmedUndefEmpty(entity.query), UNDEF_SYMBOL);

/**
 * @stable [27.11.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {string}
 */
export const selectFilterQuery = (entity: IQueryFilterWrapperEntity): string =>
  selectQuery(selectQueryFilterEntity(entity));

/**
 * @stable [19.10.2019]
 * @param {ISelectedWrapper<TEntity extends IEntity>} listEntity
 * @returns {TEntity}
 */
export const selectSelectedEntity =
  <TEntity extends IEntity>(listEntity: ISelectedWrapper<TEntity>): TEntity =>
    ifNotNilThanValue(listEntity, (): TEntity => listEntity.selected, UNDEF_SYMBOL);

/**
 * @stable [19.10.2019]
 * @param {IEffectsAction} action
 * @returns {TEntity}
 */
export const selectSelectedEntityFromAction =
  <TEntity extends IEntity = IEntity>(action: IEffectsAction): TEntity => ifNotNilThanValue(
    action,
    () => ifNotNilThanValue(
      action.data,
      (data: ISelectedWrapper<TEntity>) => data.selected,
      UNDEF_SYMBOL
    ),
    UNDEF_SYMBOL
  );

/**
 * @stable [20.10.2019]
 * @param {IPreviousActionWrapperEntity} data
 * @returns {IEffectsAction}
 */
export const selectPreviousAction = (data: IPreviousActionWrapperEntity): IEffectsAction =>
  ifNotNilThanValue(data, () => data.previousAction, UNDEF_SYMBOL);

/**
 * @stable [20.10.2019]
 * @param {IEffectsAction} action
 * @returns {IEffectsAction}
 */
export const selectPreviousActionFromAction = (action: IEffectsAction): IEffectsAction => ifNotNilThanValue(
  action,
  () => coalesce(selectPreviousAction(action.data), selectPreviousAction(action.initialData), UNDEF),
  UNDEF_SYMBOL
);

/**
 * @stable [20.10.2019]
 * @param {IEffectsAction} action
 * @returns {string}
 */
export const selectPreviousActionTypeFromAction = (action: IEffectsAction): string => ifNotNilThanValue(
  selectPreviousActionFromAction(action), (previousAction) => previousAction.type, UNDEF_SYMBOL
);

/**
 * @stable [20.10.2019]
 * @param {IPreventEffectsWrapper} data
 * @returns {boolean}
 */
export const selectPreventEffects = (data: IPreventEffectsWrapper): boolean =>
  ifNotNilThanValue(
    data,
    () => data.preventEffects,
    UNDEF_SYMBOL
  );

/**
 * @stable [20.10.2019]
 * @param {IEffectsAction} action
 * @returns {boolean}
 */
export const selectPreventEffectsFromAction = (action: IEffectsAction): boolean => ifNotNilThanValue(
  action,
  () => coalesce(selectPreventEffects(action.data), selectPreventEffects(action.initialData), UNDEF),
  UNDEF_SYMBOL
);

/**
 * @stable [19.10.2019]
 * @param {IEffectsAction} action
 * @returns {TEntity}
 */
export const selectPayloadEntityFromAction =
  <TEntity extends IEntity = IEntity>(action: IEffectsAction): TEntity => ifNotNilThanValue(
    action,
    () => ifNotNilThanValue(
      action.data,
      (data: IPayloadWrapper<TEntity>) => data.payload,
      UNDEF_SYMBOL
    ),
    UNDEF_SYMBOL
  );

/**
 * @stable [19.10.2019]
 * @param {IEffectsAction} action
 * @returns {TEntity}
 */
export const selectEntityFromAction =
  <TEntity extends IEntity = IEntity>(action: IEffectsAction): TEntity => ifNotNilThanValue(
    action,
    () => action.data,
    UNDEF_SYMBOL
  );

/**
 * @stable [19.10.2019]
 * @param {IRawDataWrapper<TData>} listEntity
 * @returns {TData}
 */
export const selectListRawDataEntity = <TData = AnyT>(listEntity: IRawDataWrapper<TData>): TData =>
  ifNotNilThanValue(listEntity, (): TData => listEntity.rawData, UNDEF_SYMBOL);

/**
 * @stable [21.11.2019]
 * @param {ITabPanelWrapperEntity} entity
 * @returns {ITabPanelEntity}
 */
export const selectTabPanelEntity = (entity: ITabPanelWrapperEntity): ITabPanelEntity =>
  ifNotNilThanValue(entity, () => entity.tabPanel, UNDEF_SYMBOL);

/**
 * @stable [18.10.2019]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {TData}
 */
export const selectListWrapperRawDataEntity = <TData = AnyT>(listWrapperEntity: IListWrapperEntity): TData =>
  selectListRawDataEntity<TData>(selectListEntity(listWrapperEntity));

/**
 * @stable [19.10.2019]
 * @param {IListWrapperEntity<TEntity extends IEntity>} listWrapperEntity
 * @returns {TEntity}
 */
export const selectListSelectedEntity =
  <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity<TEntity>): TEntity =>
    ifNotNilThanValue<IListEntity<TEntity>, TEntity>(
      selectListEntity<TEntity>(listWrapperEntity),
      (list) => selectSelectedEntity<TEntity>(list),
      UNDEF_SYMBOL
    );

/**
 * @stable [30.08.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {string}
 */
export const selectFilterWrapperQuery = (entity: IQueryFilterWrapperEntity): string => ifNotNilThanValue(
  selectQueryFilterEntity(entity),
  (filterEntity) => selectQuery(filterEntity),
  UNDEF_SYMBOL
);

/**
 * @stable [20.10.2019]
 * @param {EntityIdT} id
 * @returns {IEntityIdTWrapper}
 */
export const mapEntityId = (id: EntityIdT): IEntityIdTWrapper =>
  defValuesFilter<IEntityIdTWrapper, IEntityIdTWrapper>({id});

/**
 * @stable [13.11.2019]
 * @param {ISortDirectionsEntity} directions
 * @returns {ISortDirectionsWrapperEntity}
 */
export const mapSortDirectionsWrapperEntity = (directions: ISortDirectionsEntity): ISortDirectionsWrapperEntity =>
  defValuesFilter<ISortDirectionsWrapperEntity, ISortDirectionsWrapperEntity>({directions});

/**
 * @stable [20.10.2019]
 * @param {IEntityIdTWrapper} entity
 * @returns {IEntityIdTWrapper}
 */
export const mapIdentifiedEntity = (entity: IEntityIdTWrapper): IEntityIdTWrapper =>
  mapEntityId(selectEntityId(entity));

/**
 * @stable [21.11.2019]
 * @param {ITabPanelEntity} tabPanel
 * @returns {ITabPanelWrapperEntity}
 */
export const mapTabPanelEntity = (tabPanel: ITabPanelEntity): ITabPanelWrapperEntity =>
  defValuesFilter<ITabPanelWrapperEntity, ITabPanelWrapperEntity>({tabPanel});

/**
 * @stable [21.11.2019]
 * @param {ITabPanelWrapperEntity} tabPanelWrapperEntity
 * @returns {ITabPanelWrapperEntity}
 */
export const mapTabPanelWrapperEntity = (tabPanelWrapperEntity: ITabPanelWrapperEntity): ITabPanelWrapperEntity =>
  mapTabPanelEntity(selectTabPanelEntity(tabPanelWrapperEntity));

/**
 * @stable [28.09.2019]
 * @param {IUserEntity} user
 * @returns {IUserWrapperEntity}
 */
export const mapUserEntity = (user: IUserEntity): IUserWrapperEntity =>
  defValuesFilter<IUserWrapperEntity, IUserWrapperEntity>({user});

/**
 * @stable [12.10.2019]
 * @param {boolean} disabled
 * @returns {IDisabledWrapper}
 */
export const mapDisabled = (disabled: boolean): IDisabledWrapper =>
  defValuesFilter<IDisabledWrapper, IDisabledWrapper>({disabled});

/**
 * @stable [10.09.2019]
 * @param {string} query
 * @returns {IQueryWrapper}
 */
export const mapQuery = (query: string): IQueryWrapper => defValuesFilter<IQueryWrapper, IQueryWrapper>({query});

/**
 * @stable [04.09.2019]
 * @param {IQueryFilterEntity} filter
 * @returns {IQueryFilterWrapperEntity}
 */
export const mapQueryFilterEntity = (filter: IQueryFilterEntity): IQueryFilterWrapperEntity =>
  defValuesFilter<IQueryFilterWrapperEntity, IQueryFilterWrapperEntity>({filter});

/**
 * @stable [21.11.2019]
 * @param {IEditableEntity<TEntity extends IEntity>} form
 * @returns {IFormWrapperEntity<TEntity extends IEntity>}
 */
export const mapEditableEntity =
  <TEntity extends IEntity = IEntity>(form: IEditableEntity<TEntity>): IFormWrapperEntity<TEntity> =>
    defValuesFilter<IFormWrapperEntity<TEntity>, IFormWrapperEntity<TEntity>>({form});

/**
 * @stable [04.09.2019]
 * @param {IListEntity} list
 * @returns {IListWrapperEntity}
 */
export const mapListEntity = (list: IListEntity): IListWrapperEntity =>
  defValuesFilter<IListWrapperEntity, IListWrapperEntity>({list});

/**
 * @stable [10.09.2019]
 * @param {IPagedEntity} entity
 * @returns {IPagedEntity}
 */
export const mapPagedEntity = (entity: IPagedEntity): IPagedEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IPaginatedEntity, IPaginatedEntity>({
    page: entity.page,
    pageSize: entity.pageSize,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [13.11.2019]
 * @param {ISortDirectionEntity} entity
 * @returns {ISortDirectionEntity}
 */
export const mapSortDirectionEntity = (entity: ISortDirectionEntity): ISortDirectionEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<ISortDirectionEntity, ISortDirectionEntity>({
    index: entity.index,
    direction: entity.direction,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [04.10.2019]
 * @param {IListEntity} entity
 * @param {number} pageSize
 * @returns {IPagedEntity}
 */
export const mapListPagedEntity =
  (entity: IListEntity, pageSize = DEFAULT_PAGE_SIZE): IPagedEntity => ifNotNilThanValue(
    entity,
    () => defValuesFilter<IPagedEntity, IPagedEntity>({
      page: entity.lockPage ? entity.page : FIRST_PAGE,
      pageSize,
    }),
    UNDEF_SYMBOL
  );

/**
 * @stable [12.10.2019]
 * @param {IProgressWrapper} entity
 * @returns {IDisabledWrapper}
 */
export const mapDisabledProgressWrapper = (entity: IProgressWrapper): IDisabledWrapper =>
  mapDisabled(inProgress(entity));

/**
 * @stable [12.10.2019]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {IDisabledWrapper}
 */
export const mapDisabledProgressListWrapperEntity = (listWrapperEntity: IListWrapperEntity): IDisabledWrapper =>
  mapDisabledProgressWrapper(selectListEntity(listWrapperEntity));

/**
 * @stable [04.10.2019]
 * @param {IListWrapperEntity} entity
 * @param {number} pageSize
 * @returns {IPagedEntity}
 */
export const mapListWrapperPagedEntity =
  (entity: IListWrapperEntity, pageSize = DEFAULT_PAGE_SIZE): IPagedEntity =>
    mapListPagedEntity(selectListEntity(entity), pageSize);

/**
 * @stable [10.09.2019]
 * @param {IPaginatedEntity} entity
 * @returns {IPaginatedEntity}
 */
export const mapPaginatedEntity = (entity: IPaginatedEntity): IPaginatedEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IPaginatedEntity, IPaginatedEntity>({
    ...mapPagedEntity(entity),
    totalCount: entity.totalCount,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [04.09.2019]
 * @param {IListWrapperEntity} listWrapper
 * @returns {IListWrapperEntity}
 */
export const mapListWrapperEntity = (listWrapper: IListWrapperEntity): IListWrapperEntity =>
  mapListEntity(selectListEntity(listWrapper));

/**
 * @stable [28.09.2019]
 * @param {IUserWrapperEntity} userWrapper
 * @returns {IUserWrapperEntity}
 */
export const mapUserWrapperEntity = (userWrapper: IUserWrapperEntity): IUserWrapperEntity =>
  mapUserEntity(selectUserEntity(userWrapper));

/**
 * @stable [21.12.2019]
 * @param {TEntity} entity
 * @param {IEditableEntity} editableEntity
 * @returns {IExtendedEntity<TEntity extends IEntity>}
 */
export const mapExtendedEntity =
  <TEntity extends IEntity = IEntity>(entity: TEntity,
                                      editableEntity: IEditableEntity<TEntity>): IExtendedEntity<TEntity> => {
    let originalEntity;
    const newEntity = isNewEntity(entity);
    const defaultChanges = selectDefaultChanges<TEntity>(editableEntity);
    ifNotNilThanValue(
      nvl(defaultChanges, entity),
      () => (originalEntity = {...defaultChanges as {}, ...entity as {}} as TEntity)
    );
    const changes = selectChanges<TEntity>(editableEntity);
    return defValuesFilter<IExtendedEntity<TEntity>, IExtendedEntity<TEntity>>({
      changes,
      entity: {...originalEntity as {}, ...changes as {}} as TEntity,
      entityId: orUndef(!newEntity, () => entity.id),
      newEntity,
      originalEntity,
    });
  };

/**
 * @stable [06.09.2019]
 * @param {IListWrapperEntity} listWrapper
 * @param {IEditableEntity} editableEntity
 * @returns {IExtendedEntity<TEntity extends IEntity>}
 */
export const mapListSelectedExtendedEntity =
  <TEntity extends IEntity>(listWrapper: IListWrapperEntity<TEntity>,
                            editableEntity: IEditableEntity<TEntity>): IExtendedEntity<TEntity> =>
    mapExtendedEntity<TEntity>(
      selectListSelectedEntity(listWrapper),
      editableEntity
    );

/**
 * @stable [04.09.2019]
 * @param {IQueryFilterWrapperEntity} queryFilter
 * @returns {IQueryFilterWrapperEntity}
 */
export const mapQueryFilterWrapperEntity = (queryFilter: IQueryFilterWrapperEntity): IQueryFilterWrapperEntity =>
  mapQueryFilterEntity(selectQueryFilterEntity(queryFilter));

/**
 * @stable [10.09.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {IQueryWrapper}
 */
export const mapFilterWrapperQuery = (entity: IQueryFilterWrapperEntity): IQueryWrapper =>
  mapQuery(selectFilterWrapperQuery(entity));

/**
 * @stable [17.09.2019]
 * @param {boolean} actionsDisabled
 * @returns {IActionsDisabledWrapper}
 */
export const mapActionsDisabled = (actionsDisabled: boolean): IActionsDisabledWrapper =>
  defValuesFilter<IActionsDisabledWrapper, IActionsDisabledWrapper>({actionsDisabled});

/**
 * @stable [17.09.2019]
 * @param {IListEntity} list
 * @returns {IActionsDisabledWrapper}
 */
export const mapListActionsDisabled = (list: IListEntity): IActionsDisabledWrapper =>
  mapActionsDisabled(inProgress(list));

/**
 * @stable [17.09.2019]
 * @param {IListWrapperEntity} listWrapper
 * @returns {}
 */
export const mapListWrapperActionsDisabled = (listWrapper: IListWrapperEntity): IActionsDisabledWrapper =>
  mapListActionsDisabled(selectListEntity(listWrapper));

/**
 * @stable [11.10.2019]
 * @param {TEntity[] | TEntity} data
 * @returns {Array<ISelectOptionEntity<TEntity extends IOptionEntity>>}
 */
export const mapSelectOptions = <TEntity extends IOptionEntity>(data: TEntity[] | TEntity): Array<ISelectOptionEntity<TEntity>> =>
  ifNotNilThanValue(
    data,
    (entities) => [].concat(entities)
      .map((entity) => defValuesFilter<ISelectOptionEntity<TEntity>, ISelectOptionEntity<TEntity>>({
        value: entity.id,
        label: entity.name,
        disabled: entity.disabled,
        rawData: entity,
      })),
    UNDEF_SYMBOL
  );

/**
 * @stable [18.09.2019]
 * @param {IEditableEntity} editableEntity
 * @returns {ToolbarToolsEnum[]}
 */
export const selectEditableEntityToolbarToolsActiveFilter = (editableEntity: IEditableEntity): ToolbarToolsEnum[] =>
  ifNotEmptyThanValue(
    selectChanges(editableEntity),
    () => [ToolbarToolsEnum.FILTER],
    []
  );

/**
 * @stable [18.09.2019]
 * @param {IFormWrapperEntity} entityFormEntity
 * @returns {ToolbarToolsEnum[]}
 */
export const selectFormEntityToolbarToolsActiveFilter = (entityFormEntity: IFormWrapperEntity): ToolbarToolsEnum[] =>
  selectEditableEntityToolbarToolsActiveFilter(selectEditableEntity(entityFormEntity));

/**
 * @stable [11.10.2019]
 * @param {IDictionaryEntity<TEntity>} dictionaryEntity
 * @param {(data: (TEntity[] | TEntity)) => TResult} accessor
 * @returns {TEntity[] | TEntity | TResult}
 */
export const mapDictionaryEntityData = <TEntity, TResult = TEntity | TEntity[]>(
  dictionaryEntity: IDictionaryEntity<TEntity>,
  accessor?: (data: TEntity | TEntity[]) => TResult): TResult | TEntity | TEntity[] =>
  ifNotNilThanValue(
    dictionaryEntity,
    () => ifNotNilThanValue(
      dictionaryEntity.data,
      (data) => isFn(accessor) ? accessor(data) : data,
      UNDEF_SYMBOL
    ),
    UNDEF_SYMBOL
  );

/**
 * @stable [11.10.2019]
 * @param {IDictionaryEntity<TDictionaryEntity>} dictionaryEntity
 * @returns {Array<ISelectOptionEntity<TDictionaryEntity>>}
 */
export const mapDictionaryEntity = <TDictionaryEntity>(
  dictionaryEntity: IDictionaryEntity<TDictionaryEntity>): Array<ISelectOptionEntity<TDictionaryEntity>> =>
  mapSelectOptions<TDictionaryEntity>(
    mapDictionaryEntityData<TDictionaryEntity>(dictionaryEntity)
  );

/**
 * @stable [25.11.2019]
 * @param {string[]} queue
 * @param {string | IOperationEntity} operations
 * @returns {boolean}
 */
export const hasQueueOperations = (queue: string[],
                                   ...operations: Array<string | IOperationEntity>): boolean =>
  !R.isEmpty(
    R.intersection(
      queue,
      operations.map((operation) => (
        isString(operation)
          ? operation as string
          : (operation as IOperationEntity).id
      ))
    )
  );

/**
 * @stable [25.11.2019]
 * @param {ITransportWrapperEntity} entity
 * @param {string | IOperationEntity} operations
 * @returns {boolean}
 */
export const hasTransportWrapperQueueOperations = (entity: ITransportWrapperEntity,
                                                   ...operations: Array<string | IOperationEntity>): boolean =>
  hasQueueOperations(selectTransportWrapperQueue(entity), ...operations);

/**
 * @stable [28.11.2019]
 * @param {IUniversalApplicationEntity} entity
 * @returns {boolean}
 */
export const isApplicationInProgress = (entity: IUniversalApplicationEntity): boolean => inProgress(entity);

/**
 * @stable [28.11.2019]
 * @param {IUniversalApplicationEntity} entity
 * @returns {boolean}
 */
export const doesApplicationErrorExist = (entity: IUniversalApplicationEntity): boolean => doesErrorExist(entity);

/**
 * @stable [28.11.2019]
 * @param {IUniversalApplicationEntity} entity
 * @returns {boolean}
 */
export const isApplicationMessageVisible = (entity: IUniversalApplicationEntity): boolean =>
  isApplicationInProgress(entity) || doesApplicationErrorExist(entity) || !isReady(entity);

/**
 * @stable [18.12.2019]
 * @param {IStackWrapperEntity} entity
 * @returns {IStackEntity}
 */
export const selectStackEntity = (entity: IStackWrapperEntity): IStackEntity =>
  ifNotNilThanValue(entity, () => entity.stack, UNDEF_SYMBOL);

/**
 * @stable [18.12.2019]
 * @param {IStackEntity} entity
 * @returns {IStackItemEntity[]}
 */
export const selectStackItemEntities = (entity: IStackEntity): IStackItemEntity[] =>
  ifNotNilThanValue(entity, (data) => data.stack, UNDEF_SYMBOL);

/**
 * @stable [18.12.2019]
 * @param {IStackWrapperEntity} entity
 * @returns {IStackItemEntity[]}
 */
export const selectStackWrapperItemEntities = (entity: IStackWrapperEntity): IStackItemEntity[] =>
  selectStackItemEntities(selectStackEntity(entity));
