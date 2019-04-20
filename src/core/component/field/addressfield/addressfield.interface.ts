import { IBaseTextFieldState } from '../textfield';
import {
  IPlaceWrapper,
  ILatWrapper,
  ILngWrapper,
  IOnChangePlaceWrapper,
  IPlaceIdWrapper,
  INotUsePlaceActionWrapper,
  IUseZipCodeWrapper,
  IPlaceEntityWrapper,
  INotUseCustomValidatorWrapper,
} from '../../../definitions.interface';
import { IBaseTextFieldProps } from '../textfield';
import { IPlaceEntity } from '../../../entities-definitions.interface';

/**
 * @stable [30.07.2018]
 */
export enum AddressMapMarkerActionEnum {
  PUT_MARKER_HERE,
}

/**
 * @stable [01.08.2018]
 */
export interface IAddressFieldChangePlacePayloadEntity
  extends ILatWrapper,
    ILngWrapper,
    IPlaceIdWrapper,
    IPlaceEntityWrapper<IPlaceEntity> {
}

/**
 * @stable [29.07.2018]
 */
export interface IAddressFieldProps extends IBaseTextFieldProps,
                                            IUseZipCodeWrapper,
                                            INotUseCustomValidatorWrapper,
                                            INotUsePlaceActionWrapper,
                                            IOnChangePlaceWrapper<IAddressFieldChangePlacePayloadEntity>,
                                            ILatWrapper,
                                            ILngWrapper {
}

/**
 * @stable [30.07.2018]
 */
export interface IAddressFieldState extends IBaseTextFieldState,
                                            IPlaceWrapper<number | string> {
}
