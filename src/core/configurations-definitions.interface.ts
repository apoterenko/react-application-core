import * as React from 'react';

import {
  AnyT,
  IActionsDisabledWrapper,
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
  INavigationActionTypeWrapper,
  IOnBlurWrapper,
  IOnClearWrapper,
  IOnEmptyDictionaryWrapper,
  IOnFocusWrapper,
  IOnLoadDictionaryWrapper,
  IOnSelectWrapper,
  IPrefixLabelWrapper,
  ISorterWrapper,
  ISubBorderWrapper,
  ITitleRendererWrapper,
  ITypeWrapper,
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
  IGenericFieldEntity,
  IKeyboardConfigurationEntity,
  IUniversalComponentEntity,
  ToolbarToolsEnum,
} from './definition';

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
  extends IGenericFieldEntity,
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
          ICaretBlinkingFrequencyTimeoutWrapper {
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

/**
 * @stable [06.05.2020]
 */
export interface IFieldConfigurationEntity
  extends IFieldConfigurationWrapper<IFieldProps> {
}

/* @stable - 08.04.2018 */
export interface IUniversalMessageConfiguration extends IUniversalComponentEntity,
                                                        IEmptyDataMessageWrapper,
                                                        IErrorMessageWrapper,
                                                        IEmptyMessageWrapper<React.ReactNode>,
                                                        IBooleanEmptyDataWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IBindDictionaryConfiguration extends IBindDictionaryWrapper,
                                                      IOnEmptyDictionaryWrapper<string, IApiEntity>,
                                                      IOnLoadDictionaryWrapper<(items: AnyT, dictionary?: string) => void> {
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterActionConfiguration extends IClassNameWrapper,
                                                    IDisabledWrapper,
                                                    ITypeWrapper<ToolbarToolsEnum> {
}

/**
 * @stable [18.05.2018]
 */
export interface IFilterConfiguration extends IActionsDisabledWrapper,
                                              IIconWrapper,
                                              IFullWrapper,
                                              IFieldConfigurationWrapper<IFieldProps> {
}

// TODO
export interface ISubHeaderConfiguration extends IComponentProps,
                                                 IItemsWrapper<JSX.Element>,
                                                 INavigationActionTypeWrapper,
                                                 IOnNavigationActionClickWrapper,
                                                 ITitleRendererWrapper<(originalElement) => JSX.Element>,
                                                 ISubBorderWrapper {
}

/**
 * @stable [05.06.2018]
 */
export interface IFilterAndSorterConfiguration extends IFilterFnWrapper,
                                                       ISorterWrapper {
}
