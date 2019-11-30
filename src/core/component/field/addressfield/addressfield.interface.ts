import { IBaseTextFieldState } from '../textfield';
import {
  IPlaceWrapper,
  ILatWrapper,
  ILngWrapper,
  IOnChangePlaceWrapper,
  IPlaceActionRenderedWrapper,
  IUseZipCodeWrapper,
  INotUseCustomValidatorWrapper,
} from '../../../definitions.interface';
import { IBaseTextFieldProps } from '../textfield';
import { IChangePlacePayloadEntity } from '../../../definition';

/**
 * @stable [30.07.2018]
 */
export enum AddressMapMarkerActionEnum {
  PUT_MARKER_HERE,
}

/**
 * @stable [29.07.2018]
 */
export interface IAddressFieldProps extends IBaseTextFieldProps,
                                            IUseZipCodeWrapper,
                                            INotUseCustomValidatorWrapper,
                                            IPlaceActionRenderedWrapper,
                                            IOnChangePlaceWrapper<IChangePlacePayloadEntity>,
                                            ILatWrapper,
                                            ILngWrapper {
}

/**
 * @stable [30.07.2018]
 */
export interface IAddressFieldState extends IBaseTextFieldState,
                                            IPlaceWrapper<number | string> {
}
