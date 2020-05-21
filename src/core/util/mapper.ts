import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { defValuesFilter } from './filter';
import {
  IApiEntity,
  IChannelWrapperEntity,
  IDictionariesEntity,
  IExtendedEntity,
  IExtendedFormEntity,
  IExtendedLabeledValueEntity,
  IFormEntity,
  IFormTabPanelContainerProps,
  IGenericChannelEntity,
  IGenericContainer,
  IGenericNotificationEntity,
  IGenericStackEntity,
  IGenericStoreEntity,
  IGenericTabPanelEntity,
  IHeaderProps,
  INamedEntity,
  INotificationWrapperEntity,
  IOperationEntity,
  IPresetsSelectableHoveredEntity,
  IReduxDictionariesEntity,
  IReduxFormEntity,
  IReduxSortDirectionsEntity,
  ISortDirectionEntity,
  ISortDirectionsEntity,
  IStackItemEntity,
  IStackWrapperEntity,
  ITabPanelEntity,
  ITransportEntity,
  ITransportWrapperEntity,
  IUniversalApplicationEntity,
  IUnsavedFormChangesDialogContainerProps,
  IUserEntity,
  IUserWrapperEntity,
} from '../definition';
import {
  AnyT,
  EntityIdT,
  IActiveValueWrapper,
  IChannelWrapper,
  IDictionariesWrapper,
  IEntity,
  IEntityIdTWrapper,
  IErrorWrapper,
  INotificationWrapper,
  IStackWrapper,
  ITransportWrapper,
  IUserWrapper,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { ConditionUtils } from './cond';
import { TypeUtils } from './type';
import {
  doesErrorExist,
  inProgress,
  isReady,
} from './wrapper';
import {
  selectActiveValue,
  selectChannel,
  selectDictionaries,
  selectEntityId,
  selectNotification,
  Selectors,
  selectQueue,
  selectStack,
  selectToken,
  selectTransport,
  selectUser,
} from './select';
import { GenericMappers } from './mapper-generic';
import { ComponentMappers } from './mapper-component';

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
 * @stable [13.02.2020]
 * @param {TErrorWrapper} entity
 * @returns {TResult}
 */
export const selectError =
  <TResult = AnyT, TErrorWrapper extends IErrorWrapper<TResult> = IErrorWrapper<TResult>>(entity: TErrorWrapper): TResult =>
    R.isNil(entity) ? UNDEF : entity.error;

/**
 * @stable [13.02.2020]
 * @param {IEffectsAction} action
 * @returns {TResult}
 */
export const selectErrorFromAction = <TResult = AnyT>(action: IEffectsAction): TResult => selectError(action);

/**
 * @stable [20.10.2019]
 * @param {EntityIdT} id
 * @returns {IEntityIdTWrapper}
 */
export const mapEntityId = (id: EntityIdT): IEntityIdTWrapper =>
  defValuesFilter<IEntityIdTWrapper, IEntityIdTWrapper>({id});

/**
 * @stable [13.11.2019]
 * @param {IReduxSortDirectionsEntity} directions
 * @returns {ISortDirectionsEntity}
 */
export const mapSortDirectionsWrapperEntity = (directions: IReduxSortDirectionsEntity): ISortDirectionsEntity =>
  defValuesFilter<ISortDirectionsEntity, ISortDirectionsEntity>({directions});

/**
 * @stable [20.10.2019]
 * @param {IEntityIdTWrapper} entity
 * @returns {IEntityIdTWrapper}
 */
export const mapIdentifiedEntity = (entity: IEntityIdTWrapper): IEntityIdTWrapper =>
  mapEntityId(selectEntityId(entity));

/**
 * @stable [10.02.2020]
 * @param {IGenericTabPanelEntity} tabPanel
 * @returns {ITabPanelEntity}
 */
export const mapTabPanelEntity = (tabPanel: IGenericTabPanelEntity): ITabPanelEntity =>
  defValuesFilter<ITabPanelEntity, ITabPanelEntity>({tabPanel});

/**
 * @stable [21.11.2019]
 * @param {ITabPanelEntity} tabPanelWrapperEntity
 * @returns {ITabPanelEntity}
 */
export const mapTabPanelWrapperEntity = (tabPanelWrapperEntity: ITabPanelEntity): ITabPanelEntity =>
  mapTabPanelEntity(Selectors.tabPanel(tabPanelWrapperEntity));

/**
 * @stable [30.03.2020]
 * @param {TUser} user
 * @returns {IUserWrapper<TUser>}
 */
export const mapUser = <TUser = IUserEntity>(user: TUser): IUserWrapper<TUser> =>
  defValuesFilter<IUserWrapper<TUser>, IUserWrapper<TUser>>({user});

/**
 * @stable [14.04.2020]
 * @param {TValue} stack
 * @returns {IStackWrapper<TValue>}
 */
export const mapStack = <TValue>(stack: TValue): IStackWrapper<TValue> =>
  defValuesFilter<IStackWrapper<TValue>, IStackWrapper<TValue>>({stack});

/**
 * @stable [14.04.2020]
 * @param {TValue} notification
 * @returns {INotificationWrapper<TValue>}
 */
export const mapNotification = <TValue>(notification: TValue): INotificationWrapper<TValue> =>
  defValuesFilter<INotificationWrapper<TValue>, INotificationWrapper<TValue>>({notification});

/**
 * @stable [14.04.2020]
 * @param {TValue} channel
 * @returns {IChannelWrapper<TValue>}
 */
export const mapChannel = <TValue>(channel: TValue): IChannelWrapper<TValue> =>
  defValuesFilter<IChannelWrapper<TValue>, IChannelWrapper<TValue>>({channel});

/**
 * @stable [14.04.2020]
 * @param {TValue} transport
 * @returns {ITransportWrapper<TValue>}
 */
export const mapTransport = <TValue>(transport: TValue): ITransportWrapper<TValue> =>
  defValuesFilter<ITransportWrapper<TValue>, ITransportWrapper<TValue>>({transport});

/**
 * @stable [14.04.2020]
 * @param {TValue} dictionaries
 * @returns {IDictionariesWrapper<TValue>}
 */
export const mapDictionaries = <TValue>(dictionaries: TValue): IDictionariesWrapper<TValue> =>
    defValuesFilter<IDictionariesWrapper<TValue>, IDictionariesWrapper<TValue>>({dictionaries});

/**
 * @stable [12.04.2020]
 * @param {TActiveValue} activeValue
 * @returns {IActiveValueWrapper<TActiveValue>}
 */
export const mapActiveValue = <TActiveValue>(activeValue: TActiveValue): IActiveValueWrapper<TActiveValue> =>
  defValuesFilter<IActiveValueWrapper<TActiveValue>, IActiveValueWrapper<TActiveValue>>({activeValue});

/**
 * TODO
 * @deprecated Use mapForm
 */
export const mapEditableEntity =
  <TEntity extends IEntity = IEntity>(form: IReduxFormEntity<TEntity>): IExtendedFormEntity<TEntity> =>
    defValuesFilter<IExtendedFormEntity<TEntity>, IExtendedFormEntity<TEntity>>({form});

/**
 * @stable [04.05.2020]
 * @mapper
 *
 * @param {IPresetsSelectableHoveredEntity} entity
 * @returns {IPresetsSelectableHoveredEntity}
 */
const mapSelectableHoveredEntity =
  (entity: IPresetsSelectableHoveredEntity): IPresetsSelectableHoveredEntity => ConditionUtils.ifNotNilThanValue(
    entity,
    () => defValuesFilter<IPresetsSelectableHoveredEntity, IPresetsSelectableHoveredEntity>({
      hovered: entity.hovered,
      selectable: entity.selectable,
    }),
    UNDEF_SYMBOL
  );

/**
 * @stable [13.11.2019]
 * @param {ISortDirectionEntity} entity
 * @returns {ISortDirectionEntity}
 */
export const mapSortDirectionEntity = (entity: ISortDirectionEntity): ISortDirectionEntity => ConditionUtils.ifNotNilThanValue(
  entity,
  () => defValuesFilter<ISortDirectionEntity, ISortDirectionEntity>({
    index: entity.index,
    direction: entity.direction,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [30.03.2020]
 * @param {IUserWrapperEntity<TEntity>} wrapper
 * @returns {IUserWrapperEntity<TEntity>}
 */
export const mapUserWrapperEntity =
  <TEntity = IUserEntity>(wrapper: IUserWrapperEntity<TEntity>): IUserWrapperEntity<TEntity> =>
    mapUser(selectUser(wrapper));

/**
 * @stable [30.03.2020]
 * @param {IStackWrapperEntity<TEntity>} wrapper
 * @returns {IStackWrapperEntity<TEntity>}
 */
export const mapStackWrapperEntity =
  <TEntity = IGenericStackEntity>(wrapper: IStackWrapperEntity<TEntity>): IStackWrapperEntity<TEntity> =>
    mapStack(selectStack(wrapper));

/**
 * @stable [14.04.2020]
 * @param {INotificationWrapperEntity<TEntity>} wrapper
 * @returns {INotificationWrapperEntity<TEntity>}
 */
export const mapNotificationWrapperEntity =
  <TEntity = IGenericNotificationEntity>(wrapper: INotificationWrapperEntity<TEntity>): INotificationWrapperEntity<TEntity> =>
    mapNotification(selectNotification(wrapper));

/**
 * @stable [14.04.2020]
 * @param {IChannelWrapperEntity<TEntity>} wrapper
 * @returns {IChannelWrapperEntity<TEntity>}
 */
export const mapChannelWrapperEntity =
  <TEntity = IGenericChannelEntity>(wrapper: IChannelWrapperEntity<TEntity>): IChannelWrapperEntity<TEntity> =>
    mapChannel(selectChannel(wrapper));

/**
 * @stable [28.03.2020]
 * @param {ITransportWrapperEntity<TTransport>} wrapper
 * @returns {ITransportWrapperEntity<TTransport>}
 */
export const mapTransportWrapperEntity =
  <TTransport = ITransportEntity>(wrapper: ITransportWrapperEntity<TTransport>): ITransportWrapperEntity<TTransport> =>
    mapTransport(selectTransport(wrapper));

/**
 * @stable [28.03.2020]
 * @param {IDictionariesEntity<TDictionaries>} wrapper
 * @returns {IDictionariesEntity<TDictionaries>}
 */
export const mapDictionariesWrapperEntity =
  <TDictionaries = IReduxDictionariesEntity>(wrapper: IDictionariesEntity<TDictionaries>): IDictionariesEntity<TDictionaries> =>
    mapDictionaries(selectDictionaries(wrapper));

/**
 * @stable [12.04.2020]
 * @param {IActiveValueWrapper<TValue>} wrapper
 * @returns {IActiveValueWrapper<TValue>}
 */
export const mapActiveValueWrapper = <TValue>(wrapper: IActiveValueWrapper<TValue>): IActiveValueWrapper<TValue> =>
  mapActiveValue(selectActiveValue(wrapper));

/**
 * @deprecated
 */
export const mapNewExtendedEntity =
  <TEntity extends IEntity = IEntity>(editableEntity: IReduxFormEntity<TEntity>): IExtendedEntity<TEntity> =>
    GenericMappers.entityAsExtendedEntity(editableEntity);

/**
 * @stable [23.12.2019]
 * @param {IExtendedEntity<TEntity>} extendedEntity
 * @returns {IApiEntity<TEntity>}
 */
export const mapApiEntity =
  <TEntity = IEntity>(extendedEntity: IExtendedEntity<TEntity>): IApiEntity<TEntity> => {
    const {
      changes,
      entity,
      originalEntity,
    } = extendedEntity;

    const entityId = selectEntityId(entity);
    const newEntity = R.isNil(entityId);

    return defValuesFilter<IApiEntity<TEntity>, IApiEntity<TEntity>>({
      changes,
      diff: newEntity ? entity : changes,
      entity,
      entityId,
      newEntity,
      originalEntity,
    });
  };

/**
 * @stable [22.04.2020]
 * @param {INamedEntity} entity
 * @returns {IExtendedLabeledValueEntity}
 */
export const mapExtendedLabeledValueEntity = (entity: INamedEntity) =>
  defValuesFilter<IExtendedLabeledValueEntity, IExtendedLabeledValueEntity>({
    value: entity.id,
    label: entity.name || String(entity.id),
    rawData: entity,
  });

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
        TypeUtils.isString(operation)
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
 * @returns {IGenericStackEntity}
 */
export const selectStackEntity = (entity: IStackWrapperEntity): IGenericStackEntity =>
  ConditionUtils.ifNotNilThanValue(entity, () => entity.stack, UNDEF_SYMBOL);

/**
 * @stable [18.12.2019]
 * @param {IGenericStackEntity} entity
 * @returns {IStackItemEntity[]}
 */
export const selectStackItemEntities = (entity: IGenericStackEntity): IStackItemEntity[] =>
  ConditionUtils.ifNotNilThanValue(entity, (data) => data.stack, UNDEF_SYMBOL);

/**
 * @stable [18.12.2019]
 * @param {IStackWrapperEntity} entity
 * @returns {IStackItemEntity[]}
 */
export const selectStackWrapperItemEntities = (entity: IStackWrapperEntity): IStackItemEntity[] =>
  selectStackItemEntities(selectStackEntity(entity));

/**
 * @stable [14.04.2020]
 * @param {IGenericStoreEntity<TDictionaries>} entity
 * @returns {IGenericStoreEntity<TDictionaries>}
 */
export const mapStoreEntity =
  <TDictionaries = {}>(entity: IGenericStoreEntity<TDictionaries>): IGenericStoreEntity<TDictionaries> =>
    ({
      ...mapChannelWrapperEntity(entity),
      ...mapDictionariesWrapperEntity(entity),
      ...GenericMappers.layoutEntity(entity),
      ...mapNotificationWrapperEntity(entity),
      ...GenericMappers.sectionNameWrapper(entity),
      ...mapStackWrapperEntity(entity),
      ...mapTransportWrapperEntity(entity),
      ...mapUserWrapperEntity(entity),
    });

/**
 * @container-props-mapper
 * @stable [13.04.2020]
 *
 * @param {IFormTabPanelContainerProps} props
 * @returns {IFormTabPanelContainerProps}
 */
export const mapFormTabPanelContainerProps = (props: IFormTabPanelContainerProps): IFormTabPanelContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.formEntity(props),
  });

/**
 * @container-props-mapper
 * @stable [23.04.2020]
 *
 * @param {IFormEntity<TEntity>} props
 * @param {IGenericContainer} proxyContainer
 * @returns {IUnsavedFormChangesDialogContainerProps}
 */
export const mapUnsavedFormChangesDialogContainerProps =
  <TEntity = IEntity>(props: IFormEntity<TEntity>,
                      proxyContainer: IGenericContainer): IUnsavedFormChangesDialogContainerProps =>
    ({
      dialogConfiguration: GenericMappers.formEntity(props),
      proxyContainer,
    });

const mapHeaderProps = (props: IHeaderProps): IHeaderProps => mapStoreEntity(props);

/**
 * @stable [05.05.2020]
 */
export class Mappers {
  public static readonly dictionaryEntityAsSelectEntity = GenericMappers.dictionaryEntityAsSelectEntity;                                                     /* @stable [19.05.2020] */
  public static readonly dictionaryEntityAsSelectOptionEntities = GenericMappers.dictionaryEntityAsSelectOptionEntities;                                     /* @stable [19.05.2020] */
  public static readonly entityAsExtendedEntity = GenericMappers.entityAsExtendedEntity;                                                                     /* @stable [10.05.2020] */
  public static readonly entityAsExtendedFormEntity = GenericMappers.entityAsExtendedFormEntity;                                                             /* @stable [10.05.2020] */
  public static readonly filterFormDialogContainerProps = ComponentMappers.filterFormDialogContainerProps;                                                   /* @stable [10.05.2020] */
  public static readonly filterFormDialogSecondaryFilterContainerProps = ComponentMappers.filterFormDialogSecondaryFilterContainerProps;                     /* @stable [10.05.2020] */
  public static readonly form = GenericMappers.form;                                                                                                         /* @stable [08.05.2020] */
  public static readonly formContainerProps = ComponentMappers.formContainerProps;                                                                           /* @stable [08.05.2020] */
  public static readonly formContainerPropsAsFormProps = ComponentMappers.formContainerPropsAsFormProps;                                                     /* @stable [09.05.2020] */
  public static readonly formEntity = GenericMappers.formEntity;                                                                                             /* @stable [08.05.2020] */
  public static readonly formPrimaryFilterContainerProps = ComponentMappers.formPrimaryFilterContainerProps;                                                 /* @stable [10.05.2020] */
  public static readonly fullSearchFilter = GenericMappers.fullSearchFilter;                                                                                 /* @stable [10.05.2020] */
  public static readonly headerProps = mapHeaderProps;
  public static readonly listContainerProps = ComponentMappers.listContainerProps;                                                                           /* @stable [10.05.2020] */
  public static readonly listEntity = GenericMappers.listEntity;                                                                                             /* @stable [08.05.2020] */
  public static readonly listEntityAsDisabled = GenericMappers.listEntityAsDisabled;                                                                         /* @stable [08.05.2020] */
  public static readonly listEntityAsPagedEntity = GenericMappers.listEntityAsPagedEntity;                                                                   /* @stable [08.05.2020] */
  public static readonly listSelectedEntityAsExtendedFormEntity = GenericMappers.listSelectedEntityAsExtendedFormEntity;                                     /* @stable [08.05.2020] */
  public static readonly optionEntitiesAsSelectOptionEntities = GenericMappers.optionEntitiesAsSelectOptionEntities;                                         /* @stable [19.05.2020] */
  public static readonly pagedEntity = GenericMappers.pagedEntity;
  public static readonly pageToolbarContainerProps = ComponentMappers.pageToolbarContainerProps;
  public static readonly paginatedEntity = GenericMappers.paginatedEntity;
  public static readonly placeFieldProps = ComponentMappers.placeFieldProps;                                                                                 /* @stable [19.05.2020] */
  public static readonly primaryFilterEntityAsPrimaryFilterExtendedFormEntity = GenericMappers.primaryFilterEntityAsPrimaryFilterExtendedFormEntity;         /* @stable [10.05.2020] */
  public static readonly queryFilterEntity = GenericMappers.queryFilterEntity;
  public static readonly queryFilterEntityAsQuery = GenericMappers.queryFilterEntityAsQuery;
  public static readonly searchToolbarContainerProps = ComponentMappers.searchToolbarContainerProps;
  public static readonly secondaryFilterEntityAsSecondaryFilterExtendedFormEntity = GenericMappers.secondaryFilterEntityAsSecondaryFilterExtendedFormEntity; /* @stable [10.05.2020] */
  public static readonly sectionNameWrapper = GenericMappers.sectionNameWrapper;
  public static readonly selectableHoveredEntity = mapSelectableHoveredEntity;
  public static readonly selectedExtendedFormEntityAsFinalEntity = GenericMappers.listSelectedExtendedFormEntityAsFinalEntity;                               /* @stable [10.05.2020] */
  public static readonly toolbarToolsContainerProps = ComponentMappers.toolbarToolsContainerProps;                                                           /* @stable [09.05.2020] */
  public static readonly toolbarToolsContainerPropsAsToolbarTools = ComponentMappers.toolbarToolsContainerPropsAsToolbarTools;                               /* @stable [10.05.2020] */
  public static readonly toolbarToolsSecondaryFilterContainerProps = ComponentMappers.toolbarToolsSecondaryFilterContainerProps;                             /* @stable [10.05.2020] */
}
