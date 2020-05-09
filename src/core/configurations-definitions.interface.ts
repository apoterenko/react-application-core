import * as React from 'react';

import {
  AnyT,
  IBindDictionaryWrapper,
  IBooleanEmptyDataWrapper,
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  ICaretBlinkingFrequencyTimeoutWrapper,
  IChangeFormWrapper,
  IClearActionRenderedWrapper,
  IDisplayMessageWrapper,
  IEmptyDataMessageWrapper,
  IEmptyMessageWrapper,
  IErrorMessageRenderedWrapper,
  IErrorMessageWrapper,
  IFieldConfigurationWrapper,
  IFilterFnWrapper,
  IFocusEvent,
  IItemsWrapper,
  IKeyboardEvent,
  IMaskGuideWrapper,
  IMaskPlaceholderCharWrapper,
  IMessageWrapper,
  INavigationActionTypeWrapper,
  IOnBlurWrapper,
  IOnClearWrapper,
  IOnDictionaryEmptyWrapper,
  IOnFocusWrapper,
  IOnDictionaryLoadWrapper,
  IOnSelectWrapper,
  IPrefixLabelWrapper,
  ISorterWrapper,
  ISubBorderWrapper,
  ITitleRendererWrapper,
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
  IGenericFieldEntity2,
  IKeyboardConfigurationEntity,
  IUniversalComponentEntity,
} from './definition';

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
  extends IGenericFieldEntity2,
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
export interface IFieldProps2 extends IComponentProps,
  IUniversalFieldProps,
  IBehavioralFieldEntity,
  IMaskGuideWrapper,
  IMaskPlaceholderCharWrapper,
  IClearActionRenderedWrapper {
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
}

export interface IFieldConfigurationEntity<TFieldProps extends IFieldProps2 = IFieldProps2>
  extends IFieldConfigurationWrapper<IFieldProps2> {
}

/* @stable - 08.04.2018 */
export interface IUniversalMessageConfiguration extends IUniversalComponentEntity,
                                                        IEmptyDataMessageWrapper,
                                                        IErrorMessageWrapper,
                                                        IEmptyMessageWrapper<React.ReactNode>,
                                                        IBooleanEmptyDataWrapper {
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
