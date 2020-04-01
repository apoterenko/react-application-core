import * as React from 'react';

import {
  AnyT,
  DEFAULT_PAGE_SIZE,
  EntityIdT,
  FIRST_PAGE,
  IChangesWrapper,
  IDataWrapper,
  IDeactivatedWrapper,
  IDefaultWrapper,
  IDisabledWrapper,
  IEmptyDataMessageWrapper,
  IEmptyMessageWrapper,
  IEntity,
  IFieldNameWrapper,
  IFilterWrapper,
  IFullWrapper,
  IGroupByWrapper,
  IGroupedFieldNameWrapper,
  IGroupValueWrapper,
  IHighlightOddWrapper,
  IHoveredWrapper,
  IIconLeftAlignedWrapper,
  IIconWrapper,
  IIndexWrapper,
  IItemConfigurationWrapper,
  IKeyValue,
  ILastWrapper,
  IListConfigurationWrapper,
  IListWrapper,
  ILocalSortingWrapper,
  IOddWrapper,
  IOnChangeFilterWrapper,
  IOnChangeHeaderWrapper,
  IOnChangeWrapper,
  IOnClickWrapper,
  IOnCreateWrapper,
  IOnSelectWrapper,
  IOriginalDataWrapper,
  IRawDataWrapper,
  IRendererWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISorterWrapper,
  ITplWrapper,
  StringNumberT,
} from '../definitions.interface';
import { IComponentProps } from './props-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';
import { IGenericComponentProps } from './component-definition.interface';
import { IGenericContainerProps } from './container-definition.interface';
import { ILifeCycleEntity } from './entity-definition.interface';
import { IGenericPaginatedEntity } from './page-definition.interface';
import { ISelectedElementEntity } from './selected-element-definition.interface';
import { ISortDirectionsWrapperEntity } from './sort-definition.interface';

/**
 * @stable [04.03.2020]
 */
export type GroupValueRendererT = (groupedRowValue: EntityIdT, groupedRows: IEntity[]) => React.ReactNode;

/**
 * @generic-entity
 * @stable [04.03.2020]
 */
export interface IGenericListGroupByEntity
  extends IFieldNameWrapper,
    IGroupedFieldNameWrapper,
    IGroupValueWrapper<GroupValueRendererT | GroupValueRendererT[]> {
}

/**
 * @generic-entity
 * @stable [27.10.2019]
 */
export interface IGenericListEntity<TEntity = IEntity,
  TRawData = AnyT>
  extends IChangesWrapper,
    IDataWrapper<TEntity[]>,
    IDefaultWrapper,
    IEmptyDataMessageWrapper,
    IEmptyMessageWrapper,
    IFullWrapper,
    IGenericPaginatedEntity,
    IGroupByWrapper<IGenericListGroupByEntity>,
    ILifeCycleEntity,
    ILocalSortingWrapper,
    IOriginalDataWrapper<TEntity[]>,
    IRawDataWrapper<TRawData>,
    ISelectedWrapper<TEntity>,
    ISortDirectionsWrapperEntity,
    ISorterWrapper {
}

/**
 * @behavioral-entity
 * @stable [04.03.2020]
 */
export interface IBehavioralListEntity<TEntity = IEntity>
  extends IFilterWrapper<(entity: TEntity) => boolean>,
    IOnChangeWrapper<IFieldChangeEntity>,
    IOnCreateWrapper,
    IOnSelectWrapper<TEntity> {
}

export interface IUniversalListEntity<TItemConfiguration extends IKeyValue,
  TEntity = IEntity,
  TRawData = AnyT>
  extends IGenericListEntity<TEntity, TRawData>,
    IBehavioralListEntity<TEntity>,
    IOnChangeHeaderWrapper<IFieldChangeEntity>,
    IOnChangeFilterWrapper<IFieldChangeEntity>,
    IItemConfigurationWrapper<TItemConfiguration> {
  localFiltration?: boolean;
}

/**
 * @generic-entity
 * @stable [17.01.2020]
 */
export interface IGenericBaseListItemEntity
  extends IDisabledWrapper,
    IIconLeftAlignedWrapper,
    IIconWrapper {
}

/**
 * @generic-entity
 * @stable [17.01.2020]
 */
export interface IGenericListItemEntity<TEntity extends IEntity = IEntity>
  extends IGenericBaseListItemEntity,
    IHoveredWrapper,
    IIndexWrapper,
    ILastWrapper,
    IOddWrapper,
    IRawDataWrapper<TEntity>,
    ISelectedWrapper {
}

/**
 * @behavioral-entity
 * @stable [30.01.2020]
 */
export interface IBehavioralBaseListItemEntity<TEntity = IEntity>
  extends IRendererWrapper<TEntity, number>,
    ITplWrapper<(entity: TEntity) => StringNumberT> {
}

/**
 * @behavioral-entity
 * @stable [26.01.2020]
 */
export interface IBehavioralListItemEntity<TEntity extends IEntity = IEntity>
  extends IBehavioralBaseListItemEntity<TEntity>,
    IOnClickWrapper<TEntity> {
}

/**
 * @props
 * @stable [26.01.2020]
 */
export interface IListItemProps<TEntity extends IEntity = IEntity>
  extends IComponentProps,
    IGenericListItemEntity<TEntity>,
    IBehavioralListItemEntity<TEntity> {
}

/**
 * @deprecated Use IGenericListEntity & IListProps
 * TODO Destroy it
 */
export interface IListEntity<TEntity = IEntity,
  TRawData = AnyT>
  extends IUniversalListEntity<any, TEntity, TRawData>, // TODO Remove later
    IChangesWrapper,
    ISelectedElementEntity,
    IDeactivatedWrapper,
    IHighlightOddWrapper,
    IHoveredWrapper,
    ISelectableWrapper {
}

/**
 * @wrapper-entity
 * @stable [19.10.2019]
 */
export interface IListWrapperEntity<TEntity = IEntity>
  extends IListWrapper<IGenericListEntity<TEntity>> {
}

/**
 * @configuration-entity
 * @stable [25.10.2019]
 */
export interface IListConfigurationEntity
  extends IListConfigurationWrapper<IListProps> {
}

/**
 * @props
 * @stable [27.10.2019]
 */
export interface IListProps
  extends IComponentProps,
    IListEntity {
}

/**
 * @generic-entity
 * @stable [30.03.2020]
 */
export interface IGenericBaseListContainerEntity
  extends IListWrapperEntity {
}

/**
 * @generic-entity
 * @stable [30.03.2020]
 */
export interface IGenericListContainerEntity
  extends IGenericBaseListContainerEntity,
    IListConfigurationEntity {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IBaseListContainerProps
  extends IGenericContainerProps,
    IGenericBaseListContainerEntity {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IListContainerProps
  extends IGenericContainerProps,
    IGenericListContainerEntity {
}

/**
 * @stable [20.10.2019]
 */
export const INITIAL_LIST_ENTITY = Object.freeze<IGenericListEntity>({
  changes: {},
  data: null,
  directions: {},
  lockPage: false,
  page: FIRST_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  progress: false,
  rawData: null,
  selected: null,
  totalCount: 0,
  touched: false,
});

/**
 * @stable [30.03.2020]
 */
export const LIST_CANCEL_LOAD_ACTION_TYPE = 'list.cancel.load';
export const LIST_CREATE_ACTION_TYPE = 'list.create';
export const LIST_SELECT_ACTION_TYPE = 'list.select';
