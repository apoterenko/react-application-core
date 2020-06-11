import * as CSS from 'csstype';

import {
  EntityIdT,
  IAlignWrapper,
  IBoolWrapper,
  IChangesWrapper,
  IColSpanWrapper,
  IColumnClassNameWrapper,
  IColumnColSpanWrapper,
  IColumnNameWrapper,
  IColumnRenderedWrapper,
  IColumnsConfigurationWrapper,
  IColumnStylesWrapper,
  IColumnTitleWrapper,
  IColumnWidthWrapper,
  IDirectionWrapper,
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
  IGroupedWrapper,
  IGroupExpandedWrapper,
  IHeaderClassNameWrapper,
  IHeaderColSpanWrapper,
  IHeaderColumnClassNameWrapper,
  IHeaderColumnStylesWrapper,
  IHeaderRenderedWrapper,
  IHeaderRendererWrapper,
  IHeaderWidthWrapper,
  IHighlightOddWrapper,
  IIndexedWrapper,
  IIndexWrapper,
  ILocalFilterWrapper,
  ILocalSortingWrapper,
  INameWrapper,
  IOnChangeBoolValueWrapper,
  IOnChangeFilterWrapper,
  IOnClickWrapper,
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
} from '../definitions.interface';
import {
  ISortDirectionEntity,
  SortDirectionsEnum,
} from './sort-definition.interface';
import { IComponentProps } from './props-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';
import {
  IGenericListGroupByEntity,
  IPresetsListEntity,
  IReduxListEntity,
} from './list-definition.interface';
import {
  IGenericBaseComponentProps,
  IGenericComponentProps,
} from './generic-component-definition.interface';
import { IPresetsRowEntity } from './row-definition.interface';

/**
 * @stable [18.10.2019]
 */
export interface IGridFilterEntity<TEntity extends IEntity = IEntity>
  extends IQueryWrapper,
    IColumnNameWrapper,
    IEntityWrapper<TEntity> {
}

/**
 * @presets-entity
 * @stable [24.05.2020]
 */
export interface IPresetsGridColumnEntity
  extends IBoolWrapper,
    IColSpanWrapper {
}

/**
 * @stable [17.10.2019]
 */
export interface IGenericGridColumnEntity<TEntity extends IEntity = IEntity>
  extends IPresetsGridColumnEntity,
    IAlignWrapper<CSS.TextAlignProperty>,
    IColumnColSpanWrapper,
    IColumnRenderedWrapper,
    IColumnTitleWrapper,
    IColumnWidthWrapper,
    IDirectionWrapper<SortDirectionsEnum>,
    IEditedWrapper,
    IEntityWrapper<TEntity>,
    IHeaderClassNameWrapper,
    IHeaderColSpanWrapper,
    IHeaderRenderedWrapper,
    IHeaderWidthWrapper,
    IIndexWrapper,
    INameWrapper,
    IOnSortingDirectionChangeWrapper<ISortDirectionEntity>,
    IRenderedWrapper,
    ISortableWrapper,
    IWidthWrapper {
}

/**
 * @stable [18.10.2019]
 */
export interface IGridColumnProps<TEntity extends IEntity = IEntity>
  extends IComponentProps,
    IGenericGridColumnEntity<TEntity>,
    IOnClickWrapper<ISortDirectionEntity>,
    IOnColumnClickWrapper<IGridColumnProps<TEntity>>,
    IOnColumnContentClickWrapper<IGridColumnProps<TEntity>>,
    ISorterWrapper<TEntity>,
    IIndexedWrapper,
    /**/
    IColumnClassNameWrapper<string | ((props: IGridColumnProps<TEntity>) => string)>,
    IColumnStylesWrapper<CSS.Properties | ((props: IGridColumnProps<TEntity>) => CSS.Properties)>,
    IHeaderColumnClassNameWrapper<string | ((props: IGridColumnProps<TEntity>) => string)>,
    IHeaderColumnStylesWrapper<CSS.Properties | ((props: IGridColumnProps<TEntity>) => CSS.Properties)>,
    /**/
    IFilterRendererWrapper<IGridColumnProps<TEntity>>,
    IHeaderRendererWrapper<IGridColumnProps<TEntity>>,
    IRendererWrapper<TEntity, IGridColumnProps<TEntity>, TEntity[]>,
    /**/
    ILocalFilterWrapper<IGridFilterEntity>,
    ITplWrapper<TEntity, IGridColumnProps<TEntity>, number> {
}

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsGridRowEntity<TEntity extends IEntity = IEntity>
  extends IPresetsRowEntity<TEntity> {
}

/**
 * @stable [27.10.2019]
 */
export interface IGenericGridRowEntity<TEntity extends IEntity = IEntity>
  extends IPresetsGridRowEntity<TEntity>,
    ITotalWrapper,
    IFilterWrapper<boolean>,
    IIndexedWrapper,
    IGroupedWrapper,
    IPartOfGroupWrapper,
    IGroupExpandedWrapper {
}

/**
 * @stable [23.10.2019]
 */
export interface IGridRowProps<TEntity extends IEntity = IEntity>
  extends IComponentProps,
    IGenericGridRowEntity<TEntity> {
}

/**
 * @stable [06.12.2019]
 */
export interface IGridRowConfigEntity<TEntity extends IEntity = IEntity>
  extends IEntityWrapper<TEntity>,
    IGroupedRowsWrapper<TEntity[]>,
    IHighlightOddWrapper,
    IRowNumWrapper,
    IValueWrapper {
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
  extends IGenericBaseComponentProps,
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
    IGroupByWrapper<IGenericListGroupByEntity>,
    ILocalSortingWrapper,
    IOnChangeFilterWrapper<IFieldChangeEntity> {
  localFiltration?: boolean;  // TODO
  deactivated?: boolean;
  highlightOdd?: boolean;
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
    IWrapperClassNameWrapper,
    /**/
    IOnChangeBoolValueWrapper<IFieldChangeEntity> {
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
  GRID_HEAD = 'rac-grid-head',
  GRID_HEAD_COLUMN_ACTIVE_SORT_ICON = 'rac-grid-head-column__active-sort-icon',
  GRID_HEAD_COLUMN_SORT_ASC_ACTION = 'rac-grid-head-column__sort-asc-action',
  GRID_HEAD_COLUMN_SORT_DESC_ACTION = 'rac-grid-head-column__sort-desc-action',
  GRID_HEAD_COLUMN_SORT_ICON = 'rac-grid-head-column__sort-icon',
}
