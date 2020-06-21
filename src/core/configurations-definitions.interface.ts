import {
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  ICaretBlinkingFrequencyTimeoutWrapper,
  IDisplayMessageWrapper,
  IFieldConfigurationWrapper,
  IFilterFnWrapper,
  IFocusEvent,
  IKeyboardEvent,
  IMaskPlaceholderCharWrapper,
  IOnBlurWrapper,
  IOnSelectWrapper,
  ISorterWrapper,
} from './definitions.interface';
import {
  IBaseEvent,
  IComponentProps,
  IGenericFieldEntity2,
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
          IUniversalComponentEntity,
          IUniversalKeyboardHandlersConfiguration<IKeyboardEvent>,
          IOnBlurWrapper<IFocusEvent>,
          IDisplayMessageWrapper,
          ICaretBlinkingFrequencyTimeoutWrapper {
}

/* @stable - 11.04.2018 */
export interface IFieldProps2 extends IComponentProps,
  IUniversalFieldProps,
  IMaskPlaceholderCharWrapper {
  rows?: number;
  cols?: number;
}

export interface IFieldConfigurationEntity<TFieldProps extends IFieldProps2 = IFieldProps2>
  extends IFieldConfigurationWrapper<IFieldProps2> {
}

/**
 * @stable [05.06.2018]
 */
export interface IFilterAndSorterConfiguration extends IFilterFnWrapper,
                                                       ISorterWrapper {
}
