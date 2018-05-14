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
  ISubmittableWrapper,
  IRippableWrapper,
  IWidthWrapper,
  ITitleWrapper,
  IUseGroupingWrapper,
  IUseSortingWrapper,
  IAlignWrapper,
  IUseLocalFilteringWrapper,
  INameWrapper,
  INumberValueWrapper,
  IItemsWrapper,
  IActiveWrapper,
  ITypeWrapper,
  IBasenameWrapper,
  IAutoFocusWrapper,
  IPreventValueBindingWrapper,
  IPlaceholderWrapper,
  IStringPatternWrapper,
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
  IBooleanBlockWrapper,
  IBooleanIconLeftWrapper,
  IBooleanLargeWrapper,
  IBooleanSmallWrapper,
  IBooleanSuccessWrapper,
  IBooleanTransparentWrapper,
  IBorderedWrapper,
  IIconStyleWrapper,
  IRoundedWrapper,
  IStringTextWrapper,
  ITextStyleWrapper,
  IAccentWrapper,
  IEventOnClickWrapper,
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
  IPluginsWrapper,
  IEntityOnSelectWrapper,
  IOnCreateWrapper,
  IBooleanEmptyDataWrapper,
  IStringEmptyDataMessageWrapper,
  IStringEmptyMessageWrapper,
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
  ISectionNameWrapper,
  IActionIconsWrapper,
  IActionButtonsWrapper,
  IOnClickWrapper,
  IEntity,
  ILinkWrapper,
  IDelayTimeoutWrapper,
  AnyT,
  IOnDelayWrapper,
  IComponentWrapper,
  IComponentPropsWrapper,
  IKeyboardEvent,
  IBindDictionaryWrapper,
  IOnEmptyDictionaryWrapper,
  IOnLoadDictionaryWrapper,
  IMaskGuideWrapper,
  IMaskPlaceholderCharWrapper,
  IMaskWrapper,
  IRequiredWrapper,
  IOnChangeWrapper,
  IRobotModeWrapper,
  ISelectedWrapper,
  IUseIndicatorWrapper,
  IUseKeyboardWrapper,
  IFilterFnWrapper,
  IUseFilterWrapper,
  IFilterPlaceholderWrapper,
  IRenderToBodyWrapper,
  IRenderToCenterOfBodyWrapper,
  ITplFnWrapper,
  IFilterWrapper,
} from './definitions.interface';
import {
  IContainerClassEntity,
  IUniversalComponentPluginClassEntity,
  IUniversalApplicationStoreEntity,
  IUniversalComponentClassEntity,
  IMenuItemEntity,
} from './entities-definitions.interface';
import { IFieldProps } from './props-definitions.interface';

/**
 * @stable [14.05.2018]
 */
export interface IItemConfigurationWrapper<TItemConfiguration> {
  itemConfiguration?: TItemConfiguration;
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
export interface IColumnsConfigurationWrapper<TColumnsConfiguration> {
  columnsConfiguration?: TColumnsConfiguration;
}

/**
 * @stable [14.05.2018]
 */
export interface IListConfigurationWrapper<TListConfiguration = IListConfiguration> {
  listConfiguration?: TListConfiguration;
}

/* @stable - 03.04.2018 */
export interface IGridConfigurationWrapper {
  gridConfiguration?: IGridConfiguration;
}

/* @stable - 31.03.2018 */
export interface IFormConfigurationWrapper {
  formConfiguration?: IFormConfiguration;
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
 * @stable [04.05.2018]
 */
export interface IKeyboardHandlersConfiguration {
  onKeyEnter?(event: IKeyboardEvent): void;
  onKeyUp?(event: IKeyboardEvent): void;
  onKeyDown?(event: IKeyboardEvent): void;
  onKeyEscape?(event: IKeyboardEvent): void;
  onKeyArrowDown?(event: IKeyboardEvent): void;
  onKeyArrowUp?(event: IKeyboardEvent): void;
  onKeyBackspace?(event: IKeyboardEvent): void;
}

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
                                                         ITplFnWrapper {
}

/* @stable [24.04.2018] */
export interface IRnListItemConfiguration extends IUniversalListItemConfiguration,
                                                  IAvatarWrapper<string | ((data: IKeyValue) => string)>,
                                                  ISeparatorsWrapper<IKeyValue> {
}

/* @stable - 31.03.2018 */
export interface IListItemConfiguration extends IUniversalListItemConfiguration,
                                                IEntityToClassNameWrapper,
                                                IRippableWrapper,
                                                IIconWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface ICardListItemConfiguration extends IUniversalListItemConfiguration,
                                                    IActionButtonsWrapper<(entity: IEntity) => JSX.Element>,
                                                    IActionIconsWrapper<(entity: IEntity) => JSX.Element> {
}

/* @stable [23.04.2018] */
export interface IUniversalListConfiguration
    <TItemConfiguration extends IUniversalListItemConfiguration = IUniversalListItemConfiguration>
  extends IUniversalComponentConfiguration,
          IUseAddActionWrapper,
          ISorterFnWrapper,
          IFilterFnWrapper,
          IOnCreateWrapper,
          IEntityOnSelectWrapper,
          IItemConfigurationWrapper<TItemConfiguration> {
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

/* @stable - 31.03.2018 */
export interface IFormConfiguration extends INotUseActionsWrapper,
                                            IUseResetButtonWrapper,
                                            IClassNameWrapper,
                                            ISubmittableWrapper,
                                            IAlwaysDirtyWrapper,
                                            IDisabledWrapper,
                                            IReadOnlyWrapper,
                                            IActionTextWrapper,
                                            IResetTextWrapper,
                                            IActionIconWrapper {
}

/* @stable - 04.04.2018 */
export interface IGridColumnConfiguration extends ITitleWrapper,
                                                  IUseGroupingWrapper,
                                                  IUseLocalFilteringWrapper,
                                                  IUseSortingWrapper,
                                                  IAlignWrapper,
                                                  ITplFnWrapper,
                                                  IRendererWrapper,
                                                  IWidthWrapper {
}

/* @stable - 04.04.2018 */
export interface IGridConfiguration extends IUniversalListConfiguration,
                                            IWebComponentConfiguration,
                                            IColumnsConfigurationWrapper<IGridColumnConfiguration[]> {
}

/* @stable - 03.04.2018 */
export interface IGridHeaderColumnConfiguration extends IGridColumnConfiguration {
}

/**
 * @stable [04.05.2018]
 */
export interface ITabConfiguration extends INumberValueWrapper,
                                           IClassNameWrapper,
                                           IActiveWrapper,
                                           INameWrapper,
                                           ISelectedWrapper,
                                           IUrlWrapper,
                                           IIconWrapper {
}

/**
 * @stable [06.05.2018]
 */
export interface ITabPanelConfiguration extends IComponentConfiguration,
                                                IUseIndicatorWrapper,
                                                IOnClickWrapper<(payload: ITabConfiguration) => void>,
                                                IItemsWrapper<ITabConfiguration[]> {
}

/* @stable - 19.04.2018 */
export interface IUniversalButtonConfiguration extends IUniversalComponentConfiguration,
                                                       IStringTextWrapper,
                                                       IIconWrapper {
}

/* @stable - 07.04.2018 */
export interface IButtonConfiguration extends IUniversalButtonConfiguration,
                                              IWebComponentConfiguration,
                                              IAccentWrapper,
                                              IStringToWrapper,
                                              IRaisedWrapper,
                                              IEventOnClickWrapper,
                                              INotApplyFrameworkClassNameWrapper,
                                              ISimpleWrapper,
                                              ITypeWrapper {
}

/* @stable - 19.04.2018 */
export interface IRnButtonConfiguration extends IUniversalButtonConfiguration,
                                                IBorderedWrapper,
                                                IRoundedWrapper,
                                                IBooleanSuccessWrapper,
                                                IBooleanBlockWrapper,
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

/* @stable - 11.04.2018 */
export interface IFieldConfiguration extends IComponentConfiguration,
                                             IOnChangeWrapper,
                                             IDelayedChangesFieldPluginConfiguration,
                                             IRequiredWrapper,
                                             IBindDictionaryConfiguration,
                                             IMaskWrapper,
                                             IMaskGuideWrapper,
                                             IMaskPlaceholderCharWrapper,
                                             IKeyboardHandlersConfiguration,
                                             IReadOnlyWrapper,
                                             ILabelWrapper,
                                             IPrefixLabelWrapper,
                                             IDisplayNameWrapper,
                                             IDisplayMessageWrapper,
                                             ITypeWrapper,
                                             IPlaceholderWrapper,
                                             IPreventValueBindingWrapper,
                                             IAutoFocusWrapper,
                                             IStringPatternWrapper,
                                             IDisabledWrapper,
                                             IUseKeyboardWrapper {
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
          ICallbackWrapper<(ctor: IContainerClassEntity) => void>,
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
export interface IUniversalComponentConfiguration
  extends ITitleWrapper,
          IPluginsWrapper<IUniversalComponentPluginClassEntity | IUniversalComponentPluginClassEntity[]> {
}

/* @stable [24.04.2018] */
export interface IComponentConfiguration extends IUniversalComponentConfiguration,
                                                 IWebComponentConfiguration {
}

/* @stable - 08.04.2018 */
export interface IUniversalMessageConfiguration extends IUniversalComponentConfiguration,
                                                        IStringEmptyDataMessageWrapper,
                                                        IStringErrorMessageWrapper,
                                                        IStringEmptyMessageWrapper,
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
                                            IActionButtonsWrapper<JSX.Element>,
                                            IActionIconsWrapper<JSX.Element> {
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
export interface INavigationListConfiguration extends IUniversalComponentConfiguration,
                                                      IItemsWrapper<INavigationListItemConfiguration[]> {
}

/**
 * @stable [04.05.2018]
 */
export interface IDelayedChangesFieldPluginConfiguration extends IDelayTimeoutWrapper,
                                                                 IOnDelayWrapper<(value: AnyT) => void> {
}

/**
 * @stable [04.05.2018]
 */
export interface IAutoFocusedConfiguration extends IUniversalComponentConfiguration,
                                                   IDelayTimeoutWrapper,
                                                   IRobotModeWrapper,
                                                   IComponentPropsWrapper<IFieldProps>,
                                                   IComponentWrapper<IUniversalComponentClassEntity<IFieldProps>> {
}

/**
 * @stable [04.05.2018]
 */
export interface IBindDictionaryConfiguration extends IBindDictionaryWrapper,
                                                      IOnEmptyDictionaryWrapper,
                                                      IOnLoadDictionaryWrapper {
}

/**
 * @stable [14.05.2018]
 */
export interface IMenuConfiguration extends IComponentConfiguration,
                                            IFilterPlaceholderWrapper,
                                            IUseFilterWrapper,
                                            IRenderToBodyWrapper,
                                            IRenderToCenterOfBodyWrapper,
                                            IRendererWrapper<IMenuItemEntity>,
                                            IFilterWrapper<(valueToFilter: string, item: IMenuItemEntity) => boolean>,
                                            ITplFnWrapper<IMenuItemEntity> {
}
