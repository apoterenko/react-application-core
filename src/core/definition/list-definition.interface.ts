import * as React from 'react';

import {
  AnyT,
  EntityIdT,
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
  IIndexWrapper,
  IItemConfigurationWrapper,
  IKeyValue,
  IListConfigurationWrapper,
  IListWrapper,
  ILocalSortingWrapper,
  IOnChangeFilterWrapper,
  IOnChangeHeaderWrapper,
  IOnChangeWrapper,
  IOnCreateWrapper,
  IOnSelectWrapper,
  IOriginalDataWrapper,
  IRawDataWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISorterWrapper,
} from '../definitions.interface';
import { IFieldChangeEntity } from './field-definition.interface';
import { IGenericBaseComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import {
  IPresetsIconEntity,
  IPresetsSelectableHoveredEntity,
  IPresetsTemplateEntity,
  IReduxLifeCycleEntity,
} from './entity-definition.interface';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IReduxPaginatedEntity,
} from './page-definition.interface';
import { IPresetsSelectedElementEntity } from './selected-element-definition.interface';
import { ISortDirectionsEntity } from './sort-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IPresetsRowEntity } from './row-definition.interface';

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
 * @presets-entity
 * @stable [10.05.2020]
 */
export interface IPresetsListEntity
  extends IPresetsSelectableHoveredEntity,
    IPresetsSelectedElementEntity,
    IFullWrapper,
    IGroupByWrapper<IGenericListGroupByEntity>,
    ISorterWrapper {
}

/**
 * TODO IPresetsListEntity
 * @generic-entity
 * @stable [27.10.2019]
 */
export interface IGenericListEntity<TEntity = IEntity,
  TRawData = AnyT>
  extends IReduxListEntity<TEntity, TRawData>,
    IPresetsListEntity,
    IEmptyDataMessageWrapper,
    IEmptyMessageWrapper<string | boolean>,
    ILocalSortingWrapper,
    IOriginalDataWrapper<TEntity[]> {
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
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsBaseListItemEntity<TRawData extends IEntity = IEntity>
  extends IPresetsTemplateEntity<TRawData>,
    IPresetsIconEntity,
    IDisabledWrapper {
}

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsListItemEntity<TRawData = IEntity>
  extends IPresetsBaseListItemEntity<TRawData>,
    IPresetsRowEntity<TRawData>,
    IIndexWrapper {
}

/**
 * @generic-entity
 * @stable [01.06.2020]
 */
export interface IGenericListItemEntity<TEntity = IEntity>
  extends IPresetsListItemEntity<TEntity> {
}

/**
 * @props
 * @stable [01.06.2020]
 */
export interface IListItemProps<TEntity = IEntity>
  extends IGenericBaseComponentProps,
    IGenericListItemEntity<TEntity> {
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
    IHighlightOddWrapper {
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
  extends IGenericComponentProps,
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
export const DEFAULT_NOT_SELECTABLE_LIST_ENTITY = Object.freeze<IPresetsListEntity>({
  hovered: false,
  selectable: false,
});

/**
 * @stable [30.03.2020]
 */
export const LIST_CANCEL_LOAD_ACTION_TYPE = 'list.cancel.load';
export const LIST_CREATE_ACTION_TYPE = 'list.create';
export const LIST_SELECT_ACTION_TYPE = 'list.select';
