import * as React from 'react';
import * as CSS from 'csstype';

import {
  EntityIdT,
  IAlignWrapper,
  IChangesWrapper,
  IClosableWrapper,
  IClosedWrapper,
  IColSpanWrapper,
  IColumnClassNameWrapper,
  IColumnColSpanWrapper,
  IColumnNameWrapper,
  IColumnNumWrapper,
  IColumnRenderedWrapper,
  IColumnsConfigurationWrapper,
  IColumnStyleWrapper,
  IColumnTitleWrapper,
  IColumnWidthWrapper,
  IColumnWrapper,
  IDirectionWrapper,
  IDisabledWrapper,
  IEditedWrapper,
  IEntity,
  IEntityWrapper,
  IExpandActionRenderedWrapper,
  IExpandedGroupsWrapper,
  IFilterRendererWrapper,
  IFilterWrapper,
  IGridConfigurationWrapper,
  IGroupByWrapper,
  IGroupedDataSorterWrapper,
  IGroupedRowsWrapper,
  IGroupExpandedWrapper,
  IGroupWrapper,
  IHeaderClassNameWrapper,
  IHeaderColSpanWrapper,
  IHeaderColumnClassNameWrapper,
  IHeaderRenderedWrapper,
  IHeaderRendererWrapper,
  IHeaderStyleWrapper,
  IHeaderWidthWrapper,
  IHintWrapper,
  IIndexedWrapper,
  IIndexWrapper,
  ILocalFilterWrapper,
  ILocalSortingWrapper,
  INameWrapper,
  IOnChangeFilterWrapper,
  IOnChangeWrapper,
  IOnClickWrapper,
  IOnCloseWrapper,
  IOnColumnClickWrapper,
  IOnColumnContentClickWrapper,
  IOnSortingDirectionChangeWrapper,
  IPartOfGroupWrapper,
  IQueryWrapper,
  IRenderedWrapper,
  IRendererWrapper,
  IRowNumWrapper,
  ISortableWrapper,
  ISorterWrapper,
  IStickyHeadWrapper,
  ITopTotalWrapper,
  ITotalEntityWrapper,
  ITotalWrapper,
  ITplWrapper,
  IValueWrapper,
  IWidthWrapper,
  IWrapperClassNameWrapper,
  StringNumberT,
} from '../definitions.interface';
import {
  ISortDirectionEntity,
  SortDirectionsEnum,
} from './sort-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';
import {
  IPresetsListEntity,
  IReduxListEntity,
} from './list-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IPresetsRowEntity } from './row-definition.interface';
import { IPresetsGroupByEntity } from './group-definition.interface';

/**
 * @config-entity
 * @stable [04.10.2020]
 */
export interface IGridFilterConfigEntity<TEntity = IEntity>
  extends IColumnNameWrapper,
    IEntityWrapper<TEntity>,
    IQueryWrapper {
}

/**
 * @presets-entity
 * @stable [09.12.2020]
 */
export interface IPresetsGridColumnEntity<
    TEntity = {},
    TProps extends IPresetsGridColumnEntity<TEntity, {}> = IPresetsGridColumnEntity<TEntity, {}>
  >
  extends IAlignWrapper<CSS.TextAlignProperty>,                                                              /* @stable [08.12.2020] */
    IClosableWrapper,                                                                                        /* @stable [09.12.2020] */
    IClosedWrapper,                                                                                          /* @stable [09.12.2020] */
    IColSpanWrapper,                                                                                         /* @stable [09.12.2020] */
    IColumnClassNameWrapper<string | ((props: TProps) => string)>,                                           /* @stable [12.12.2020] */
    IColumnStyleWrapper<React.CSSProperties | ((props: TProps) => React.CSSProperties)>,                     /* @stable [12.12.2020] */
    IColumnWidthWrapper<CSS.WidthProperty<StringNumberT>>,                                                   /* @stable [09.12.2020] */
    IEditedWrapper,                                                                                          /* @stable [08.12.2020] */
    IHeaderClassNameWrapper<string | ((props: TProps) => string)>,                                           /* @stable [12.12.2020] */
    IHeaderColSpanWrapper,                                                                                   /* @stable [09.12.2020] */
    IHeaderColumnClassNameWrapper<string | ((props: TProps) => string)>,                                     /* @stable [12.12.2020] */
    IHeaderRendererWrapper<TProps>,                                                                          /* @stable [31.12.2020] */
    IHeaderStyleWrapper<React.CSSProperties| ((props: TProps) => React.CSSProperties)>,                      /* @stable [08.12.2020] */
    IHeaderWidthWrapper<CSS.WidthProperty<StringNumberT>>,                                                   /* @stable [08.12.2020] */
    IHintWrapper,                                                                                            /* @stable [08.12.2020] */
    IIndexedWrapper,                                                                                         /* @stable [08.12.2020] */
    IIndexWrapper,                                                                                           /* @stable [08.12.2020] */
    IOnCloseWrapper,                                                                                         /* @stable [09.12.2020] */
    IRendererWrapper<TEntity, TProps, TEntity[]>,                                                            /* @stable [31.12.2020] */
    IWidthWrapper<CSS.WidthProperty<StringNumberT>> {                                                        /* @stable [08.12.2020] */
}

/**
 * @stable [17.10.2019]
 */
export interface IGenericGridColumnEntity<
    TEntity extends IEntity = IEntity,
    TProps extends IGenericGridColumnEntity<TEntity, {}> = IGenericGridColumnEntity<TEntity, {}>
  >
  extends IPresetsGridColumnEntity<TEntity, TProps>,
    IColumnColSpanWrapper,
    IColumnRenderedWrapper,
    IColumnTitleWrapper,
    IDirectionWrapper<SortDirectionsEnum>,
    IEntityWrapper<TEntity>,
    IHeaderRenderedWrapper,
    INameWrapper,
    IOnSortingDirectionChangeWrapper<ISortDirectionEntity>,
    IRenderedWrapper,
    ISortableWrapper {
}

/**
 * @stable [18.10.2019]
 */
export interface IGridColumnProps<
    TEntity = IEntity,
    TProps extends IGridColumnProps<TEntity, {}> = IGridColumnProps<TEntity, {}>
  >
  extends IGenericComponentProps,
    IGenericGridColumnEntity<TEntity>,
    IOnClickWrapper<ISortDirectionEntity>,
    IOnColumnClickWrapper<IGridColumnProps<TEntity>>,
    IOnColumnContentClickWrapper<IGridColumnProps<TEntity>>,
    ISorterWrapper<TEntity>,
    IFilterRendererWrapper<IGridColumnProps<TEntity>>,
    /**/
    ILocalFilterWrapper<IGridFilterConfigEntity<TEntity>>,
    ITplWrapper<TEntity, IGridColumnProps<TEntity>, number> {
}

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsGridRowEntity<TEntity extends IEntity = IEntity>
  extends IPresetsRowEntity<TEntity>,
    IPartOfGroupWrapper {
}

/**
 * @stable [27.10.2019]
 */
export interface IGenericGridRowEntity<TEntity extends IEntity = IEntity>
  extends IPresetsGridRowEntity<TEntity>,
    ITotalWrapper,
    IFilterWrapper<boolean>,
    IGroupWrapper,
    IGroupExpandedWrapper {
}

/**
 * @stable [23.10.2019]
 */
export interface IGridRowProps<TEntity extends IEntity = IEntity>
  extends IGenericComponentProps,
    IGenericGridRowEntity<TEntity> {
}

/**
 * @config-entity
 * @stable [18.08.2020]
 */
export interface IGridRowConfigEntity<TEntity extends IEntity = IEntity>
  extends IColumnsConfigurationWrapper<IGridColumnProps[]>,
    IEntityWrapper<TEntity>,
    IExpandActionRenderedWrapper,
    IGroupedRowsWrapper<TEntity[]>,
    IGroupExpandedWrapper,
    IRowNumWrapper,
    IValueWrapper {
}

/**
 * @config-entity
 * @stable [18.08.2020]
 */
export interface IGridColumnConfigEntity<TEntity extends IEntity = IEntity>
  extends IGridRowConfigEntity<TEntity>,
    IColumnNumWrapper,
    IColumnWrapper<IGridColumnProps> {
}

/**
 * @presets-entity
 * @stable [20.05.2020]
 */
export interface IPresetsGridHeadEntity
  extends IStickyHeadWrapper {
}

/**
 * @generic-entity
 * @stable [20.05.2020]
 */
export interface IGenericGridHeadEntity
  extends IPresetsGridHeadEntity {
}

/**
 * @props
 * @stable [20.05.2020]
 */
export interface IGridHeadProps
  extends IGenericComponentProps,
    IGenericGridHeadEntity {
}

export interface IGridGenericEntity<TColumn, TEntity extends IEntity = IEntity>
  extends IColumnsConfigurationWrapper<TColumn[]>,
  IExpandActionRenderedWrapper,
  IExpandedGroupsWrapper<{[index: string]: boolean}>,
  IGroupedDataSorterWrapper<EntityIdT, TEntity>,
  IOnSortingDirectionChangeWrapper<ISortDirectionEntity>,
  IStickyHeadWrapper,
  ITopTotalWrapper,
  ITotalEntityWrapper<TEntity> {
}

/**
 * @presets-entity
 * @stable [11.06.2020]
 */
export interface IPresetsGridEntity<TEntity extends IEntity = IEntity>
  extends IPresetsListEntity<TEntity>,
    IChangesWrapper,
    IGroupByWrapper<IPresetsGroupByEntity>,
    ILocalSortingWrapper,
    IDisabledWrapper,
    IOnChangeWrapper<IFieldChangeEntity>,
    IOnChangeFilterWrapper<IFieldChangeEntity> {
  localFiltration?: boolean;  // TODO
}

/**
 * @redux-entity
 * @stable [11.06.2020]
 */
export interface IReduxGridEntity<TEntity extends IEntity = IEntity>
  extends IReduxListEntity<TEntity> {
}

export interface IGenericGridEntity<TEntity extends IEntity = IEntity>
  extends IPresetsGridEntity<TEntity>,
    IReduxGridEntity<TEntity>,
    IHeaderRenderedWrapper,
    IGridGenericEntity<IGridColumnProps, TEntity>,
    IWrapperClassNameWrapper {
}

/**
 * @props
 * @stable [11.06.2020]
 */
export interface IGridProps
  extends IGenericComponentProps,
    IGenericGridEntity {
}

/**
 * @configuration-entity
 * @stable [04.01.2020]
 */
export interface IGridConfigurationEntity<TProps extends IGridProps = IGridProps>
  extends IGridConfigurationWrapper<TProps> {
}

/**
 * @classes
 * @stable [20.05.2020]
 */
export enum GridClassesEnum {
  ACTIVE_SORT_ACTION = 'rac-grid__active-sort-action',
  COLUMN = 'rac-grid-column',
  COLUMN_ACTIONABLE = 'rac-grid-column-actionable',
  COLUMN_CLOSABLE = 'rac-grid-column-closable',
  COLUMN_CLOSE_WRAPPER = 'rac-grid-column__close-wrapper',
  COLUMN_CONTENT = 'rac-grid-column__content',
  COLUMN_EDITED = 'rac-grid-column-edited',
  COLUMN_EXTRA_ACTIONS = 'rac-grid-column__extra-actions',
  COLUMN_ODD = 'rac-grid-column-odd',
  EXPAND_ACTION = 'rac-grid__expand-action',
  EXTRA_ACTION = 'rac-grid__extra-action',
  HEAD = 'rac-grid-head',
  ROW = 'rac-grid-row',
  ROW_FILTER = 'rac-grid-row-filter',
  ROW_GROUP = 'rac-grid-row-group',
  ROW_HOVERED = 'rac-grid-row-hovered',
  ROW_ODD = 'rac-grid-row-odd',
  ROW_PART_OF_GROUP = 'rac-grid-row-part-of-group',
  ROW_SELECTABLE = 'rac-grid-row-selectable',
  ROW_SELECTED = 'rac-grid-row-selected',
  ROW_TOTAL = 'rac-grid-row-total',
  ROW_UNSELECTED = 'rac-grid-row-unselected',
}
