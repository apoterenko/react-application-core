import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IChangesWrapper,
  IDataWrapper,
  IDeactivatedWrapper,
  IDisabledWrapper,
  IEmptyDataMessageWrapper,
  IEmptyMessageWrapper,
  IEntity,
  IFilterFnWrapper,
  IFullWrapper,
  IGroupByWrapper,
  IHighlightExpandedGroupWrapper,
  IHighlightOddWrapper,
  IHoveredWrapper,
  IIconWrapper,
  IIndexWrapper,
  IKeyValue,
  IListConfigurationWrapper,
  IListWrapper,
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
import {
  ILifeCycleEntity,
  ISelectedWrapperEntity,
} from './entity-definition.interface';
import { IComponentProps } from './props-definition.interface';
import { IPaginatedEntity } from './page-definition.interface';
import { ISelectedElementEntity } from './selected-element-definition.interface';
import { ISortDirectionsWrapperEntity } from './sort-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';
import { GroupValueRendererT, IItemConfigurationWrapper } from '../configurations-definitions.interface';

/**
 * @stable [27.10.2019]
 */
export interface IGenericListEntity<TEntity = IEntity>
  extends IDataWrapper<TEntity[]>,
    ILifeCycleEntity,
    ISelectedWrapperEntity<TEntity>,
    ISorterWrapper,
    IEmptyMessageWrapper,
    IOnSelectWrapper<TEntity> {
}

export interface IUniversalListEntity<TItemConfiguration extends IKeyValue, TEntity = IEntity>
  extends IGenericListEntity<TEntity>,
    IFilterFnWrapper,
    IEmptyDataMessageWrapper,
    IOnCreateWrapper,
    IOnChangeWrapper<IFieldChangeEntity>,
    IOnChangeHeaderWrapper<IFieldChangeEntity>,
    IOnChangeFilterWrapper<IFieldChangeEntity>,
    IItemConfigurationWrapper<TItemConfiguration>,
    IGroupByWrapper<{
      columnName: string,
      groupValue: GroupValueRendererT | GroupValueRendererT[]
    }> {
  useLocalFiltering?: boolean;
  useLocalSorting?: boolean;
}

/**
 * @stable [27.10.2019]
 */
export interface IListItemEntity<TEntity extends IEntity = IEntity>
  extends IRawDataWrapper<TEntity>,
    ITplWrapper<(entity: TEntity) => StringNumberT>,
    IOnClickWrapper<TEntity>,
    ISelectedWrapper,
    IIndexWrapper,
    IDisabledWrapper,
    IIconWrapper,
    IRendererWrapper<TEntity, number> {
}

/**
 * @stable [27.10.2019]
 */
export interface IListItemProps
  extends IComponentProps,
    IListItemEntity {
}

/**
 * @stable [19.10.2019]
 */
export interface IListEntity<TEntity = IEntity>
  extends IUniversalListEntity<any, TEntity>,
    IChangesWrapper,
    ISelectedElementEntity,
    IDeactivatedWrapper,
    IFullWrapper,
    IHighlightExpandedGroupWrapper,
    IHighlightOddWrapper,
    IHoveredWrapper,
    IOriginalDataWrapper<TEntity[]>,
    IPaginatedEntity,
    IRawDataWrapper,
    ISelectableWrapper,
    ISortDirectionsWrapperEntity {
}

/**
 * @stable [19.10.2019]
 */
export interface IListWrapperEntity<TEntity = IEntity>
  extends IListWrapper<IListEntity<TEntity>> {
}

/**
 * @stable [25.10.2019]
 */
export interface IListConfigurationWrapperEntity
  extends IListConfigurationWrapper<IListProps> {
}

/**
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