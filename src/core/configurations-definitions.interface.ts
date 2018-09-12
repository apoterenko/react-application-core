import * as React from 'react';

import {
  ISorterFnWrapper,
  INonInteractiveWrapper,
  ISimpleWrapper,
  IUseAvatarWrapper,
  IUseTwoLineWrapper,
  IUseAddActionWrapper,
  IRendererWrapper,
  IEntityToClassNameWrapper,
  IIconWrapper,
  IActionIconWrapper,
  IActionTextWrapper,
  IAlwaysDirtyWrapper,
  IClassNameWrapper,
  IDisabledWrapper,
  INotUseActionsWrapper,
  INotApplyFrameworkClassNameWrapper,
  IReadOnlyWrapper,
  IResetTextWrapper,
  IUseResetButtonWrapper,
  IEditableWrapper,
  IRippableWrapper,
  IWidthWrapper,
  ITitleWrapper,
  IUseGroupingWrapper,
  IUseSortingWrapper,
  IAlignWrapper,
  INameWrapper,
  IItemsWrapper,
  IActiveWrapper,
  ITypeWrapper,
  IBasenameWrapper,
  IAutoFocusWrapper,
  IPreventValueBindingWrapper,
  IPlaceholderWrapper,
  IPatternWrapper,
  IDisplayNameWrapper,
  IDisplayMessageWrapper,
  ILabelWrapper,
  IPrefixLabelWrapper,
  IKeyValue,
  IMappersWrapper,
  IStringPathWrapper,
  IStateInitialChangesWrapper,
  ISignInWrapper,
  ISignUpWrapper,
  IAccessDeniedWrapper,
  ILogoutWrapper,
  IProfileWrapper,
  IHomeWrapper,
  IRestoreAuthWrapper,
  IComputedMatchWrapper,
  IKeyValueParamsWrapper,
  IExactWrapper,
  IBeforeEnterWrapper,
  IAfterEnterWrapper,
  IUrlWrapper,
  IStringKeyWrapper,
  ICallbackWrapper,
  IHideNavBarWrapper,
  IChildrenWrapper,
  ILayoutWrapper,
  IFactorWrapper,
  IStyleWrapper,
  IDefaultOnPressWrapper,
  IBlockWrapper,
  IBooleanIconLeftWrapper,
  IBooleanLargeWrapper,
  IBooleanSmallWrapper,
  IBooleanSuccessWrapper,
  IBooleanTransparentWrapper,
  IBorderedWrapper,
  IIconStyleWrapper,
  IRoundedWrapper,
  ITextWrapper,
  ITextStyleWrapper,
  IOutlinedWrapper,
  IRaisedWrapper,
  IStringToWrapper,
  IOnEnterWrapper,
  IBooleanFullWrapper,
  IShadowStyleWrapper,
  IBooleanModalWrapper,
  ICenterAlignmentWrapper,
  IHasContentWrapperWrapper,
  IStringArrayExcludeTargetsClassesWrapper,
  ICssStyleWrapper,
  IRegisterWrapper,
  IUnregisterWrapper,
  IPluginsWrapper,
  IOnSelectWrapper,
  IOnCreateWrapper,
  IBooleanEmptyDataWrapper,
  IEmptyMessageWrapper,
  IStringErrorMessageWrapper,
  IAvatarWrapper,
  ISeparatorsWrapper,
  IInitialWrapper,
  IHeaderStyleWrapper,
  IContentStyleWrapper,
  IUseDrawerWrapper,
  IUseHeaderWrapper,
  IDrawerContentWrapper,
  IDrawerContentStyleWrapper,
  IHeaderBackActionEnabledWrapper,
  IHeaderMenuActionEnabledWrapper,
  IHeaderActionIconStyleWrapper,
  IHeaderActionStyleWrapper,
  IHeaderTitleStyleWrapper,
  IHeaderContentWrapper,
  IContentWrapper,
  IActionIconsWrapper,
  IActionButtonsWrapper,
  IOnClickWrapper,
  IEntity,
  ILinkWrapper,
  IDelayTimeoutWrapper,
  AnyT,
  IOnDelayWrapper,
  IKeyboardEvent,
  IBindDictionaryWrapper,
  IOnEmptyDictionaryWrapper,
  IOnLoadDictionaryWrapper,
  IMaskGuideWrapper,
  IMaskPlaceholderCharWrapper,
  IMaskWrapper,
  IRequiredWrapper,
  IOnChangeWrapper,
  ISelectedWrapper,
  IUseKeyboardWrapper,
  IFilterFnWrapper,
  IUseFilterWrapper,
  IFilterPlaceholderWrapper,
  IRenderToBodyWrapper,
  IRenderToCenterOfBodyWrapper,
  ITplFnWrapper,
  IFilterWrapper,
  ISectionNameWrapper,
  IActionsDisabledWrapper,
  IActionsWrapper,
  INotUseFieldWrapper,
  IActionsPosition,
  INotUseErrorMessageWrapper,
  IMoreOptionsWrapper,
  INavigationActionTypeWrapper,
  IOnNavigationActionClickWrapper,
  IOnMoreOptionsSelectWrapper,
  IUseServiceWrapper,
  IEmptyDataMessageWrapper,
  IDeactivatedWrapper,
  IOnChangeSortingWrapper,
  IHeaderRendererWrapper,
  IClearActionWrapper,
  IFilterRendererWrapper,
  IUseLocalFilteringWrapper,
  IOnChangeFilterWrapper,
  IOnChangeHeaderWrapper,
  IOnChangeGroupingWrapper,
  ILocalFilterFnWrapper,
  IMultiWrapper,
  IOnEmptyMessageClickWrapper,
  IEmptyMessageActionWrapper,
  IEmptyMessageActionConfigurationWrapper,
  IAdjustWidthWrapper,
  IValidationGroupWrapper,
  IChangeFormWrapper,
  IOnBlurWrapper,
  IOnFocusWrapper,
  IFocusEvent,
  IProgressWrapper,
  IBasicEvent,
  IAutoCompleteWrapper,
  IRenderedWrapper,
  IStepWrapper,
  IActionedWrapper,
  IUseFooterWrapper,
  IEmptyValueWrapper,
  IPreventFocusWrapper,
  IQueryWrapper,
  IEntityWrapper,
  IColumnNameWrapper,
  IGroupByWrapper,
  EntityIdT,
  IRenderToXWrapper,
  IRenderToYWrapper,
  IValidateWrapper,
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  IWarningWrapper,
  IMoreOptionsConfigurationWrapper,
  ICanReturnClearDirtyChangesValueWrapper,
  IOnPlusClickWrapper,
  IActiveValueWrapper,
  IValueWrapper,
  IOnClearWrapper,
  IExpandedGroupsWrapper,
  IOnCloseWrapper,
  IUseIndicatorWrapper,
  IAliasWrapper,
  IOnDeactivateWrapper,
  IMessageWrapper,
  ICaretBlinkingFrequencyTimeoutWrapper,
  IOnColumnClickWrapper,
  IColumnClassNameWrapper,
  IColumnTitleWrapper,
  IColumnColSpanWrapper,
  IHeaderColSpanWrapper,
  IHeaderWidthWrapper,
  IHeaderClassNameWrapper,
  IColSpanWrapper,
  IColumnWidthWrapper,
  IColumnRenderedWrapper,
  IHeaderRenderedWrapper,
  ITightGridWrapper,
} from './definitions.interface';
import {
  IUniversalContainerClassEntity,
  IUniversalComponentPluginClassEntity,
  IUniversalApplicationStoreEntity,
  IMenuItemEntity,
  ISortDirectionEntity,
  IFieldChangeEntity,
  IUniversalComponent,
  IApiEntity,
} from './entities-definitions.interface';
import { IUniversalButtonProps, IGridColumnProps } from './props-definitions.interface';

/**
 * @stable [26.08.2018]
 */
export interface IFieldsConfigurationsWrapper<TFieldsConfigurations = IFieldsConfigurations> {
  fieldsConfigurations?: TFieldsConfigurations;
}

/**
 * @stable [16.06.2018]
 */
export interface IButtonConfigurationWrapper<TButtonConfiguration = IButtonConfiguration> {
  buttonConfiguration?: TButtonConfiguration;
}

/**
 * @stable [31.05.2018]
 */
export interface IHeaderConfigurationWrapper<THeaderConfiguration = IHeaderConfiguration> {
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
export interface IMenuConfigurationWrapper<TMenuConfiguration = IMenuConfiguration> {
  menuConfiguration?: TMenuConfiguration;
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
 * @stable [29.05.2018]
 */
export interface IFormConfigurationWrapper<TFormConfiguration = IFormConfiguration> {
  formConfiguration?: TFormConfiguration;
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
 * @stable [14.04.2018]
 */
export interface IAccessConfigurationWrapper<TAccessConfiguration> {
  accessConfiguration?: TAccessConfiguration;
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
 * @stable [27.05.2018]
 */
export interface IBootstrapConfiguration {
  rootId?: string;
  needToPrepareBody?: boolean;
  needToDefineErrorHandler?: boolean;
}

/**
 * @stable [27.05.2018]
 */
export const DEFAULT_BOOTSTRAP_CONFIGURATION: IBootstrapConfiguration = {
  rootId: 'root',
  needToPrepareBody: true,
  needToDefineErrorHandler: true,
};

/**
 * @stable [24.04.2018]
 */
export interface IWebComponentConfiguration extends IClassNameWrapper,
                                                    ICssStyleWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IWebContainerConfiguration extends IWebComponentConfiguration {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalComponentConfiguration
  extends React.ClassAttributes<AnyT>,
          ITitleWrapper,
          IPluginsWrapper<IUniversalComponentPluginClassEntity | IUniversalComponentPluginClassEntity[]>,
          IRegisterWrapper<(component: IUniversalComponent) => void>,
          IUnregisterWrapper<(component: IUniversalComponent) => void> {
}

/**
 * @stable [27.04.2018]
 */
export interface IUniversalContainerConfiguration extends ITitleWrapper,
                                                          ISectionNameWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IContainerConfiguration extends IUniversalContainerConfiguration,
                                                 IWebContainerConfiguration {
}

/**
 * @stable [24.04.2018]
 */
export interface IUniversalListItemConfiguration extends IUniversalComponentConfiguration,
                                                         IRendererWrapper,
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
                                                IWebComponentConfiguration,
                                                IEntityToClassNameWrapper,
                                                IRippableWrapper,
                                                IIconWrapper<UIIconConfigurationT> {
}

/**
 * @stable [04.05.2018]
 */
export interface ICardListItemConfiguration extends IUniversalListItemConfiguration,
                                                    IActionButtonsWrapper<(entity: IEntity) => React.ReactNode>,
                                                    IActionIconsWrapper<(entity: IEntity) => React.ReactNode> {
}

/* @stable [23.04.2018] */
export interface IUniversalListConfiguration
    <TItemConfiguration extends IUniversalListItemConfiguration = IUniversalListItemConfiguration>
  extends IUniversalComponentConfiguration,
          IFilterAndSorterConfiguration,
          IEmptyMessageWrapper,
          IEmptyDataMessageWrapper,
          IUseLocalFilteringWrapper,
          IUseAddActionWrapper,
          IEmptyMessageActionWrapper,
          IEmptyMessageActionConfigurationWrapper<IButtonConfiguration>,
          IOnCreateWrapper,
          IOnSelectWrapper,
          IOnChangeWrapper<IFieldChangeEntity>,
          IOnChangeHeaderWrapper<IFieldChangeEntity>,
          IOnChangeFilterWrapper<IFieldChangeEntity>,
          IOnEmptyMessageClickWrapper,
          IItemConfigurationWrapper<TItemConfiguration>,
          IDeactivatedWrapper,
          IGroupByWrapper<{
            columnName: string,
            groupValue: (groupedRowValue: EntityIdT, groupedRows: IEntity[]) => React.ReactNode}
          > {
}

/* @stable [24.04.2018] */
export interface IRnListConfiguration extends IUniversalListConfiguration<IRnListItemConfiguration> {
}

/* @stable - 04.04.2018 */
export interface ICardListConfiguration extends IUniversalListConfiguration<ICardListItemConfiguration>,
                                                IWebComponentConfiguration {
}

/* @stable - 04.04.2018 */
export interface IListConfiguration extends IUniversalListConfiguration<IListItemConfiguration>,
                                            IWebComponentConfiguration,
                                            ISimpleWrapper,
                                            IUseTwoLineWrapper,
                                            IUseAvatarWrapper,
                                            INonInteractiveWrapper {
}

/**
 * @stable [04.08.2018]
 */
export interface IUniversalFormConfiguration extends IUniversalComponentConfiguration,
                                                     INotUseActionsWrapper,
                                                     IUseResetButtonWrapper,
                                                     IEditableWrapper,
                                                     IDisabledWrapper,
                                                     IAlwaysDirtyWrapper,
                                                     IActionIconWrapper,
                                                     IOnEmptyDictionaryWrapper<IApiEntity> {
}

export interface IFormConfiguration extends IUniversalFormConfiguration,
                                            IWebComponentConfiguration,
                                            IButtonConfigurationWrapper,
                                            IReadOnlyWrapper,
                                            IActionTextWrapper,
                                            IResetTextWrapper {
}

/**
 * @stable [10.09.2018]
 */
export interface IBaseGridColumnConfiguration extends IComponentConfiguration,
                                                      IAlignWrapper,
                                                      IWidthWrapper,
                                                      IColSpanWrapper {
}

/* @stable - 04.04.2018 */
export interface IGridColumnConfiguration extends IBaseGridColumnConfiguration,
                                                  IOnColumnClickWrapper<IGridColumnProps>,
                                                  IColumnColSpanWrapper,
                                                  IColumnTitleWrapper,
                                                  IColumnWidthWrapper,
                                                  IColumnClassNameWrapper<string | ((props: IGridColumnProps) => string)>,
                                                  IColumnRenderedWrapper,
                                                  ILocalFilterFnWrapper<IGridFilterConfiguration>,
                                                  IOnClickWrapper<ISortDirectionEntity>,
                                                  ITitleWrapper,
                                                  IUseGroupingWrapper,
                                                  IUseSortingWrapper,
                                                  ITplFnWrapper,
                                                  INameWrapper,
                                                  IRenderedWrapper,
                                                  IRendererWrapper,
                                                  IActionedWrapper,
                                                  IHeaderRendererWrapper<IGridColumnConfiguration>,
                                                  IFilterRendererWrapper<IGridColumnConfiguration> {
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
                                            IWebComponentConfiguration,
                                            IOnChangeGroupingWrapper<IFieldChangeEntity>,
                                            IOnChangeSortingWrapper<ISortDirectionEntity>,
                                            IColumnsConfigurationWrapper,
                                            IOnPlusClickWrapper,
                                            IUseServiceWrapper,
                                            IExpandedGroupsWrapper,
                                            ITightGridWrapper {
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
export interface ITabPanelConfiguration extends IComponentConfiguration,
                                                IUseIndicatorWrapper,
                                                IRippableWrapper,
                                                IOnCloseWrapper<ITabConfiguration>,
                                                IOnClickWrapper<ITabConfiguration>,
                                                IOnDeactivateWrapper,
                                                IItemsWrapper<ITabConfiguration[]> {
}

/**
 * @stable [02.08.2018]
 */
export interface IWebCameraConfiguration extends IComponentConfiguration,
                                                 ICameraWidthWrapper,
                                                 ICameraHeightWrapper,
                                                 IOnSelectWrapper<Blob> {
}

/**
 * @stable [09.06.2018]
 */
export interface IUniversalButtonConfiguration extends IUniversalComponentConfiguration,
                                                       IOnClickWrapper,
                                                       ITextWrapper,
                                                       IIconWrapper {
}

/* @stable - 07.04.2018 */
export interface IButtonConfiguration extends IUniversalButtonConfiguration,
                                              IWebComponentConfiguration,
                                              IOutlinedWrapper,
                                              IStringToWrapper,
                                              IRaisedWrapper,
                                              INotApplyFrameworkClassNameWrapper,
                                              ISimpleWrapper,
                                              ITypeWrapper {
}

/* @stable - 19.04.2018 */
export interface IRnButtonConfiguration extends IUniversalButtonConfiguration,
                                                IBorderedWrapper,
                                                IRoundedWrapper,
                                                IBooleanSuccessWrapper,
                                                IBlockWrapper,
                                                IBooleanSmallWrapper,
                                                IBooleanLargeWrapper,
                                                IBooleanIconLeftWrapper,
                                                IBooleanTransparentWrapper,
                                                IIconStyleWrapper<IKeyValue>,
                                                ITextStyleWrapper<IKeyValue>,
                                                IStyleWrapper<IKeyValue>,
                                                IDefaultOnPressWrapper {
}

/* @stable - 25.04.2018 */
export interface IRnApplicationConfiguration extends IUniversalComponentConfiguration,
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
 * @stable [31.07.2018]
 */
export interface IUniversalFieldConfiguration<TKeyboardEvent, TFocusEvent, TBasicEvent>
  extends IUniversalComponentConfiguration,
          IUniversalKeyboardHandlersConfiguration<TKeyboardEvent>,
          IDelayedChangesFieldPluginConfiguration,
          IOnFocusWrapper<TFocusEvent>,
          IOnBlurWrapper<TFocusEvent>,
          IOnClickWrapper<TBasicEvent>,
          IOnChangeWrapper,
          IOnClearWrapper,
          IChangeFormWrapper<(name: string, value: AnyT, validationGroup?: string) => void>,
          IAutoFocusWrapper,
          INotUseErrorMessageWrapper,
          IActionsWrapper<IFieldActionConfiguration[]>,
          INameWrapper,
          IMaskWrapper,
          IPatternWrapper,
          IDisplayMessageWrapper,
          IValidationGroupWrapper,
          IDisabledWrapper,
          IReadOnlyWrapper,
          IProgressWrapper,
          IRenderedWrapper,
          IEmptyValueWrapper,
          IPreventFocusWrapper,
          IRequiredWrapper,
          ICanReturnClearDirtyChangesValueWrapper,
          IMessageWrapper,
          IUseKeyboardWrapper,
          ICaretBlinkingFrequencyTimeoutWrapper,
          IValidateWrapper<string> {
}

/* @stable - 11.04.2018 */
export interface IFieldConfiguration extends IUniversalFieldConfiguration<IKeyboardEvent,
                                                                          IFocusEvent,
                                                                          IBasicEvent>,
                                             IWebComponentConfiguration,
                                             IAutoCompleteWrapper,
                                             IActionsPosition<FieldActionPositionEnum>,
                                             IBindDictionaryConfiguration,
                                             IMaskGuideWrapper,
                                             IMaskPlaceholderCharWrapper,
                                             ILabelWrapper,
                                             IPrefixLabelWrapper,
                                             IDisplayNameWrapper,
                                             ITypeWrapper,
                                             IPlaceholderWrapper,
                                             IPreventValueBindingWrapper,
                                             IClearActionWrapper,
                                             IStepWrapper {
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldsConfigurations {
  [fieldName: string]: string | IFieldConfiguration;
}

/* @stable - 14.04.2018 */
export interface IRoutesConfiguration extends IRestoreAuthWrapper<string>,
                                              IHomeWrapper<string>,
                                              IProfileWrapper<string>,
                                              ILogoutWrapper<string>,
                                              IAccessDeniedWrapper<string>,
                                              ISignInWrapper<string>,
                                              ISignUpWrapper<string> {
}

/* @stable - 14.04.2018 */
export interface IRouteComputedMatchConfiguration extends IKeyValueParamsWrapper,
                                                          IUrlWrapper,
                                                          IStringPathWrapper {
}

/* @stable - 14.04.2018 */
export enum ContainerVisibilityTypeEnum {
  PUBLIC,
  PRIVATE,
}

/* @stable - 14.04.2018 */
export interface IRouteConfiguration extends IStringPathWrapper,
                                             IBooleanModalWrapper,
                                             ITitleWrapper,
                                             IInitialWrapper<boolean | ((store: IUniversalApplicationStoreEntity) => boolean)>,
                                             IExactWrapper,
                                             IStringKeyWrapper,
                                             IOnEnterWrapper<() => void>,
                                             IAfterEnterWrapper<() => void>,
                                             IBeforeEnterWrapper<() => void>,
                                             IComputedMatchWrapper<IRouteComputedMatchConfiguration>,
                                             ITypeWrapper<ContainerVisibilityTypeEnum> {
}

/* @stable - 14.04.2018 */
export type RouteConfigurationT = IRouteConfiguration | ((routes: IRoutesConfiguration) => IRouteConfiguration);

/* @stable - 14.04.2018 */
export type ConnectorMapperT<TStoreEntity> = (state: TStoreEntity) => IKeyValue;

/* @stable - 14.04.2018 */
export interface IBasicConnectorConfiguration<TStoreEntity>
  extends IStateInitialChangesWrapper<TStoreEntity>,
          ICallbackWrapper<(ctor: IUniversalContainerClassEntity) => void>,
          IRouteConfigurationWrapper<RouteConfigurationT>,
          IMappersWrapper<Array<ConnectorMapperT<TStoreEntity>>> {
}

/* @stable - 14.04.2018 */
export interface IConnectorConfiguration<TAppState, TApplicationAccessConfig>
  extends IBasicConnectorConfiguration<TAppState>,
          IAccessConfigurationWrapper<TApplicationAccessConfig> {
}

/* @stable - 14.04.2018 */
export interface IDefaultConnectorConfiguration extends IConnectorConfiguration<{}, {}> {
}

/* @stable - 16.04.2018 */
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
export enum LayoutBuilderFactorEnum {
  FACTOR_1,
  FACTOR_2,
  FACTOR_4,
  FACTOR_8,
}

/* @stable - 16.04.2018 */
export const LAYOUT_BUILDER_FACTOR_TYPES = {
  FACTOR_1: LayoutBuilderFactorEnum.FACTOR_1,
  FACTOR_2: LayoutBuilderFactorEnum.FACTOR_2,
  FACTOR_4: LayoutBuilderFactorEnum.FACTOR_4,
  FACTOR_8: LayoutBuilderFactorEnum.FACTOR_8,
};

/* @stable - 16.04.2018 */
export type LayoutBuilderElementT = ILayoutBuilderConfiguration | React.ReactNode;

/* @stable - 16.04.2018 */
export interface ILayoutBuilderConfiguration extends ILayoutWrapper<LayoutBuilderTypeEnum>,
                                                     IStyleWrapper<IKeyValue>,
                                                     IBooleanFullWrapper,
                                                     IChildrenWrapper<LayoutBuilderElementT[]>,
                                                     IFactorWrapper<LayoutBuilderFactorEnum> {
}

/* @stable [23.04.2018] */
export interface IRnModalConfiguration extends IUniversalComponentConfiguration,
                                               IShadowStyleWrapper<IKeyValue>,
                                               IHasContentWrapperWrapper,
                                               ICenterAlignmentWrapper {
}

/* @stable [23.04.2018] */
export interface IGridRowConfiguration extends IComponentConfiguration,
                                               IStringArrayExcludeTargetsClassesWrapper {
}

/* @stable [24.04.2018] */
export interface IComponentConfiguration extends IUniversalComponentConfiguration,
                                                 IWebComponentConfiguration {
}

/* @stable - 08.04.2018 */
export interface IUniversalMessageConfiguration extends IUniversalComponentConfiguration,
                                                        IEmptyDataMessageWrapper,
                                                        IStringErrorMessageWrapper,
                                                        IEmptyMessageWrapper<React.ReactNode>,
                                                        IBooleanEmptyDataWrapper {
}

/* @stable [27.04.2018] */
export interface IRnDrawerConfiguration extends IUniversalComponentConfiguration,
                                                IContentWrapper {
}

/* @stable [27.04.2018] */
export interface IRnDefaultLayoutContainerConfiguration extends IUniversalContainerConfiguration,
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
export interface ICardConfiguration extends IComponentConfiguration,
                                            IOnClickWrapper,
                                            IRippableWrapper,
                                            IActionButtonsWrapper<React.ReactNode>,
                                            IActionIconsWrapper<React.ReactNode> {
}

/**
 * @stable [04.05.2018]
 */
export interface IAccessConfiguration {
}

/**
 * @stable [04.05.2018]
 */
export enum NavigationListItemTypeEnum {
  GROUP,
  SUB_HEADER,
  DIVIDER,
  LINK,
}

/**
 * @stable [04.05.2018]
 */
export interface INavigationListItemConfiguration extends IActiveWrapper,
                                                          IIconWrapper,
                                                          ILinkWrapper,
                                                          ILabelWrapper,
                                                          IChildrenWrapper<INavigationListItemConfiguration[]>,
                                                          IAccessConfigurationWrapper<IAccessConfiguration>,
                                                          ITypeWrapper<NavigationListItemTypeEnum> {
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
                                                      IOnEmptyDictionaryWrapper<IApiEntity>,
                                                      IOnLoadDictionaryWrapper {
}

/**
 * @stable [31.07.2018]
 */
export interface IMenuConfiguration extends IComponentConfiguration,
                                            IRenderToXWrapper,
                                            IRenderToYWrapper,
                                            IFilterPlaceholderWrapper,
                                            IMultiWrapper,
                                            IUseFilterWrapper,
                                            IRenderToBodyWrapper,
                                            IRenderToCenterOfBodyWrapper,
                                            IAdjustWidthWrapper,
                                            IRendererWrapper<IMenuItemEntity>,
                                            IFilterWrapper<(valueToFilter: string, item: IMenuItemEntity) => boolean>,
                                            ITplFnWrapper<IMenuItemEntity>,
                                            IOnSelectWrapper<IMenuItemEntity> {
}

/**
 * @stable [15.05.2018]
 */
export interface IFieldActionConfiguration extends IClassNameWrapper,
                                                   ITitleWrapper,
                                                   IDisabledWrapper,
                                                   ITypeWrapper,
                                                   IOnClickWrapper {
}

/**
 * @stable [18.05.2018]
 */
export enum FilterActionEnum {
  OPEN_FILTER,
  CLEAR_FILTER,
  REFRESH_DATA,
  DOWNLOAD_DATA,
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterActionConfiguration extends IClassNameWrapper,
                                                    ITypeWrapper<FilterActionEnum> {
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterConfiguration extends IActionsDisabledWrapper,
                                              INotUseFieldWrapper,
                                              IIconWrapper,
                                              IActionsWrapper<IFilterActionConfiguration[]>,
                                              IFieldConfigurationWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalUIIconConfiguration extends IUniversalComponentConfiguration,
                                                       IDisabledWrapper,
                                                       ITypeWrapper,
                                                       ISimpleWrapper,
                                                       IOnClickWrapper {
}

/**
 * @stable [18.05.2018]
 */
export interface IUIIconConfiguration extends IUniversalUIIconConfiguration,
                                              IWebComponentConfiguration {
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
export interface IHeaderConfiguration extends IComponentConfiguration,
                                              IMoreOptionsWrapper<IMenuItemEntity[]>,
                                              IMoreOptionsConfigurationWrapper<IUniversalButtonProps>,
                                              IItemsWrapper<JSX.Element>,
                                              INavigationActionTypeWrapper,
                                              IUseFooterWrapper,
                                              IOnNavigationActionClickWrapper,
                                              IOnMoreOptionsSelectWrapper<IMenuItemEntity> {
}

/**
 * @stable [05.06.2018]
 */
export interface IFilterAndSorterConfiguration extends IFilterFnWrapper,
                                                       ISorterFnWrapper {
}
