import * as React from 'react';
import * as CSS from 'csstype';

import {
  AnyT,
  EntityIdT,
  IActionButtonsWrapper,
  IActionedWrapper,
  IActionIconsWrapper,
  IActionsDisabledWrapper,
  IActionsPosition,
  IActionsWrapper,
  IActiveValueWrapper,
  IActiveWrapper,
  IAfterEnterWrapper,
  IAliasWrapper,
  IAlignWrapper,
  IApplyGroupWrapper,
  IApplyOddWrapper,
  IAutoCompleteWrapper,
  IAutoFocusWrapper,
  IAvatarWrapper,
  IBackwardRenderedWrapper,
  IBasenameWrapper,
  IBeforeEnterWrapper,
  IBindDictionaryWrapper,
  IBooleanEmptyDataWrapper,
  IBooleanModalWrapper,
  ICallbackWrapper,
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  ICanReturnClearDirtyChangesValueWrapper,
  ICaretBlinkingFrequencyTimeoutWrapper,
  ICenterAlignmentWrapper,
  ICenteredWrapper,
  IChangeableWrapper,
  IChangeFormWrapper,
  IChildrenWrapper,
  IClassNameWrapper,
  IClearActionWrapper,
  IColSpanWrapper,
  IColumnClassNameWrapper,
  IColumnColSpanWrapper,
  IColumnNameWrapper,
  IColumnRenderedWrapper,
  IColumnStylesWrapper,
  IColumnTitleWrapper,
  IColumnWidthWrapper,
  IComputedMatchWrapper,
  IContentStyleWrapper,
  IContentWrapper,
  IDeactivatedWrapper,
  IDefaultValue,
  IDelayTimeoutWrapper,
  IDisabledWrapper,
  IDisplayMessageWrapper,
  IDisplayNameWrapper,
  IDrawerContentStyleWrapper,
  IDrawerContentWrapper,
  IEmptyDataMessageWrapper,
  IEmptyMessageWrapper,
  IEntity,
  IEntityToClassNameWrapper,
  IEntityWrapper,
  IErrorMessageRenderedWrapper,
  IErrorMessageWrapper,
  IExactWrapper,
  IExpandActionRenderedWrapper,
  IExpandedGroupsWrapper,
  IFactorWrapper,
  IFieldRenderedWrapper,
  IFieldWrapper,
  IFilterFnWrapper,
  IFilterRendererWrapper,
  IFocusEvent,
  IForwardRenderedWrapper,
  IFullWrapper,
  IGroupByWrapper,
  IHasContentWrapperWrapper,
  IHeaderActionIconStyleWrapper,
  IHeaderActionStyleWrapper,
  IHeaderBackActionEnabledWrapper,
  IHeaderClassNameWrapper,
  IHeaderColSpanWrapper,
  IHeaderContentWrapper,
  IHeaderMenuActionEnabledWrapper,
  IHeaderRenderedWrapper,
  IHeaderRendererWrapper,
  IHeaderStyleWrapper,
  IHeaderTitleStyleWrapper,
  IHeaderWidthWrapper,
  IHideNavBarWrapper,
  IHoveredWrapper,
  IIconWrapper,
  IIndexWrapper,
  IInitialWrapper,
  IItemsWrapper,
  IKeyboardConfigurationWrapper,
  IKeyboardEvent,
  IKeyValue,
  IKeyWrapper,
  ILayoutWrapper,
  ILocalFilterFnWrapper,
  IMappersWrapper,
  IMaskGuideWrapper,
  IMaskPlaceholderCharWrapper,
  IMessageWrapper,
  IMoreOptionsWrapper,
  INameWrapper,
  INavigationActionTypeWrapper,
  INotUseFieldWrapper,
  IOnBlurWrapper,
  IOnChangeFilterWrapper,
  IOnChangeGroupingWrapper,
  IOnChangeHeaderWrapper,
  IOnChangeSortingWrapper,
  IOnChangeWrapper,
  IOnClearWrapper,
  IOnCloseWrapper,
  IOnCreateWrapper,
  IOnDeactivateWrapper,
  IOnDelayWrapper,
  IOnEmptyDictionaryWrapper,
  IOnEnterWrapper,
  IOnFocusWrapper,
  IOnLoadDictionaryWrapper,
  IOnMoreOptionsSelectWrapper,
  IOnSelectWrapper,
  IParamsWrapper,
  IPathWrapper,
  IPrefixLabelWrapper,
  IPreventFocusWrapper,
  IQueryWrapper,
  IRenderedWrapper,
  IRendererWrapper,
  IRenderToBodyWrapper,
  IRequiredWrapper,
  IRippableWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISeparatorsWrapper,
  IShadowStyleWrapper,
  ISimpleWrapper,
  ISorterFnWrapper,
  IStepWrapper,
  IStickyHeadWrapper,
  IStringArrayExcludeTargetsClassesWrapper,
  IStyleWrapper,
  ISubBorderWrapper,
  ITightGridWrapper,
  ITitleRendererWrapper,
  ITitleWrapper,
  ITotalEntityWrapper,
  ITplFnWrapper,
  ITplWrapper,
  ITypeWrapper,
  IUrlWrapper,
  IUseAddActionWrapper,
  IUseDrawerWrapper,
  IUseGroupingWrapper,
  IUseHeaderWrapper,
  IUseIndicatorWrapper,
  IUseKeyboardWrapper,
  IUseSortingWrapper,
  IUseSyntheticCursorWrapper,
  IValidateWrapper,
  IValidationGroupWrapper,
  IValueWrapper,
  IWarningWrapper,
  IWidthWrapper,
  IWrapperClassNameWrapper,
  StringNumberT,
  IAccessConfigurationWrapper,
} from './definitions.interface';
import {
  ISortDirectionEntity,
} from './entities-definitions.interface';
import { IGridColumnProps } from './props-definitions.interface';
import {
  IReactOnClickWrapper,
  IOnColumnClickWrapper,
  IOnNavigationActionClickWrapper,
} from './react-definitions.interface';
import {
  IApiEntity,
  IBaseEvent,
  IComponentProps,
  IFieldChangeEntity,
  IGenericFieldEntity,
  IMenuItemEntity,
  IMenuProps,
  INamedConstructor,
  INavigationItemEntity,
  IUniversalComponentEntity,
  IUniversalContainerCtor,
  IUniversalContainerEntity,
  IUniversalStoreEntity,
  IWebComponentEntity,
} from './definition';
import { IField } from './component/field/field/field.interface';

/**
 * @stable [31.05.2018]
 */
export interface IHeaderConfigurationWrapper<THeaderConfiguration = ISubHeaderConfiguration> {
  headerConfiguration?: THeaderConfiguration;
}

/**
 * @stable [14.05.2018]
 */
export interface IItemConfigurationWrapper<TItemConfiguration> {
  itemConfiguration?: TItemConfiguration;
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterConfigurationWrapper<TFilterConfiguration = IFilterConfiguration> {
  filterConfiguration?: IFilterConfiguration;
}

/**
 * @stable [18.05.2018]
 */
export interface IFieldConfigurationWrapper<TFieldConfiguration = IFieldConfiguration> {
  fieldConfiguration?: TFieldConfiguration;
}

/**
 * @stable [14.05.2018]
 */
export interface IColumnsConfigurationWrapper<TColumnsConfiguration = IGridColumnConfiguration[]> {
  columnsConfiguration?: TColumnsConfiguration;
}

/**
 * @stable [14.05.2018]
 */
export interface IListConfigurationWrapper<TListConfiguration = IListConfiguration> {
  listConfiguration?: TListConfiguration;
}

/**
 * @stable [02.06.2018]
 */
export interface IGridConfigurationWrapper<TGridConfiguration = IGridConfiguration> {
  gridConfiguration?: TGridConfiguration;
}

/**
 * @stable [31.08.2018]
 */
export interface ITabPanelConfigurationWrapper<TabPanelConfiguration = ITabPanelConfiguration> {
  tabPanelConfiguration?: TabPanelConfiguration;
}

/* @stable - 14.04.2018 */
export interface IRouteConfigurationWrapper<TRouteConfiguration> {
  routeConfiguration?: TRouteConfiguration;
}

/**
 * @stable [18.06.2018]
 */
export interface IUniversalKeyboardHandlersConfiguration<TKeyboardEvent> {
  onKeyTab?(event: TKeyboardEvent): void;
  onKeyEnter?(event: TKeyboardEvent): void;
  onKeyUp?(event: TKeyboardEvent): void;
  onKeyDown?(event: TKeyboardEvent): void;
  onKeyEscape?(event: TKeyboardEvent): void;
  onKeyArrowDown?(event: TKeyboardEvent): void;
  onKeyArrowUp?(event: TKeyboardEvent): void;
  onKeyBackspace?(event: TKeyboardEvent): void;
}

/**
 * @stable [16.05.2018]
 */
export interface INavigationHandlersConfiguration {
  onPrevious?(): void;
  onNext?(): void;
  onFirst?(): void;
  onLast?(): void;
}

/**
 * @stable [24.04.2018]
 */
export interface IUniversalListItemConfiguration extends IUniversalComponentEntity,
                                                         IRendererWrapper<(item: any, index?: number) => JSX.Element>, // TODO
                                                         IIndexWrapper,
                                                         ITplFnWrapper,
                                                         IWarningWrapper {
}

/* @stable [24.04.2018] */
export interface IRnListItemConfiguration extends IUniversalListItemConfiguration,
                                                  IAvatarWrapper<string | ((data: IKeyValue) => string)>,
                                                  ISeparatorsWrapper<IKeyValue> {
}

/* @stable - 31.03.2018 */
export interface IListItemConfiguration extends IUniversalListItemConfiguration,
                                                IWebComponentEntity,
                                                IEntityToClassNameWrapper,
                                                IDisabledWrapper,
                                                IIconWrapper<UIIconConfigurationT> {
}

/**
 * @stable [04.05.2018]
 */
export interface ICardListItemConfiguration extends IUniversalListItemConfiguration,
                                                    IWebComponentEntity<string | ((...args) => string)>,
                                                    IActionButtonsWrapper<(entity: IEntity) => React.ReactNode>,
                                                    IActionIconsWrapper<(entity: IEntity) => React.ReactNode> {
  rippable?: boolean; // TODO
  rippled?: boolean; // TODO
}

/**
 * @stable [05.10.2018]
 */
export type GroupValueRendererT = (groupedRowValue: EntityIdT, groupedRows: IEntity[]) => React.ReactNode;

/* @stable [23.04.2018] */
export interface IUniversalListConfiguration
    <TItemConfiguration extends IUniversalListItemConfiguration = IUniversalListItemConfiguration>
  extends IUniversalComponentEntity,
          IFilterAndSorterConfiguration,
          IEmptyMessageWrapper,
          IEmptyDataMessageWrapper,
          IUseAddActionWrapper,
          IOnCreateWrapper,
          IOnSelectWrapper<(entity: IEntity) => void>,
          IOnChangeWrapper<IFieldChangeEntity>,
          IOnChangeHeaderWrapper<IFieldChangeEntity>,
          IOnChangeFilterWrapper<IFieldChangeEntity>,
          IItemConfigurationWrapper<TItemConfiguration>,
          IDeactivatedWrapper,
          IApplyOddWrapper,
          IApplyGroupWrapper,
          IHoveredWrapper,
          IFullWrapper,
          ISelectableWrapper,
          IGroupByWrapper<{
            columnName: string,
            groupValue: GroupValueRendererT | GroupValueRendererT[]
          }> {
  useLocalFiltering?: boolean;
  useLocalSorting?: boolean;
}

/* @stable [24.04.2018] */
export interface IRnListConfiguration extends IUniversalListConfiguration<IRnListItemConfiguration> {
}

/* @stable - 04.04.2018 */
export interface ICardListConfiguration extends IUniversalListConfiguration<ICardListItemConfiguration>,
  IWebComponentEntity {
}

/* @stable - 04.04.2018 */
export interface IListConfiguration extends IUniversalListConfiguration<IListItemConfiguration>,
                                            IWebComponentEntity {
}

/**
 * @stable [10.09.2018]
 */
export interface IBaseGridColumnConfiguration
  extends IComponentProps,
    IAlignWrapper,
    IWidthWrapper,
    IColSpanWrapper,
    IIndexWrapper,
    IColumnStylesWrapper<((props: IGridColumnProps) => CSS.Properties<string | number>)> {
}

/**
 * @deprecated Use IGridColumnProps
 */
export interface IGridColumnConfiguration extends IBaseGridColumnConfiguration,
                                                  IOnColumnClickWrapper<{event: IBaseEvent, props: IGridColumnProps}>,
                                                  IColumnColSpanWrapper,
                                                  IColumnTitleWrapper,
                                                  IColumnWidthWrapper,
                                                  IColumnClassNameWrapper<string | ((props: IGridColumnProps) => string)>,
                                                  IColumnRenderedWrapper,
                                                  ILocalFilterFnWrapper<IGridFilterConfiguration>,
                                                  IReactOnClickWrapper<ISortDirectionEntity>,
                                                  IUseGroupingWrapper,
                                                  IUseSortingWrapper,
                                                  ITplWrapper<((entity: IEntity, column?: IGridColumnProps, rowNum?: number) => StringNumberT)>,
                                                  INameWrapper,
                                                  IRenderedWrapper,
                                                  IRendererWrapper<(entity: IEntity, context: IGridColumnConfiguration, items: any) => JSX.Element>,
                                                  IActionedWrapper,
                                                  IHeaderRendererWrapper<IGridColumnConfiguration>,
                                                  IFilterRendererWrapper<IGridColumnConfiguration> {
  sorter?(entity1: IEntity, entity2: IEntity): number;  // TODO
}

/**
 * @stable [03.07.2018]
 */
export interface IGridFilterConfiguration<TEntity extends IEntity = IEntity> extends IQueryWrapper,
                                                                                     IColumnNameWrapper,
                                                                                     IEntityWrapper<TEntity> {
}

/* @stable - 04.04.2018 */
export interface IGridConfiguration extends IUniversalListConfiguration,
                                            IWebComponentEntity,
                                            IWrapperClassNameWrapper,
                                            IOnChangeGroupingWrapper<IFieldChangeEntity>,
                                            IOnChangeSortingWrapper<ISortDirectionEntity>,
                                            IColumnsConfigurationWrapper,
                                            IExpandActionRenderedWrapper,
                                            IExpandedGroupsWrapper<any>,
                                            ITightGridWrapper,
                                            IStickyHeadWrapper,
                                            ITotalEntityWrapper<IEntity> {
  topTotal?: boolean; // TODO
  groupedDataSorter?: (groupedValue1, groupedValue2, entity1: IEntity, entity2: IEntity) => number;
}

/* @stable - 03.04.2018 */
export interface IGridHeaderColumnConfiguration extends IGridColumnConfiguration,
                                                        IHeaderColSpanWrapper,
                                                        IHeaderWidthWrapper,
                                                        IHeaderClassNameWrapper,
                                                        IHeaderRenderedWrapper {
}

/**
 * @stable [10.09.2018]
 */
export type GridColumnConfigurationT = IGridColumnConfiguration | IGridHeaderColumnConfiguration;

/**
 * @stable [31.08.2018]
 */
export interface ITabConfiguration extends IValueWrapper,
                                           IClassNameWrapper,
                                           IActiveWrapper,
                                           INameWrapper,
                                           ISelectedWrapper,
                                           IUrlWrapper,
                                           IIconWrapper,
                                           IAliasWrapper,
                                           IActiveValueWrapper {
}

/**
 * @stable [30.08.2018]
 */
export interface ITabPanelConfiguration extends IComponentProps,
                                                IUseIndicatorWrapper,
                                                IRippableWrapper,
                                                ICenteredWrapper,
                                                IBackwardRenderedWrapper,
                                                IForwardRenderedWrapper,
                                                IOnCloseWrapper<ITabConfiguration>,
                                                IReactOnClickWrapper<ITabConfiguration>,
                                                IOnDeactivateWrapper<(value: AnyT) => void>,
                                                IItemsWrapper<ITabConfiguration[]> {
}

/**
 * @stable [02.08.2018]
 */
export interface IWebCameraConfiguration extends IComponentProps,
                                                 ICameraWidthWrapper,
                                                 ICameraHeightWrapper,
                                                 IOnSelectWrapper<(item: Blob) => void> {
}

/* @stable - 25.04.2018 */
export interface IRnApplicationConfiguration extends IUniversalComponentEntity,
                                                     IHideNavBarWrapper {
}

/* @stable - 11.04.2018 */
export interface IApplicationConfiguration extends IBasenameWrapper,
                                                   IHideNavBarWrapper {
}

/**
 * @stable [18.04.2018]
 */
export enum FieldActionPositionEnum {
  LEFT,
  RIGHT,
}

/**
 * @stable [08.05.2018]
 */
export enum KeyboardKeyEnum {
  UPPERCASE,
  CHANGE_LAYOUT,
  LOWERCASE,
  BACKSPACE,
  CLOSE,
  SPACE,
  ENTER,
}

export type KeyboardKeyT = string | IKeyboardKey;
export type KeyboardLayoutT = KeyboardKeyT[][];

// TODO Fix class name
export interface IKeyboardKey extends IValueWrapper<string>,
                                                   ITypeWrapper<KeyboardKeyEnum>,
                                                   IClassNameWrapper<string | ((...args) => string)>, // TODO
                                                   IWidthWrapper {
}

export interface IKeyboardKeyConfiguration extends IDisabledWrapper {
  // TODO
  renderer?: any;
  className?: any;
}

/**
 * @stable [08.05.2018]
 */
export interface IKeyboardConfiguration extends IComponentProps,
                                                IFieldWrapper<IField>,
                                                ILayoutWrapper<KeyboardLayoutT[]>,
                                                IOnCloseWrapper,
                                                IRenderToBodyWrapper {
  keyboardKeyConfiguration?: IKeyboardKeyConfiguration; // TODO
}

/**
 * @stable [31.07.2018]
 */
export interface IUniversalFieldConfiguration<TKeyboardEvent, TFocusEvent, TBasicEvent>
  extends IGenericFieldEntity,
          IUniversalComponentEntity,
          IUniversalKeyboardHandlersConfiguration<TKeyboardEvent>,
          IDelayedChangesFieldPluginConfiguration,
          IOnFocusWrapper<TFocusEvent>,
          IOnBlurWrapper<TFocusEvent>,
          IReactOnClickWrapper<TBasicEvent>,
          IOnChangeWrapper,
          IOnClearWrapper,
          IChangeFormWrapper<(name: string, value: AnyT, validationGroup?: string) => void>,
          IAutoFocusWrapper,
          IErrorMessageRenderedWrapper,
          IActionsWrapper<IFieldActionConfiguration[]>,
          IDisplayMessageWrapper,
          IValidationGroupWrapper,
          IRenderedWrapper,
          IPreventFocusWrapper,
          IRequiredWrapper,
          ICanReturnClearDirtyChangesValueWrapper,
          IMessageWrapper,
          IUseKeyboardWrapper,
          IKeyboardConfigurationWrapper<IKeyboardConfiguration>,
          ICaretBlinkingFrequencyTimeoutWrapper,
          IValidateWrapper<string>,
          IFieldRenderedWrapper,
          IFullWrapper,
          IUseSyntheticCursorWrapper,
          IChangeableWrapper,
          IDefaultValue {
  bufferValue?: boolean;
  preventManualChanges?: boolean; // TODO
  dispatchValue?(rawValue: AnyT); // TODO
}

/* @stable - 11.04.2018 */
export interface IFieldConfiguration extends IUniversalFieldConfiguration<IKeyboardEvent,
                                                                          IFocusEvent,
                                                                          IBaseEvent>,
                                             IWebComponentEntity,
                                             IAutoCompleteWrapper,
                                             IActionsPosition<FieldActionPositionEnum>,
                                             IBindDictionaryConfiguration,
                                             IMaskGuideWrapper,
                                             IMaskPlaceholderCharWrapper,
                                             IPrefixLabelWrapper,
                                             IDisplayNameWrapper,
                                             ITypeWrapper<StringNumberT>,
                                             IClearActionWrapper,
                                             IStepWrapper {
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldsConfigurations {
  [fieldName: string]: string | IFieldConfiguration | ((field) => IFieldConfiguration | string);
}

/* @stable - 14.04.2018 */
export interface IRouteComputedMatchConfiguration extends IParamsWrapper,
                                                          IUrlWrapper,
                                                          IPathWrapper {
}

/* @stable - 14.04.2018 */
export enum ContainerVisibilityTypeEnum {
  PUBLIC,
  PRIVATE,
}

/* @stable - 14.04.2018 */
export interface IRouteConfigEntity extends IPathWrapper,
                                             IBooleanModalWrapper,
                                             ITitleWrapper,
                                             IInitialWrapper<boolean | ((store: IUniversalStoreEntity) => boolean)>,
                                             IExactWrapper,
                                             IKeyWrapper,
                                             IOnEnterWrapper<() => void>,
                                             IAfterEnterWrapper<() => void>,
                                             IBeforeEnterWrapper<() => void>,
                                             IComputedMatchWrapper<IRouteComputedMatchConfiguration>,
                                             ITypeWrapper<ContainerVisibilityTypeEnum> {
}

/* @stable - 14.04.2018 */
export type ConnectorMapperT<TStoreEntity> = (state: TStoreEntity) => IKeyValue;

/* @stable - 14.04.2018 */
export interface IBasicConnectorConfigEntity<TStoreEntity>
  extends ICallbackWrapper<(ctor: IUniversalContainerCtor) => void>,
          IRouteConfigurationWrapper<IRouteConfigEntity>,
          IMappersWrapper<Array<ConnectorMapperT<TStoreEntity>>> {
  injectedServices?: INamedConstructor[];
}

/* @stable - 14.04.2018 */
export interface IConnectorConfigEntity<TAppState = {}, TApplicationAccessConfig = {}>
  extends IBasicConnectorConfigEntity<TAppState>,
          IAccessConfigurationWrapper<TApplicationAccessConfig> {
}

/**
 * @stable [22.10.2018]
 */
export enum LayoutBuilderTypeEnum {
  VERTICAL,
  HORIZONTAL,
}

/* @stable - 16.04.2018 */
export const LAYOUT_BUILDER_TYPES = {
  VERTICAL: LayoutBuilderTypeEnum.VERTICAL,
  HORIZONTAL: LayoutBuilderTypeEnum.HORIZONTAL,
};

/* @stable - 16.04.2018 */
export enum LayoutBuilderFactorsEnum {
  FACTOR_0_5,
  FACTOR_0_75,
  FACTOR_1,
  FACTOR_2,
  FACTOR_4,
  FACTOR_8,
}

/* @stable - 16.04.2018 */
export const LAYOUT_BUILDER_FACTOR_TYPES = {
  FACTOR_0_5: LayoutBuilderFactorsEnum.FACTOR_0_5,
  FACTOR_0_75: LayoutBuilderFactorsEnum.FACTOR_0_75,
  FACTOR_1: LayoutBuilderFactorsEnum.FACTOR_1,
  FACTOR_2: LayoutBuilderFactorsEnum.FACTOR_2,
  FACTOR_4: LayoutBuilderFactorsEnum.FACTOR_4,
  FACTOR_8: LayoutBuilderFactorsEnum.FACTOR_8,
};

/**
 * @stable [22.10.2018]
 */
export type UniversalLayoutBuilderChildrenT<TNode> = IUniversalLayoutBuilderConfiguration<TNode> | TNode;

/**
 * @stable [22.10.2018]
 */
export interface IUniversalLayoutBuilderConfiguration<TNode>
  extends ILayoutWrapper<LayoutBuilderTypeEnum>,
          IStyleWrapper<IKeyValue>,
          IFullWrapper,
          IChildrenWrapper<Array<UniversalLayoutBuilderChildrenT<TNode>>>,
          IFactorWrapper<LayoutBuilderFactorsEnum> {
}

/* @stable [23.04.2018] */
export interface IRnModalConfiguration extends IUniversalComponentEntity,
                                               IShadowStyleWrapper<IKeyValue>,
                                               IHasContentWrapperWrapper,
                                               ICenterAlignmentWrapper {
}

/* @stable [23.04.2018] */
export interface IGridRowConfiguration extends IComponentProps,
                                               IStringArrayExcludeTargetsClassesWrapper {
}

/* @stable - 08.04.2018 */
export interface IUniversalMessageConfiguration extends IUniversalComponentEntity,
                                                        IEmptyDataMessageWrapper,
                                                        IErrorMessageWrapper,
                                                        IEmptyMessageWrapper<React.ReactNode>,
                                                        IBooleanEmptyDataWrapper {
}

/* @stable [27.04.2018] */
export interface IRnDrawerConfiguration extends IUniversalComponentEntity,
                                                IContentWrapper {
}

/* @stable [27.04.2018] */
export interface IRnDefaultLayoutContainerConfiguration extends IUniversalContainerEntity,
                                                                IHeaderBackActionEnabledWrapper,
                                                                IHeaderMenuActionEnabledWrapper,
                                                                IDrawerContentWrapper,
                                                                IHeaderContentWrapper,
                                                                IHeaderActionIconStyleWrapper,
                                                                IHeaderActionStyleWrapper,
                                                                IHeaderActionStyleWrapper,
                                                                IHeaderTitleStyleWrapper,
                                                                IHeaderStyleWrapper,
                                                                IContentStyleWrapper,
                                                                IDrawerContentStyleWrapper,
                                                                IUseDrawerWrapper,
                                                                IUseHeaderWrapper {
}

/**
 * @stable [27.04.2018]
 */
export interface ICardConfiguration extends IComponentProps,
                                            IReactOnClickWrapper,
                                            IRippableWrapper,
                                            IActionButtonsWrapper<React.ReactNode>,
                                            IActionIconsWrapper<React.ReactNode> {
}

/**
 * @deprecated
 */
export interface INavigationListItemConfiguration
  extends INavigationItemEntity {
}

/**
 * @stable [04.05.2018]
 */
export interface IDelayedChangesFieldPluginConfiguration extends IDelayTimeoutWrapper,
                                                                 IOnDelayWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IBindDictionaryConfiguration extends IBindDictionaryWrapper,
                                                      IOnEmptyDictionaryWrapper<(dictionary?: string, payload?: IApiEntity) => void>,
                                                      IOnLoadDictionaryWrapper<(items: AnyT, dictionary?: string) => void> {
}

/**
 * @stable [13.09.2018]
 */
export enum ToolbarActionEnum {
  OPEN_FILTER,
  CLEAR_FILTER,
  REFRESH_DATA,
  DOWNLOAD_DATA,
}

/**
 * @stable [15.05.2018]
 */
export interface IFieldActionConfiguration extends IClassNameWrapper,
                                                   ITitleWrapper,
                                                   IDisabledWrapper<boolean | (() => boolean)>,
                                                   ITypeWrapper,
                                                   IReactOnClickWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterActionConfiguration extends IClassNameWrapper,
                                                    IDisabledWrapper,
                                                    ITypeWrapper<ToolbarActionEnum> {
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterConfiguration extends IActionsDisabledWrapper,
                                              INotUseFieldWrapper,
                                              IIconWrapper,
                                              IFullWrapper,
                                              IActionsWrapper<IFilterActionConfiguration[]>,
                                              IFieldConfigurationWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalUIIconConfiguration extends IUniversalComponentEntity,
                                                       IDisabledWrapper,
                                                       ITypeWrapper,
                                                       IClassNameWrapper,
                                                       ISimpleWrapper,
                                                       IReactOnClickWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IUIIconConfiguration extends IUniversalUIIconConfiguration,
                                              IWebComponentEntity {
}

/**
 * @stable [18.05.2018]
 */
export type UniversalUIIconConfigurationT = IUniversalUIIconConfiguration | string;

/**
 * @stable [18.05.2018]
 */
export type UIIconConfigurationT = IUIIconConfiguration | string;

/**
 * @stable [08.08.2018]
 */
export interface ISubHeaderConfiguration extends IComponentProps,
                                                 IMoreOptionsWrapper<IMenuItemEntity[]>,
                                                 IItemsWrapper<JSX.Element>,
                                                 INavigationActionTypeWrapper,
                                                 IOnNavigationActionClickWrapper,
                                                 IOnMoreOptionsSelectWrapper<IMenuItemEntity>,
                                                 ITitleRendererWrapper<JSX.Element>,
                                                 ISubBorderWrapper {
}

/**
 * @stable [05.06.2018]
 */
export interface IFilterAndSorterConfiguration extends IFilterFnWrapper,
                                                       ISorterFnWrapper {
}
