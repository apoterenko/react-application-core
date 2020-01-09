import {
  IAreaWrapper,
  ICityWrapper,
  ICountryWrapper,
  IDialogClassNameWrapper,
  IDialogOpenedWrapper,
  IFormattedNameWrapper,
  ILatWrapper,
  ILngWrapper,
  IPlaceActionRenderedWrapper,
  IPlaceEntityWrapper,
  IPlaceIdWrapper,
  IQueryWrapper,
  IRegionWrapper,
  IStreetNumberWrapper,
  IStreetWrapper,
  IZipCodeWrapper,
} from '../definitions.interface';
import { IBaseSelectProps, IBaseSelectState } from '../component/field/select/base-select.interface'; // TODO

/**
 * @stable [09.01.2020]
 */
export enum PlaceMarkerActionsEnum {
  PUT_MARKER,
}

/**
 * @stable [09.01.2020]
 */
export interface ILatLngEntity
  extends ILatWrapper,
    ILngWrapper {
}

/**
 * @stable [09.01.2020]
 */
export interface IPlaceEntity<TCity = string>
  extends IAreaWrapper,
    ICityWrapper<TCity>,
    ICountryWrapper,
    IFormattedNameWrapper,
    ILatLngEntity,
    IRegionWrapper,
    IStreetNumberWrapper,
    IStreetWrapper,
    IZipCodeWrapper {
}

/**
 * @stable [09.01.2020]
 */
export interface IPlaceEntityWrapperEntity<TCity = string>
  extends IPlaceEntityWrapper<IPlaceEntity<TCity>> {
}

/**
 * TODO
 * @deprecated
 */
export interface IChangePlacePayloadEntity
  extends ILatLngEntity,
    IPlaceEntityWrapperEntity,
    IPlaceIdWrapper {
}

/**
 * @stable [09.01.2020]
 */
export interface IGenericPlaceFieldEntity
  extends IDialogClassNameWrapper,
    IPlaceActionRenderedWrapper {
}

/**
 * @stable [09.01.2020]
 */
export interface IPlaceFieldProps
  extends IBaseSelectProps,
    IGenericPlaceFieldEntity {
}

/**
 * @stable [09.01.2020]
 */
export interface IPlaceFieldState
  extends IBaseSelectState,
    IDialogOpenedWrapper,
    IPlaceEntityWrapperEntity {
}

/**
 * @stable [09.01.2020]
 */
export interface ISearchPlacesRequestEntity
  extends IQueryWrapper {
}

/**
 * @stable [09.01.2020]
 */
export interface IPlaceGeoCodeRequestEntity
  extends ILatLngEntity {
}
