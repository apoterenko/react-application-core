import * as React from 'react';

import {
  AnyT,
  EntityIdT,
  IActionButtonsWrapper,
  IActionIconsWrapper,
  IActionsDisabledWrapper,
  IActionsPosition,
  IActionsWrapper,
  IActiveValueWrapper,
  IActiveWrapper,
  IAfterEnterWrapper,
  IAliasWrapper,
  IAutoCompleteWrapper,
  IBackwardRenderedWrapper,
  IBasenameWrapper,
  IBeforeEnterWrapper,
  IBindDictionaryWrapper,
  IBooleanEmptyDataWrapper,
  IBooleanModalWrapper,
  ICallbackWrapper,
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  IReturnValueToClearDirtyChangesWrapper,
  ICaretBlinkingFrequencyTimeoutWrapper,
  ICenteredWrapper,
  IChangeableWrapper,
  IChangeFormWrapper,
  IChildrenWrapper,
  IClassNameWrapper,
  IClearActionWrapper,
  IComputedMatchWrapper,
  IDefaultValueWrapper,
  IDisabledWrapper,
  IDisplayMessageWrapper,
  IDisplayNameWrapper,
  IEmptyDataMessageWrapper,
  IEmptyMessageWrapper,
  IEntity,
  IErrorMessageRenderedWrapper,
  IErrorMessageWrapper,
  IExactWrapper,
  IFactorWrapper,
  IFieldWrapper,
  IFilterFnWrapper,
  IFocusEvent,
  IForwardRenderedWrapper,
  IFullWrapper,
  IHideNavBarWrapper,
  IIconWrapper,
  IInitialWrapper,
  IItemsWrapper,
  IKeyboardConfigurationWrapper,
  IKeyboardEvent,
  IKeyValue,
  IKeyWrapper,
  ILayoutWrapper,
  IMappersWrapper,
  IMaskGuideWrapper,
  IMaskPlaceholderCharWrapper,
  IMessageWrapper,
  IMoreOptionsWrapper,
  INameWrapper,
  INavigationActionTypeWrapper,
  INotUseFieldWrapper,
  IOnBlurWrapper,
  IOnChangeWrapper,
  IOnClearWrapper,
  IOnCloseWrapper,
  IOnDeactivateWrapper,
  IOnEmptyDictionaryWrapper,
  IOnEnterWrapper,
  IOnFocusWrapper,
  IOnLoadDictionaryWrapper,
  IOnMoreOptionsSelectWrapper,
  IOnSelectWrapper,
  IParamsWrapper,
  IPathWrapper,
  IPrefixLabelWrapper,
  IRenderToBodyWrapper,
  IRippableWrapper,
  ISelectedWrapper,
  ISimpleWrapper,
  ISorterWrapper,
  IStepWrapper,
  IStyleWrapper,
  ISubBorderWrapper,
  ITitleRendererWrapper,
  ITitleWrapper,
  ITypeWrapper,
  IUrlWrapper,
  IUseIndicatorWrapper,
  IUseSyntheticCursorWrapper,
  IValidateWrapper,
  IValidationGroupWrapper,
  IValueWrapper,
  IWidthWrapper,
  IAccessConfigurationWrapper,
} from './definitions.interface';
import {
  IReactOnClickWrapper,
  IOnNavigationActionClickWrapper,
} from './react-definitions.interface';
import {
  IApiEntity,
  IBaseEvent,
  IComponentProps,
  IDelayedChangesEntity,
  IFieldActionEntity,
  IGenericFieldEntity,
  IMenuItemEntity,
  INamedConstructor,
  INavigationItemEntity,
  IUniversalComponentEntity,
  IUniversalContainerCtor,
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
export interface IFieldConfigurationWrapper<TFieldConfiguration = IFieldProps> {
  fieldConfiguration?: TFieldConfiguration;
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
 * @stable [05.10.2018]
 */
export type GroupValueRendererT = (groupedRowValue: EntityIdT, groupedRows: IEntity[]) => React.ReactNode;

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
                                                 IOnSelectWrapper<Blob> {
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
          IDelayedChangesEntity,
          IUniversalComponentEntity,
          IUniversalKeyboardHandlersConfiguration<TKeyboardEvent>,
          IOnFocusWrapper<IFocusEvent>,
          IOnBlurWrapper<IFocusEvent>,
          IReactOnClickWrapper<TBasicEvent>,
          IOnChangeWrapper,
          IOnClearWrapper,
          IChangeFormWrapper<(name: string, value: AnyT, validationGroup?: string) => void>,
          IErrorMessageRenderedWrapper,
          IActionsWrapper<IFieldActionEntity[]>,
          IDisplayMessageWrapper,
          IValidationGroupWrapper,
          IReturnValueToClearDirtyChangesWrapper,
          IMessageWrapper,
          IKeyboardConfigurationWrapper<IKeyboardConfiguration>,
          ICaretBlinkingFrequencyTimeoutWrapper,
          IValidateWrapper<string>,
          IUseSyntheticCursorWrapper,
          IChangeableWrapper,
          IDefaultValueWrapper {
  bufferValue?: boolean;
  preventManualChanges?: boolean; // TODO
}

/* @stable - 11.04.2018 */
export interface IFieldProps extends IUniversalFieldConfiguration<IKeyboardEvent,
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
                                             IClearActionWrapper,
                                             IStepWrapper {
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldsConfigurations {
  [fieldName: string]: string | IFieldProps | ((field) => IFieldProps | string);
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
export enum LayoutBuilderFactorsEnum {
  FACTOR_0_5,
  FACTOR_0_75,
  FACTOR_1,
  FACTOR_2,
  FACTOR_4,
  FACTOR_8,
}

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

/* @stable - 08.04.2018 */
export interface IUniversalMessageConfiguration extends IUniversalComponentEntity,
                                                        IEmptyDataMessageWrapper,
                                                        IErrorMessageWrapper,
                                                        IEmptyMessageWrapper<React.ReactNode>,
                                                        IBooleanEmptyDataWrapper {
}

/**
 * @stable [27.04.2018]
 */
export interface ICardConfiguration extends IComponentProps,
                                            IReactOnClickWrapper,
                                            IRippableWrapper,
                                            IActionButtonsWrapper<React.ReactNode>,
                                            IActionIconsWrapper<React.ReactNode> {
  entity?: IEntity;
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
                                                       ISorterWrapper {
}
