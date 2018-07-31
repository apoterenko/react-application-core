import { IBasicTextFieldState } from '../textfield';
import {
  IPlaceWrapper,
  ILatWrapper,
  ILngWrapper,
  IOnChangePlaceWrapper,
  IPlaceIdWrapper,
  INotUsePlaceActionWrapper,
  IUseZipCodeWrapper,
  IZipCodeWrapper,
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
                                                         IPlaceIdWrapper,
                                                         IZipCodeWrapper {
}

/**
 * @stable [29.07.2018]
 */
export interface IAddressFieldProps extends IBasicTextFieldProps,
                                            IUseZipCodeWrapper,
                                            INotUsePlaceActionWrapper,
                                            IOnChangePlaceWrapper<IAddressFieldChangePlacePayload>,
                                            ILatWrapper,
                                            ILngWrapper {
}

/**
 * @stable [30.07.2018]
 */
export interface IAddressFieldState extends IBasicTextFieldState,
                                            IPlaceWrapper<number | string> {
}
