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
  IFilterFnWrapper,
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
import { ILifeCycleEntity } from './entity-definition.interface';
import { IComponentProps } from './props-definition.interface';
import { IPaginatedEntity } from './page-definition.interface';
import { ISelectedElementEntity } from './selected-element-definition.interface';
import { ISortDirectionsWrapperEntity } from './sort-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';

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
  extends ILifeCycleEntity,
    IPaginatedEntity,
    IDataWrapper<TEntity[]>,
    IDefaultWrapper,
    IEmptyDataMessageWrapper,
    IEmptyMessageWrapper,
    IFullWrapper,
    IGroupByWrapper<IGenericListGroupByEntity>,
    ILocalSortingWrapper,
    IOriginalDataWrapper<TEntity[]>,
    IRawDataWrapper<TRawData>,
    ISelectedWrapper<TEntity>,
    ISorterWrapper {
}

/**
 * @behavioral-entity
 * @stable [04.03.2020]
 */
export interface IBehavioralListEntity<TEntity = IEntity>
  extends IFilterWrapper<(entity: TEntity) => boolean>,
    IOnSelectWrapper<TEntity> {
}

export interface IUniversalListEntity<TItemConfiguration extends IKeyValue,
  TEntity = IEntity,
  TRawData = AnyT>
  extends IGenericListEntity<TEntity, TRawData>,
    IBehavioralListEntity<TEntity>,
    IOnChangeWrapper<IFieldChangeEntity>,
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

// TODO IGenericListEntity
export interface IListEntity<TEntity = IEntity,
  TRawData = AnyT>
  extends IUniversalListEntity<any, TEntity, TRawData>, // TODO
    IChangesWrapper,
    ISelectedElementEntity,
    IDeactivatedWrapper,
    IHighlightOddWrapper,
    IHoveredWrapper,
    ISelectableWrapper,
    ISortDirectionsWrapperEntity {
}

/**
 * @wrapper-entity
 * @stable [19.10.2019]
 */
export interface IListWrapperEntity<TEntity = IEntity>
  extends IListWrapper<IListEntity<TEntity>> {
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
 * @stable [20.10.2019]
 */
export const INITIAL_LIST_ENTITY = Object.freeze<IListEntity>({
  changes: {},
  directions: {},
  progress: false,
  touched: false,
  lockPage: false,
  data: null,
  rawData: null,
  selected: null,
  page: FIRST_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  totalCount: 0,
});
