import * as CSS from 'csstype';

import {
  EntityIdT,
  IAlignWrapper,
  IBoolWrapper,
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
  IHoveredWrapper,
  IIndexedWrapper,
  IIndexWrapper,
  ILocalFilterWrapper,
  INameWrapper,
  IOddWrapper,
  IOnChangeBoolValueWrapper,
  IOnClickWrapper,
  IOnColumnClickWrapper,
  IOnColumnContentClickWrapper,
  IOnSortingDirectionChangeWrapper,
  IPartOfGroupWrapper,
  IQueryWrapper,
  IRenderedWrapper,
  IRendererWrapper,
  IRowNumWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
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
import { IComponentProps } from './props-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';
import { IListEntity } from './list-definition.interface';

/**
 * @stable [18.10.2019]
 */
export interface IGridFilterEntity<TEntity extends IEntity = IEntity>
  extends IQueryWrapper,
    IColumnNameWrapper,
    IEntityWrapper<TEntity> {
}

/**
 * @stable [17.10.2019]
 */
export interface IGenericGridColumnEntity<TEntity extends IEntity = IEntity>
  extends IAlignWrapper<CSS.TextAlignProperty>,
    IBoolWrapper,
    IColSpanWrapper,
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
    ITplWrapper<((entity: TEntity, column?: IGridColumnProps<TEntity>, rowNum?: number) => StringNumberT)> {
}

/**
 * @stable [27.10.2019]
 */
export interface IGenericGridRowEntity<TEntity extends IEntity = IEntity>
  extends IEntityWrapper<TEntity>,
    ISelectedWrapper,
    IOddWrapper,
    ITotalWrapper,
    IFilterWrapper<boolean>,
    IIndexedWrapper,
    IGroupedWrapper,
    IPartOfGroupWrapper,
    IHoveredWrapper,
    ISelectableWrapper,
    IGroupExpandedWrapper {
}

/**
 * @stable [23.10.2019]
 */
export interface IGridRowProps<TEntity extends IEntity = IEntity>
  extends IComponentProps,
    IGenericGridRowEntity<TEntity>,
    IOnClickWrapper<TEntity> {
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
 * @stable [23.10.2019]
 */
export interface IGridHeaderProps
  extends IComponentProps,
    IStickyHeadWrapper {
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

export interface IGridEntity<TEntity extends IEntity = IEntity>
  extends IListEntity<TEntity>,
    IHeaderRenderedWrapper,
    IGridGenericEntity<IGridColumnProps, TEntity>,
    IWrapperClassNameWrapper,
    /**/
    IOnChangeBoolValueWrapper<IFieldChangeEntity> {
}

/**
 * @stable [27.10.2019]
 */
export interface IGridProps
  extends IComponentProps,
    IGridEntity {
}

/**
 * @stable [04.01.2020]
 */
export interface IGridConfigurationWrapperEntity<TProps extends IGridProps = IGridProps>
  extends IGridConfigurationWrapper<TProps> {
}

/**
 * @stable [19.11.2019]
 */
export const NOT_SELECTABLE_GRID_ENTITY = Object.freeze<IGridEntity>({
  hovered: false,
  selectable: false,
});
