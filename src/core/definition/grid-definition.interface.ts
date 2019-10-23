import * as CSS from 'csstype';

import {
  IAlignWrapper,
  IColSpanWrapper,
  IColumnClassNameWrapper,
  IColumnColSpanWrapper,
  IColumnNameWrapper,
  IColumnRenderedWrapper,
  IColumnStylesWrapper,
  IColumnTitleWrapper,
  IColumnWidthWrapper,
  IDirectionWrapper,
  IEntity,
  IEntityWrapper,
  IFilterRendererWrapper,
  IFilterWrapper,
  IGroupableWrapper,
  IGroupedWrapper,
  IGroupExpandedWrapper,
  IHeaderClassNameWrapper,
  IHeaderColSpanWrapper,
  IHeaderColumnClassNameWrapper,
  IHeaderColumnStylesWrapper,
  IHeaderRenderedWrapper,
  IHeaderRendererWrapper,
  IHeaderWidthWrapper,
  IHoveredWrapper,
  IIndexedWrapper,
  IIndexWrapper,
  ILocalFilterWrapper,
  INameWrapper,
  IOddWrapper,
  IOnClickWrapper,
  IOnColumnClickWrapper,
  IOnSortingDirectionChangeWrapper,
  IQueryWrapper,
  IRenderedWrapper,
  IRendererWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISortableWrapper,
  ISorterWrapper,
  IStickyHeadWrapper,
  ITplWrapper,
  IWidthWrapper,
  StringNumberT,
} from '../definitions.interface';
import {
  ISortDirectionEntity,
  SortDirectionsEnum,
} from './sort-definition.interface';
import { IComponentProps } from './props-definition.interface';

/**
 * @stable [23.10.2019]
 */
export enum GridClassNamesEnum {
  COLUMN = 'rac-grid-column',
  COLUMN_CONTENT = 'rac-grid-column-content',
}

/**
 * @stable [23.10.2019]
 */
export const GRID_ROW_CONTENT_CLASS_NAMES = Object.freeze([
  GridClassNamesEnum.COLUMN,
  GridClassNamesEnum.COLUMN_CONTENT
]);

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
    IColSpanWrapper,
    IColumnColSpanWrapper,
    IColumnRenderedWrapper,
    IColumnTitleWrapper,
    IColumnWidthWrapper,
    IDirectionWrapper<SortDirectionsEnum>,
    IEntityWrapper<TEntity>,
    IGroupableWrapper,
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
 * @stable [23.10.2019]
 */
export interface IGridRowProps<TEntity extends IEntity = IEntity>
  extends IComponentProps,
    IOnClickWrapper<TEntity>,
    IEntityWrapper<TEntity>,
    ISelectedWrapper,
    IOddWrapper,
    IFilterWrapper<boolean>,
    IIndexedWrapper,
    IGroupedWrapper,
    IHoveredWrapper,
    ISelectableWrapper,
    IGroupExpandedWrapper {
}

/**
 * @stable [23.10.2019]
 */
export interface IGridHeaderProps
  extends IComponentProps,
    IStickyHeadWrapper {
}
