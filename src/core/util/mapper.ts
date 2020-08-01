import * as R from 'ramda';

import { defValuesFilter } from './filter';
import {
  IHeaderProps,
  IOperationEntity,
  IPresetsSelectableHoveredEntity,
  IReduxSortDirectionsEntity,
  IReduxTransportHolderEntity,
  ISortDirectionEntity,
  ISortDirectionsEntity,
  IUniversalApplicationEntity,
} from '../definition';
import {
  EntityIdT,
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
  Selectors,
  selectToken,
} from './select';
import { ComponentMappers } from './mapper-component';
import { GenericMappers } from './mapper-generic';
import { MapAsComponentUtils } from './map-as-component';
import { MapAsOriginalUtils } from './map-as-original';
import { MapAsUtils } from './map-as';
import { MapAsWrapperUtils } from './map-as-wrapper';

/**
 * @stable [17.11.2019]
 * @param {IReduxTransportHolderEntity} entity
 * @returns {string}
 */
export const selectTransportWrapperToken = (entity: IReduxTransportHolderEntity): string =>
  selectToken(Selectors.transport(entity));

/**
 * @stable [25.11.2019]
 * @param {IReduxTransportHolderEntity} entity
 * @returns {string[]}
 */
export const selectTransportWrapperQueue = (entity: IReduxTransportHolderEntity): string[] =>
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
  mapEntityId(Selectors.entityId(entity));

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
 * @param {IReduxTransportHolderEntity} entity
 * @param {string | IOperationEntity} operations
 * @returns {boolean}
 */
export const hasTransportWrapperQueueOperations = (entity: IReduxTransportHolderEntity,
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

const mapHeaderProps = (props: IHeaderProps): IHeaderProps => MapAsOriginalUtils.storeEntity(props);

/**
 * @stable [05.05.2020]
 */
// tslint:disable:max-line-length
export class Mappers {
  public static readonly defaultLayoutContainerProps = MapAsComponentUtils.defaultLayoutContainerProps;                                                                                     /* @stable [01.08.2020] */
  public static readonly dictionaryEntityAsSelectEntity = GenericMappers.dictionaryEntityAsSelectEntity;                                                                                    /* @stable [19.05.2020] */
  public static readonly dictionaryEntityAsSelectOptionEntities = GenericMappers.dictionaryEntityAsSelectOptionEntities;                                                                    /* @stable [19.05.2020] */
  public static readonly entityAsExtendedEntity = MapAsUtils.entityAsExtendedEntity;                                                                                                        /* @stable [31.07.2020] */
  public static readonly entityAsExtendedFormEntity = MapAsUtils.entityAsExtendedFormEntity;                                                                                                /* @stable [31.07.2020] */
  public static readonly extendedEntity = MapAsOriginalUtils.extendedEntity;                                                                                                                /* @stable [31.07.2020] */
  public static readonly extendedEntityAsApiEntity = MapAsUtils.extendedEntityAsApiEntity;                                                                                                  /* @stable [31.07.2020] */
  public static readonly filterFormDialogContainerProps = ComponentMappers.filterFormDialogContainerProps;                                                                                  /* @stable [10.05.2020] */
  public static readonly filterFormDialogSecondaryFilterContainerProps = ComponentMappers.filterFormDialogSecondaryFilterContainerProps;                                                    /* @stable [10.05.2020] */
  public static readonly form = MapAsWrapperUtils.form;                                                                                                                                     /* @stable [27.07.2020] */
  public static readonly formContainerProps = MapAsComponentUtils.formContainerProps;                                                                                                       /* @stable [30.07.2020] */
  public static readonly formContainerPropsAsFormProps = MapAsComponentUtils.formContainerPropsAsFormProps;                                                                                 /* @stable [31.07.2020] */
  public static readonly formHolderEntity = MapAsOriginalUtils.formHolderEntity;                                                                                                            /* @stable [30.07.2020] */
  public static readonly formTabPanelContainerProps = MapAsComponentUtils.formTabPanelContainerProps;                                                                                       /* @stable [30.07.2020] */
  public static readonly formTabPanelContainerPropsAsTabPanelProps = MapAsComponentUtils.formTabPanelContainerPropsAsTabPanelProps;                                                         /* @stable [30.07.2020] */
  public static readonly fullSearchFilter = GenericMappers.fullSearchFilter;                                                                                                                /* @stable [10.05.2020] */
  public static readonly headerProps = mapHeaderProps;
  public static readonly holderQueryFilterEntityAsQuery = GenericMappers.holderQueryFilterEntityAsQuery;                                                                                    /* @stable [27.07.2020] */
  public static readonly listContainerProps = MapAsComponentUtils.listContainerProps;                                                                                                       /* @stable [31.07.2020] */
  public static readonly listEntityAsPagedEntity = GenericMappers.listEntityAsPagedEntity;                                                                                                  /* @stable [08.05.2020] */
  public static readonly listHolderEntity = MapAsOriginalUtils.listHolderEntity;                                                                                                            /* @stable [31.07.2020] */
  public static readonly listHolderEntityAsDisabled = MapAsUtils.listHolderEntityAsDisabled;                                                                                                /* @stable [31.07.2020] */
  public static readonly listSelectedEntityAsExtendedFormEntity = GenericMappers.listSelectedEntityAsExtendedFormEntity;                                                                    /* @stable [08.05.2020] */
  public static readonly namedEntityAsRawDataLabeledValueEntity = GenericMappers.namedEntityAsRawDataLabeledValueEntity;                                                                    /* @stable [08.07.2020] */
  public static readonly optionEntitiesAsSelectOptionEntities = GenericMappers.optionEntitiesAsSelectOptionEntities;                                                                        /* @stable [19.05.2020] */
  public static readonly pagedEntity = MapAsOriginalUtils.pagedEntity;                                                                                                                      /* @stable [31.07.2020] */
  public static readonly pageToolbarContainerProps = MapAsComponentUtils.pageToolbarContainerProps;                                                                                         /* @stable [31.07.2020] */
  public static readonly pageToolbarContainerPropsAsPageToolbarProps = MapAsComponentUtils.pageToolbarContainerPropsAsPageToolbarProps;                                                     /* @stable [31.07.2020] */
  public static readonly paginatedEntity = MapAsOriginalUtils.paginatedEntity;                                                                                                              /* @stable [31.07.2020] */
  public static readonly placeFieldProps = ComponentMappers.placeFieldProps;                                                                                                                /* @stable [19.05.2020] */
  public static readonly primaryFilterEntityAsPrimaryFilterExtendedFormEntity = GenericMappers.primaryFilterEntityAsPrimaryFilterExtendedFormEntity;                                        /* @stable [10.05.2020] */
  public static readonly primaryFilterExtendedFormEntityAsFormContainerProps = MapAsComponentUtils.primaryFilterExtendedFormEntityAsFormContainerProps;                                     /* @stable [01.08.2020] */
  public static readonly primaryFilterFormHolderEntityAsToolbarToolsContainerProps = MapAsComponentUtils.primaryFilterFormHolderEntityAsToolbarToolsContainerProps;                         /* @stable [01.08.2020] */
  public static readonly queryFilterHolderEntity = MapAsOriginalUtils.queryFilterHolderEntity;                                                                                              /* @stable [31.07.2020] */
  public static readonly searchToolbarContainerProps = MapAsComponentUtils.searchToolbarContainerProps;                                                                                     /* @stable [31.07.2020] */
  public static readonly searchToolbarContainerPropsAsSearchToolbarProps = MapAsComponentUtils.searchToolbarContainerPropsAsSearchToolbarProps;                                             /* @stable [31.07.2020] */
  public static readonly secondaryFilterEntityAsSecondaryFilterExtendedFormEntity = GenericMappers.secondaryFilterEntityAsSecondaryFilterExtendedFormEntity;                                /* @stable [10.05.2020] */
  public static readonly secondaryFilterExtendedFormEntityAsFormContainerProps = MapAsComponentUtils.secondaryFilterExtendedFormEntityAsFormContainerProps;                                 /* @stable [01.08.2020] */
  public static readonly secondaryFilterFormHolderEntityAsToolbarToolsContainerProps = MapAsComponentUtils.secondaryFilterFormHolderEntityAsToolbarToolsContainerProps;                     /* @stable [01.08.2020] */
  public static readonly sectionNameWrapper = MapAsOriginalUtils.sectionNameWrapper;                                                                                                        /* @stable [30.07.2020] */
  public static readonly selectableHoveredEntity = mapSelectableHoveredEntity;
  public static readonly selectedExtendedFormEntityAsFinalEntity = GenericMappers.listSelectedExtendedFormEntityAsFinalEntity;                                                              /* @stable [10.05.2020] */
  public static readonly storeBaseEntity = MapAsOriginalUtils.storeBaseEntity;                                                                                                              /* @stable [31.07.2020] */
  public static readonly storeEntity = MapAsOriginalUtils.storeEntity;                                                                                                                      /* @stable [31.07.2020] */
  public static readonly tabPanelContainerProps = MapAsComponentUtils.tabPanelContainerProps;                                                                                               /* @stable [30.07.2020] */
  public static readonly tabPanelContainerPropsAsTabPanelProps = MapAsComponentUtils.tabPanelContainerPropsAsTabPanelProps;                                                                 /* @stable [30.07.2020] */
  public static readonly tabPanelHolderEntity = MapAsOriginalUtils.tabPanelHolderEntity;                                                                                                    /* @stable [29.07.2020] */
  public static readonly toolbarToolsContainerProps = MapAsComponentUtils.toolbarToolsContainerProps;                                                                                       /* @stable [01.08.2020] */
  public static readonly toolbarToolsContainerPropsAsToolbarToolsProps = MapAsComponentUtils.toolbarToolsContainerPropsAsToolbarToolsProps;                                                 /* @stable [01.08.2020] */
  public static readonly unsavedFormChangesDialogContainerProps = ComponentMappers.unsavedFormChangesDialogContainerProps;                                                                  /* @stable [15.06.2020] */
  public static readonly unsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps = ComponentMappers.unsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps;    /* @stable [15.06.2020] */
}
// tslint:enable:max-line-length
