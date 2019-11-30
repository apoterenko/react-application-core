import * as React from 'react';

import {
  AnyT,
  EntityIdT,
  IActionButtonsWrapper,
  IActionIconsWrapper,
  IActionsDisabledWrapper,
  IActionsWrapper,
  IActiveValueWrapper,
  IActiveWrapper,
  IAliasWrapper,
  IBackwardRenderedWrapper,
  IBindDictionaryWrapper,
  IBooleanEmptyDataWrapper,
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  ICaretBlinkingFrequencyTimeoutWrapper,
  ICenteredWrapper,
  IChangeFormWrapper,
  IChildrenWrapper,
  IClassNameWrapper,
  IClearActionRenderedWrapper,
  IDisabledWrapper,
  IDisplayMessageWrapper,
  IEmptyDataMessageWrapper,
  IEmptyMessageWrapper,
  IEntity,
  IErrorMessageRenderedWrapper,
  IErrorMessageWrapper,
  IFactorWrapper,
  IFieldWrapper,
  IFilterFnWrapper,
  IFocusEvent,
  IForwardRenderedWrapper,
  IFullWrapper,
  IIconWrapper,
  IItemsWrapper,
  IKeyboardConfigurationWrapper,
  IKeyboardEvent,
  IKeyValue,
  ILayoutWrapper,
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
  IOnFocusWrapper,
  IOnLoadDictionaryWrapper,
  IOnMoreOptionsSelectWrapper,
  IOnSelectWrapper,
  IPrefixLabelWrapper,
  IRenderToBodyWrapper,
  IRippableWrapper,
  ISelectedWrapper,
  ISimpleWrapper,
  ISorterWrapper,
  IStyleWrapper,
  ISubBorderWrapper,
  ITitleRendererWrapper,
  ITypeWrapper,
  IUrlWrapper,
  IUseIndicatorWrapper,
  IValidateWrapper,
  IValidationGroupWrapper,
  IValueWrapper,
  IWidthWrapper,
} from './definitions.interface';
import {
  IReactOnClickWrapper,
  IOnNavigationActionClickWrapper,
} from './react-definitions.interface';
import {
  IApiEntity,
  IComponentProps,
  IGenericFieldEntity,
  IMenuItemEntity,
  INavigationItemEntity,
  IUniversalComponentEntity,
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

/**
 * @stable [18.06.2018]
 */
export interface IUniversalKeyboardHandlersConfiguration<TKeyboardEvent = IKeyboardEvent> {
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

export interface IKeyboardKeyEntity extends IDisabledWrapper {
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
  keyboardKeyConfiguration?: IKeyboardKeyEntity; // TODO
}

/**
 * @stable [31.07.2018]
 */
export interface IUniversalFieldProps
  extends IGenericFieldEntity,
          IUniversalComponentEntity,
          IUniversalKeyboardHandlersConfiguration<IKeyboardEvent>,
          IOnFocusWrapper<IFocusEvent>,
          IOnBlurWrapper<IFocusEvent>,
          IReactOnClickWrapper<any>,
          IOnChangeWrapper,
          IOnClearWrapper,
          IChangeFormWrapper<(name: string, value: AnyT, validationGroup?: string) => void>,
          IErrorMessageRenderedWrapper,
          IDisplayMessageWrapper,
          IValidationGroupWrapper,
          IMessageWrapper,
          IKeyboardConfigurationWrapper<IKeyboardConfiguration>,
          ICaretBlinkingFrequencyTimeoutWrapper,
          IValidateWrapper<string> {
  preventManualChanges?: boolean; // TODO
}

/* @stable - 11.04.2018 */
export interface IFieldProps extends IComponentProps,
  IUniversalFieldProps,
  IBindDictionaryConfiguration,
  IMaskGuideWrapper,
  IMaskPlaceholderCharWrapper,
  IPrefixLabelWrapper,
  IClearActionRenderedWrapper {
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
