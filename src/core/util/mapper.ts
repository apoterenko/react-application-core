import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { defValuesFilter } from './filter';
import {
  IApiEntity,
  IChannelWrapperEntity,
  IExtendedEntity,
  IExtendedFormEntity,
  IFormEntity,
  IFormTabPanelContainerProps,
  IGenericChannelEntity,
  IGenericContainer,
  IGenericNotificationEntity,
  IGenericStoreEntity,
  IGenericTabPanelEntity,
  IHeaderProps,
  INamedEntity,
  INotificationWrapperEntity,
  IOperationEntity,
  IPresetsRawDataLabeledValueEntity,
  IPresetsSelectableHoveredEntity,
  IReduxFormEntity,
  IReduxSortDirectionsEntity,
  ISortDirectionEntity,
  ISortDirectionsEntity,
  ITabPanelEntity,
  ITransportEntity,
  ITransportWrapperEntity,
  IUniversalApplicationEntity,
  IUnsavedFormChangesDialogContainerProps,
} from '../definition';
import {
  AnyT,
  EntityIdT,
  IActiveValueWrapper,
  IChannelWrapper,
  IEntity,
  IEntityIdTWrapper,
  IErrorWrapper,
  INotificationWrapper,
  ITransportWrapper,
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
  selectEntityId,
  selectNotification,
  Selectors,
  selectToken,
  selectTransport,
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
  Selectors.queue(selectTransport(entity));

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
 * @returns {IPresetsRawDataLabeledValueEntity}
 */
export const mapExtendedLabeledValueEntity = (entity: INamedEntity) =>
  defValuesFilter<IPresetsRawDataLabeledValueEntity, IPresetsRawDataLabeledValueEntity>({
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
 * @stable [14.04.2020]
 * @param {IGenericStoreEntity<TDictionaries>} entity
 * @returns {IGenericStoreEntity<TDictionaries>}
 */
export const mapStoreEntity =
  <TDictionaries = {}>(entity: IGenericStoreEntity<TDictionaries>): IGenericStoreEntity<TDictionaries> =>
    ({
      ...GenericMappers.storeEntity(entity),
      ...mapChannelWrapperEntity(entity),
      ...mapNotificationWrapperEntity(entity),
      ...GenericMappers.sectionNameWrapper(entity),
      ...mapTransportWrapperEntity(entity),
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
  public static readonly holderDictionariesEntity = GenericMappers.holderDictionariesEntity;                                                                 /* @stable [09.06.2020] */
  public static readonly holderUserEntity = GenericMappers.holderUserEntity;                                                                                 /* @stable [09.06.2020] */
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
  public static readonly storeEntity = GenericMappers.storeEntity;                                                                                           /* @stable [09.06.2020] */
  public static readonly toolbarToolsContainerProps = ComponentMappers.toolbarToolsContainerProps;                                                           /* @stable [09.05.2020] */
  public static readonly toolbarToolsContainerPropsAsToolbarTools = ComponentMappers.toolbarToolsContainerPropsAsToolbarTools;                               /* @stable [10.05.2020] */
  public static readonly toolbarToolsSecondaryFilterContainerProps = ComponentMappers.toolbarToolsSecondaryFilterContainerProps;                             /* @stable [10.05.2020] */
}
