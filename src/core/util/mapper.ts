import * as R from 'ramda';

import { defValuesFilter } from './filter';
import {
  IApiEntity,
  IExtendedEntity,
  IExtendedFormEntity,
  IFormTabPanelContainerProps,
  IGenericTabPanelEntity,
  IHeaderProps,
  INamedEntity,
  IOperationEntity,
  IPresetsRawDataLabeledValueEntity,
  IPresetsSelectableHoveredEntity,
  IReduxFormEntity,
  IReduxSortDirectionsEntity,
  ISortDirectionEntity,
  ISortDirectionsEntity,
  ITabPanelEntity,
  IReduxHolderTransportEntity,
  IUniversalApplicationEntity,
} from '../definition';
import {
  AnyT,
  EntityIdT,
  IActiveValueWrapper,
  IEntity,
  IEntityIdTWrapper,
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
  selectEntityId,
  Selectors,
  selectToken,
} from './select';
import { GenericMappers } from './mapper-generic';
import { ComponentMappers } from './mapper-component';

/**
 * @stable [17.11.2019]
 * @param {IReduxHolderTransportEntity} entity
 * @returns {string}
 */
export const selectTransportWrapperToken = (entity: IReduxHolderTransportEntity): string =>
  selectToken(Selectors.transport(entity));

/**
 * @stable [25.11.2019]
 * @param {IReduxHolderTransportEntity} entity
 * @returns {string[]}
 */
export const selectTransportWrapperQueue = (entity: IReduxHolderTransportEntity): string[] =>
  Selectors.queue(Selectors.transport(entity));

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
 * @param {IReduxHolderTransportEntity} entity
 * @param {string | IOperationEntity} operations
 * @returns {boolean}
 */
export const hasTransportWrapperQueueOperations = (entity: IReduxHolderTransportEntity,
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
 * @container-props-mapper
 * @stable [13.04.2020]
 *
 * @param {IFormTabPanelContainerProps} props
 * @returns {IFormTabPanelContainerProps}
 */
export const mapFormTabPanelContainerProps = (props: IFormTabPanelContainerProps): IFormTabPanelContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.holderFormEntity(props),
  });

const mapHeaderProps = (props: IHeaderProps): IHeaderProps => GenericMappers.storeEntity(props);

/**
 * @stable [05.05.2020]
 */
// tslint:disable:max-line-length
export class Mappers {
  public static readonly defaultLayoutContainerProps = ComponentMappers.defaultLayoutContainerProps;                                                                                        /* @stable [12.06.2020] */
  public static readonly dictionaryEntityAsSelectEntity = GenericMappers.dictionaryEntityAsSelectEntity;                                                                                    /* @stable [19.05.2020] */
  public static readonly dictionaryEntityAsSelectOptionEntities = GenericMappers.dictionaryEntityAsSelectOptionEntities;                                                                    /* @stable [19.05.2020] */
  public static readonly entityAsExtendedEntity = GenericMappers.entityAsExtendedEntity;                                                                                                    /* @stable [10.05.2020] */
  public static readonly entityAsExtendedFormEntity = GenericMappers.entityAsExtendedFormEntity;                                                                                            /* @stable [10.05.2020] */
  public static readonly filterFormDialogContainerProps = ComponentMappers.filterFormDialogContainerProps;                                                                                  /* @stable [10.05.2020] */
  public static readonly filterFormDialogSecondaryFilterContainerProps = ComponentMappers.filterFormDialogSecondaryFilterContainerProps;                                                    /* @stable [10.05.2020] */
  public static readonly form = GenericMappers.form;                                                                                                                                        /* @stable [08.05.2020] */
  public static readonly formContainerProps = ComponentMappers.formContainerProps;                                                                                                          /* @stable [08.05.2020] */
  public static readonly formContainerPropsAsFormProps = ComponentMappers.formContainerPropsAsFormProps;                                                                                    /* @stable [09.05.2020] */
  public static readonly formPrimaryFilterContainerProps = ComponentMappers.formPrimaryFilterContainerProps;                                                                                /* @stable [10.05.2020] */
  public static readonly fullSearchFilter = GenericMappers.fullSearchFilter;                                                                                                                /* @stable [10.05.2020] */
  public static readonly headerProps = mapHeaderProps;
  public static readonly holderFormEntity = GenericMappers.holderFormEntity;                                                                                                                /* @stable [12.06.2020] */
  public static readonly holderListEntity = GenericMappers.holderListEntity;                                                                                                                /* @stable [12.06.2020] */
  public static readonly holderTransportEntity = GenericMappers.holderTransportEntity;                                                                                                      /* @stable [12.06.2020] */
  public static readonly listContainerProps = ComponentMappers.listContainerProps;                                                                                                          /* @stable [10.05.2020] */
  public static readonly listEntityAsDisabled = GenericMappers.listEntityAsDisabled;                                                                                                        /* @stable [08.05.2020] */
  public static readonly listEntityAsPagedEntity = GenericMappers.listEntityAsPagedEntity;                                                                                                  /* @stable [08.05.2020] */
  public static readonly listSelectedEntityAsExtendedFormEntity = GenericMappers.listSelectedEntityAsExtendedFormEntity;                                                                    /* @stable [08.05.2020] */
  public static readonly optionEntitiesAsSelectOptionEntities = GenericMappers.optionEntitiesAsSelectOptionEntities;                                                                        /* @stable [19.05.2020] */
  public static readonly pagedEntity = GenericMappers.pagedEntity;
  public static readonly pageToolbarContainerProps = ComponentMappers.pageToolbarContainerProps;
  public static readonly pageToolbarContainerPropsAsPageToolbarProps = ComponentMappers.pageToolbarContainerPropsAsPageToolbarProps;                                                        /* @stable [15.06.2020] */
  public static readonly paginatedEntity = GenericMappers.paginatedEntity;
  public static readonly placeFieldProps = ComponentMappers.placeFieldProps;                                                                                                                /* @stable [19.05.2020] */
  public static readonly primaryFilterEntityAsPrimaryFilterExtendedFormEntity = GenericMappers.primaryFilterEntityAsPrimaryFilterExtendedFormEntity;                                        /* @stable [10.05.2020] */
  public static readonly queryFilterEntity = GenericMappers.queryFilterEntity;
  public static readonly queryFilterEntityAsQuery = GenericMappers.queryFilterEntityAsQuery;
  public static readonly searchToolbarContainerProps = ComponentMappers.searchToolbarContainerProps;
  public static readonly secondaryFilterEntityAsSecondaryFilterExtendedFormEntity = GenericMappers.secondaryFilterEntityAsSecondaryFilterExtendedFormEntity;                                /* @stable [10.05.2020] */
  public static readonly sectionNameWrapper = GenericMappers.sectionNameWrapper;
  public static readonly selectableHoveredEntity = mapSelectableHoveredEntity;
  public static readonly selectedExtendedFormEntityAsFinalEntity = GenericMappers.listSelectedExtendedFormEntityAsFinalEntity;                                                              /* @stable [10.05.2020] */
  public static readonly storeEntity = GenericMappers.storeEntity;                                                                                                                          /* @stable [09.06.2020] */
  public static readonly toolbarToolsContainerProps = ComponentMappers.toolbarToolsContainerProps;                                                                                          /* @stable [09.05.2020] */
  public static readonly toolbarToolsContainerPropsAsToolbarToolsProps = ComponentMappers.toolbarToolsContainerPropsAsToolbarToolsProps;                                                    /* @stable [10.06.2020] */
  public static readonly toolbarToolsSecondaryFilterContainerProps = ComponentMappers.toolbarToolsSecondaryFilterContainerProps;                                                            /* @stable [10.05.2020] */
  public static readonly unsavedFormChangesDialogContainerProps = ComponentMappers.unsavedFormChangesDialogContainerProps;                                                                  /* @stable [15.06.2020] */
  public static readonly unsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps = ComponentMappers.unsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps;    /* @stable [15.06.2020] */
}
// tslint:enable:max-line-length
