import { IBasicTextFieldState } from '../textfield';
import {
  IPlaceWrapper,
  ILatWrapper,
  ILngWrapper,
  IOnChangePlaceWrapper,
  IPlaceIdWrapper,
} from '../../../definitions.interface';
import { IBasicTextFieldProps } from '../textfield';

/**
 * @stable [30.07.2018]
 */
export enum AddressMapMarkerActionEnum {
  PUT_MARKER_HERE,
}

/**
 * @stable [29.07.2018]
 */
export interface IAddressFieldChangePlacePayload extends ILatWrapper,
                                                         ILngWrapper,
                                                         IPlaceIdWrapper {
}

/**
 * @stable [29.07.2018]
 */
export interface IAddressFieldProps extends IBasicTextFieldProps,
                                            IOnChangePlaceWrapper<IAddressFieldChangePlacePayload>,
                                            ILatWrapper,
                                            ILngWrapper {
}

/**
 * @stable [30.07.2018]
 */
export interface IAddressFieldState extends IBasicTextFieldState,
                                            IPlaceWrapper {
}
