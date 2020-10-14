import {
  ICameraHeightWrapper,
  ICameraWidthWrapper,
  ICaretBlinkingFrequencyWrapper,
  IDisplayMessageWrapper,
  IFieldConfigurationWrapper,
  IFilterFnWrapper,
  IOnSelectWrapper,
  ISorterWrapper,
} from './definitions.interface';
import {
  IBaseEvent,
  IComponentProps,
  IFieldProps,
  IGenericFieldEntity,
  IKeyboardEvent,
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
  extends IGenericFieldEntity,
          IUniversalComponentEntity,
          IUniversalKeyboardHandlersConfiguration<IKeyboardEvent>,
          IDisplayMessageWrapper,
          ICaretBlinkingFrequencyWrapper {
}

/* @stable - 11.04.2018 */
export interface IFieldProps2 extends IComponentProps,
  IUniversalFieldProps {
}

export interface IFieldConfigurationEntity<TFieldProps extends IFieldProps = IFieldProps>
  extends IFieldConfigurationWrapper<IFieldProps> {
}

/**
 * @stable [05.06.2018]
 */
export interface IFilterAndSorterConfiguration extends IFilterFnWrapper,
                                                       ISorterWrapper {
}
