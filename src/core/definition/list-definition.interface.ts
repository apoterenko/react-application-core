import { EffectsActionBuilder } from 'redux-effects-promise';

import {
  AnyT,
  IDataWrapper,
  IDisabledWrapper,
  IEmptyDataMessageWrapper,
  IEmptyMessageWrapper,
  IEntity,
  IFilterWrapper,
  IFullWrapper,
  IHighlightOddWrapper,
  IIndexWrapper,
  IItemConfigurationWrapper,
  IKeyValue,
  IListConfigurationWrapper,
  IListWrapper,
  ILocalPaginationWrapper,
  IOnSelectWrapper,
  IOriginalDataWrapper,
  IPagesCountWrapper,
  IRawDataWrapper,
  IRowsWrapper,
  ISelectedWrapper,
  ISorterWrapper,
  ITotalCountWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import {
  IPresetsIconEntity,
  IPresetsSelectableHoveredEntity,
  IPresetsTemplateEntity,
  IReduxLifeCycleEntity,
} from './entity-definition.interface';
import {
  DEFAULT_PAGED_ENTITY,
  IReduxPaginatedEntity,
} from './page-definition.interface';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';
import { IPresetsRowEntity } from './row-definition.interface';
import { IPresetsSelectedElementEntity } from './selected-element-definition.interface';
import { ISortDirectionsEntity } from './sort-definition.interface';

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxPaginatedDataEntity<TEntity = IEntity,
  TRawData = AnyT>
  extends IReduxPaginatedEntity,
    IDataWrapper<TEntity[]>,
    IOriginalDataWrapper<TEntity[]>,
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
    ISelectedWrapper<TEntity> {
}

/**
 * @presets-entity
 * @stable [11.06.2020]
 */
export interface IPresetsListEntity<TEntity extends IEntity = IEntity>
  extends IPresetsSelectableHoveredEntity,                            /* @stable [11.06.2020] */
    IPresetsSelectedElementEntity,                                    /* @stable [11.06.2020] */
    IListItemConfigurationEntity,                                     /* @stable [11.06.2020] */
    IEmptyDataMessageWrapper,                                         /* @stable [11.06.2020] */
    IEmptyMessageWrapper<string | boolean>,                           /* @stable [11.06.2020] */
    IFilterWrapper<(entity: TEntity) => boolean>,                     /* @stable [11.06.2020] */
    IFullWrapper,                                                     /* @stable [11.06.2020] */
    IHighlightOddWrapper,                                             /* @stable [11.06.2020] */
    ILocalPaginationWrapper,                                          /* @stable [16.07.2020] */
    IOnSelectWrapper<TEntity>,                                        /* @stable [11.06.2020] */
    ISorterWrapper {                                                  /* @stable [11.06.2020] */
}

/**
 * @generic-entity
 * @stable [11.06.2020]
 */
export interface IGenericListEntity<TEntity extends IEntity = IEntity,
  TRawData = AnyT>
  extends IPresetsListEntity<TEntity>,
    IReduxListEntity<TEntity, TRawData> {
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
  extends IGenericComponentProps,
    IGenericListItemEntity<TEntity> {
}

/**
 * @configuration-entity
 * @stable [11.06.2020]
 */
export interface IListItemConfigurationEntity<TProps = IListItemProps>
  extends IItemConfigurationWrapper<TProps> {
}

/**
 * @redux-holder-entity
 * @stable [11.06.2020]
 */
export interface IReduxListHolderEntity<TEntity = IEntity,
  TRawData = AnyT,
  TList = IReduxListEntity<TEntity, TRawData>>
  extends IListWrapper<TList> {
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
    IGenericListEntity {
}

/**
 * @config-entity
 * @stable [16.07.2020]
 */
export interface IListRowsConfigEntity
  extends IPagesCountWrapper,
    IRowsWrapper<JSX.Element[]>,
    ITotalCountWrapper {
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
  extends IReduxListHolderEntity,
    IListConfigurationEntity {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IBaseListContainerProps
  extends IGenericContainerProps,
    IReduxListHolderEntity {
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
 * @props
 * @stable [11.06.2020]
 */
export interface IBasicListProps
  extends IEnhancedGenericComponentProps,
    IGenericListEntity {
}

/**
 * @classes
 * @stable [04.05.2020]
 */
export enum ListClassesEnum {
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
  LIST_ITEM_SELECTED = 'rac-list-item__selected', // TODO -> rac-list-item-selected
  LIST_ITEM_UNSELECTED = 'rac-list-item__unselected',
}

/**
 * @initial-redux-entity
 * @stable [29.07.2020]
 */
export const INITIAL_REDUX_LIST_ENTITY = Object.freeze<IReduxListEntity>({
  ...DEFAULT_PAGED_ENTITY,
  data: null,
  directions: {},
  lockPage: false,
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
export const LIST_LOAD_ACTION_TYPE = 'list.load';
export const LIST_SELECT_ACTION_TYPE = 'list.select';
/**/
export const LIST_LOAD_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(LIST_LOAD_ACTION_TYPE);
export const LIST_LOAD_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(LIST_LOAD_ACTION_TYPE);
