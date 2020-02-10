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
  IBindDictionaryWrapper,
  IBooleanEmptyDataWrapper,
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  ICaretBlinkingFrequencyTimeoutWrapper,
  IChangeFormWrapper,
  IClassNameWrapper,
  IClearActionRenderedWrapper,
  IDisabledWrapper,
  IDisplayMessageWrapper,
  IEmptyDataMessageWrapper,
  IEmptyMessageWrapper,
  IEntity,
  IErrorMessageRenderedWrapper,
  IErrorMessageWrapper,
  IFieldConfigurationWrapper,
  IFilterFnWrapper,
  IFocusEvent,
  IFullWrapper,
  IIconWrapper,
  IItemsWrapper,
  IKeyboardEvent,
  IMaskGuideWrapper,
  IMaskPlaceholderCharWrapper,
  IMessageWrapper,
  IMoreOptionsWrapper,
  INameWrapper,
  INavigationActionTypeWrapper,
  INotUseFieldWrapper,
  IOnBlurWrapper,
  IOnClearWrapper,
  IOnClickWrapper,
  IOnEmptyDictionaryWrapper,
  IOnFocusWrapper,
  IOnLoadDictionaryWrapper,
  IOnMoreOptionsSelectWrapper,
  IOnSelectWrapper,
  IPrefixLabelWrapper,
  IRippableWrapper,
  ISelectedWrapper,
  ISimpleWrapper,
  ISorterWrapper,
  ISubBorderWrapper,
  ITitleRendererWrapper,
  ITouchedWrapper,
  ITypeWrapper,
  IValidateWrapper,
  IValueWrapper,
} from './definitions.interface';
import {
  IOnNavigationActionClickWrapper,
} from './react-definitions.interface';
import {
  IApiEntity,
  IBaseEvent,
  IBehavioralBaseFieldEntity,
  IBehavioralFieldEntity,
  IComponentProps,
  IGenericBaseFieldEntity,
  IKeyboardConfigurationEntity,
  IMenuItemEntity,
  INavigationItemEntity,
  IUniversalComponentEntity,
  IWebComponentEntity,
} from './definition';

/**
 * @stable [31.05.2018]
 */
export interface ISubHeaderConfigurationWrapper<THeaderConfiguration = ISubHeaderConfiguration> {
  subHeaderConfiguration?: THeaderConfiguration;
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
 * @stable [18.06.2018]
 */
export interface IUniversalKeyboardHandlersConfiguration<TKeyboardEvent = IKeyboardEvent> {
  onKeyTab?(event: TKeyboardEvent): void;
  onKeyEnter?(event: IBaseEvent): void;
  onKeyUp?(event: TKeyboardEvent): void;
  onKeyDown?(event: TKeyboardEvent): void;
  onKeyEscape?(event: IBaseEvent): void;
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
 * @stable [02.08.2018]
 */
export interface IWebCameraConfiguration extends IComponentProps,
                                                 ICameraWidthWrapper,
                                                 ICameraHeightWrapper,
                                                 IOnSelectWrapper<Blob> {
}

/**
 * @stable [31.07.2018]
 */
export interface IUniversalFieldProps
  extends IGenericBaseFieldEntity,
          IBehavioralBaseFieldEntity,
          IUniversalComponentEntity,
          IUniversalKeyboardHandlersConfiguration<IKeyboardEvent>,
          IOnFocusWrapper<IFocusEvent>,
          IOnBlurWrapper<IFocusEvent>,
          IOnClearWrapper,
          IChangeFormWrapper<(name: string, value: AnyT) => void>,
          IErrorMessageRenderedWrapper,
          IDisplayMessageWrapper,
          IMessageWrapper,
          IKeyboardConfigurationEntity,
          ICaretBlinkingFrequencyTimeoutWrapper,
          IValidateWrapper<string> {
}

/* @stable - 11.04.2018 */
export interface IFieldProps extends IComponentProps,
  IUniversalFieldProps,
  IBehavioralFieldEntity,
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
                                            IOnClickWrapper,
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
                                              IFieldConfigurationWrapper<IFieldProps> {
}

/**
 * @stable [18.05.2018]
 */
export interface IUniversalUIIconConfiguration extends IUniversalComponentEntity,
                                                       IDisabledWrapper,
                                                       ITypeWrapper,
                                                       ITouchedWrapper,
                                                       ISimpleWrapper,
                                                       IClassNameWrapper<string | ((...args: AnyT[]) => string)>,
                                                       IOnClickWrapper {
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

// TODO
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
