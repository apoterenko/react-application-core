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
  IGroupedDataSorterWrapper,
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
  IOnChangeBoolValueWrapper,
  IOnClickWrapper,
  IOnColumnClickWrapper,
  IOnSortingDirectionChangeWrapper,
  IPartOfGroupWrapper,
  IQueryWrapper,
  IRenderedWrapper,
  IRendererWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISortableWrapper,
  ISorterWrapper,
  IStickyHeadWrapper,
  ITopTotalWrapper,
  ITotalEntityWrapper,
  ITotalWrapper,
  ITplWrapper,
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
  IStickyHeadWrapper,
  ITopTotalWrapper,
  ITotalEntityWrapper<TEntity>,
  IOnSortingDirectionChangeWrapper<ISortDirectionEntity> {
}

export interface IGridEntity<TEntity extends IEntity = IEntity>
  extends IListEntity<TEntity>,
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
