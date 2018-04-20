import * as React from 'react';

import {
  IEntitySorterWrapper,
  INonInteractiveWrapper,
  ISimpleWrapper,
  IStringEmptyMessageWrapper,
  IUseAvatarWrapper,
  IUseTwoLineWrapper,
  IUseAddActionWrapper,
  IEntityRendererWrapper,
  IEntityToClassNameWrapper,
  IEntityTplWrapper,
  IStringIconWrapper,
  IActionIconWrapper,
  IActionTextWrapper,
  IAlwaysDirtyWrapper,
  IClassNameWrapper,
  IDisabledWrapper,
  INotUseActionsWrapper,
  INotUseClassNameWrapper,
  IReadOnlyWrapper,
  IResetTextWrapper,
  IUseResetButtonWrapper,
  ISubmittableWrapper,
  IRippableWrapper,
  IWidthWrapper,
  IStringTitleWrapper,
  IUseGroupingWrapper,
  IUseSortingWrapper,
  IAlignWrapper,
  IUseLocalFilteringWrapper,
  INameWrapper,
  INumberValueWrapper,
  IItemsWrapper,
  IBooleanActiveWrapper,
  IStringTypeWrapper,
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
  ITypeWrapper,
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
  IStringUrlWrapper,
  IStringKeyWrapper,
  ICallbackWrapper,
  IBooleanInitialWrapper,
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
} from './definitions.interface';
import { IContainerClassEntity } from './entities-definitions.interface';

/* @stable - 05.04.2018 */
export interface IItemConfigurationWrapper<TItemConfiguration> {
  itemConfiguration?: TItemConfiguration;
}

/* @stable - 05.04.2018 */
export interface IColumnsConfigurationWrapper<TColumns> {
  columnsConfiguration?: TColumns;
}

/* @stable - 31.03.2018 */
export interface IListConfigurationWrapper {
  listConfiguration?: IListConfiguration;
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

/* @stable - 14.04.2018 */
export interface IAccessConfigurationWrapper<TAccessConfiguration> {
  accessConfiguration?: TAccessConfiguration;
}

/* @stable - 31.03.2018 */
export interface IListItemConfiguration extends IEntityRendererWrapper,
                                                IEntityTplWrapper,
                                                IEntityToClassNameWrapper,
                                                IRippableWrapper,
                                                IStringIconWrapper {
}

/* @stable - 04.04.2018 */
export interface IBaseListConfiguration extends IUseAddActionWrapper,
                                                IEntitySorterWrapper,
                                                IStringEmptyMessageWrapper {
}

/* @stable - 04.04.2018 */
export interface IListConfiguration extends IBaseListConfiguration,
                                            ISimpleWrapper,
                                            IUseTwoLineWrapper,
                                            IUseAvatarWrapper,
                                            INonInteractiveWrapper,
                                            IItemConfigurationWrapper<IListItemConfiguration> {
}

/* @stable - 31.03.2018 */
export interface IFormConfiguration extends INotUseClassNameWrapper,
                                            INotUseActionsWrapper,
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
export interface IGridColumnConfiguration extends IStringTitleWrapper,
                                                  IUseGroupingWrapper,
                                                  IUseLocalFilteringWrapper,
                                                  IUseSortingWrapper,
                                                  IAlignWrapper,
                                                  IEntityTplWrapper,
                                                  IEntityRendererWrapper,
                                                  IWidthWrapper {
}

/* @stable - 04.04.2018 */
export interface IGridConfiguration extends IBaseListConfiguration,
                                            IColumnsConfigurationWrapper<IGridColumnConfiguration[]> {
}

/* @stable - 03.04.2018 */
export interface IGridHeaderColumnConfiguration extends IGridColumnConfiguration {
}

/* @stable - 06.04.2018 */
export interface ITabConfiguration extends INumberValueWrapper,
                                           IBooleanActiveWrapper,
                                           INameWrapper,
                                           IStringIconWrapper {
}

/* @stable - 06.04.2018 */
export interface ITabPanelConfiguration extends IItemsWrapper<ITabConfiguration[]> {
}

/* @stable - 19.04.2018 */
export interface IUniversalButtonConfiguration extends IStringTextWrapper,
                                                       IStringIconWrapper {
}

/* @stable - 07.04.2018 */
export interface IButtonConfiguration extends IUniversalButtonConfiguration,
                                              IAccentWrapper,
                                              IStringToWrapper,
                                              IRaisedWrapper,
                                              IClassNameWrapper,
                                              IEventOnClickWrapper,
                                              INotUseClassNameWrapper,
                                              IStringTitleWrapper,
                                              ISimpleWrapper,
                                              IStringTypeWrapper {
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

/* @stable - 11.04.2018 */
export interface IApplicationConfiguration extends IBasenameWrapper,
                                                   IHideNavBarWrapper {
}

/* @stable - 11.04.2018 */
export interface IFieldConfiguration extends IReadOnlyWrapper,
                                             ILabelWrapper,
                                             IPrefixLabelWrapper,
                                             IDisplayNameWrapper,
                                             IDisplayMessageWrapper,
                                             IStringTypeWrapper,
                                             IPlaceholderWrapper,
                                             IPreventValueBindingWrapper,
                                             IAutoFocusWrapper,
                                             IStringPatternWrapper,
                                             IDisabledWrapper {
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
                                                          IStringUrlWrapper,
                                                          IStringPathWrapper {
}

/* @stable - 14.04.2018 */
export enum ContainerVisibilityTypeEnum {
  PUBLIC,
  PRIVATE,
}

/* @stable - 14.04.2018 */
export interface IRouteConfiguration extends IStringPathWrapper,
                                             IStringTitleWrapper,
                                             IBooleanInitialWrapper,
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
export type ConnectorMapperT<TAppState, TResult> = (state: TAppState) => TResult;

/* @stable - 14.04.2018 */
export interface IBasicConnectorConfiguration<TAppState>
  extends IStateInitialChangesWrapper<TAppState>,
          ICallbackWrapper<(ctor: IContainerClassEntity) => void>,
          IRouteConfigurationWrapper<RouteConfigurationT>,
          IMappersWrapper<Array<ConnectorMapperT<TAppState, IKeyValue>>> {
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

/* @stable - 20.04.2018 */
export interface IRnModalConfiguration extends IShadowStyleWrapper<IKeyValue> {
}
