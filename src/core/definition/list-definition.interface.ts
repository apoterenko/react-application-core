import * as React from 'react';

import {
  AnyT,
  DEFAULT_PAGE_SIZE,
  EntityIdT,
  FIRST_PAGE,
  IChangesWrapper,
  IDataWrapper,
  IDeactivatedWrapper,
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
import { IGenericBaseComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import { IReduxLifeCycleEntity } from './entity-definition.interface';
import { IReduxPaginatedEntity } from './page-definition.interface';
import { ISelectedElementEntity } from './selected-element-definition.interface';
import { ISortDirectionsEntity } from './sort-definition.interface';

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
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxPaginatedDataEntity<TEntity = IEntity,
  TRawData = AnyT>
  extends IReduxPaginatedEntity,
    IDataWrapper<TEntity[]>,
    IRawDataWrapper<TRawData> {
}

/**
 * @generic-entity
 * @stable [04.05.2020]
 */
export interface IGenericSelectableHoveredEntity
  extends IHoveredWrapper,
    ISelectableWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxListEntity<TEntity = IEntity,
  TRawData = AnyT>
  extends IReduxPaginatedDataEntity<TEntity, TRawData>,
    IReduxLifeCycleEntity,
    ISortDirectionsEntity,
    ISelectedWrapper<TEntity>,
    IChangesWrapper {
}

/**
 * @generic-entity
 * @stable [27.10.2019]
 */
export interface IGenericListEntity<TEntity = IEntity,
  TRawData = AnyT>
  extends IReduxListEntity<TEntity, TRawData>,
    IGenericSelectableHoveredEntity,
    IEmptyDataMessageWrapper,
    IEmptyMessageWrapper,
    IFullWrapper,
    IGroupByWrapper<IGenericListGroupByEntity>,
    ILocalSortingWrapper,
    IOriginalDataWrapper<TEntity[]>,
    ISelectedElementEntity,
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
  extends IGenericSelectableHoveredEntity,
    IDisabledWrapper,
    IIconLeftAlignedWrapper,
    IIconWrapper {
}

/**
 * @generic-entity
 * @stable [17.01.2020]
 */
export interface IGenericListItemEntity<TEntity extends IEntity = IEntity>
  extends IGenericBaseListItemEntity,
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
  extends IGenericBaseComponentProps,
    IGenericListItemEntity<TEntity>,
    IBehavioralListItemEntity<TEntity> {
}

/**
 * @deprecated Use IGenericListEntity & IListProps
 * TODO Destroy it
 */
export interface IDeprecatedListEntity<TEntity = IEntity,
  TRawData = AnyT>
  extends IUniversalListEntity<any, TEntity, TRawData>, // TODO Remove later
    IChangesWrapper,
    IDeactivatedWrapper,
    IHighlightOddWrapper,
    IHoveredWrapper,
    ISelectableWrapper {
}

/**
 * @entity
 * @stable [08.05.2020]
 */
export interface IListEntity<TEntity = IEntity, TRawData = AnyT>
  extends IListWrapper<IReduxListEntity<TEntity, TRawData>> {
}

/**
 * @configuration-entity
 * @stable [08.05.2020]
 */
export interface IListConfigurationEntity<TProps extends IListProps = IListProps>
  extends IListConfigurationWrapper<TProps> {
}

/**
 * @props
 * @stable [27.10.2019]
 */
export interface IListProps
  extends IComponentProps,
    IDeprecatedListEntity {
}

/**
 * TODO
 */
export interface ICardListProps
  extends IKeyValue { // TODO
}

/**
 * @generic-entity
 * @stable [30.03.2020]
 */
export interface IGenericListContainerEntity
  extends IListEntity,
    IListConfigurationEntity {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IBaseListContainerProps
  extends IGenericContainerProps,
    IListEntity {
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
 * @classes
 * @stable [04.05.2020]
 */
export enum ListClassesEnum {
  CARD = 'rac-card',
  CARD_LIST = 'rac-card-list',
  FULL_LIST = 'rac-full-list',
  LIST = 'rac-list',
  LIST_ITEM = 'rac-list-item',
  LIST_ITEM_CONTENT = 'rac-list-item__content',
  LIST_ITEM_DECORATED = 'rac-list-item__decorated',
  LIST_ITEM_HOVERED = 'rac-list-item__hovered',
  LIST_ITEM_ICON = 'rac-list-item__icon',
  LIST_ITEM_LAST = 'rac-list-item__last',
  LIST_ITEM_ODD = 'rac-list-item__odd',
  LIST_ITEM_SELECTABLE = 'rac-list-item__selectable',
  LIST_ITEM_SELECTED = 'rac-list-item__selected',
  LIST_ITEM_UNSELECTED = 'rac-list-item__unselected',
}

/**
 * @stable [20.10.2019]
 */
export const INITIAL_LIST_ENTITY = Object.freeze<IReduxListEntity>({
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
 * @default-entity
 * @stable [04.05.2020]
 */
export const DEFAULT_NOT_SELECTABLE_LIST_ENTITY = Object.freeze<IGenericListEntity>({
  hovered: false,
  selectable: false,
});

/**
 * @stable [30.03.2020]
 */
export const LIST_CANCEL_LOAD_ACTION_TYPE = 'list.cancel.load';
export const LIST_CREATE_ACTION_TYPE = 'list.create';
export const LIST_SELECT_ACTION_TYPE = 'list.select';
