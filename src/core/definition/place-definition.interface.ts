import {
  IAreaWrapper,
  ICityWrapper,
  ICountryWrapper,
  IDialogClassNameWrapper,
  IDialogOpenedWrapper,
  IFormattedNameWrapper,
  ILatWrapper,
  ILngWrapper,
  IPayloadWrapper,
  IPlaceActionRenderedWrapper,
  IPlaceEntityWrapper,
  IPlaceIdWrapper,
  IProgressWrapper,
  IQueryWrapper,
  IRegionWrapper,
  IStreetNumberWrapper,
  IStreetWrapper,
  IUseZipCodeWrapper,
  IZipCodeWrapper,
} from '../definitions.interface';
import { INamedEntity } from './entity-definition.interface';
import { IBaseSelectProps, IBaseSelectState } from '../component/field/select/base-select.interface'; // TODO
import {
  DEFAULT_QUICK_SEARCH_FIELD_ENTITY,
} from './field-definition.interface';

/**
 * @stable [09.01.2020]
 */
export enum PlaceMarkerActionsEnum {
  PUT_MARKER,
}

/**
 * @entity
 * @stable [09.01.2020]
 */
export interface ILatLngEntity
  extends ILatWrapper,
    ILngWrapper {
}

/**
 * @entity
 * @stable [09.01.2020]
 */
export interface IPlaceEntity<TCity = string>
  extends IAreaWrapper,
    ICityWrapper<TCity>,
    ICountryWrapper,
    IFormattedNameWrapper,
    ILatLngEntity,
    IPlaceIdWrapper,
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
 * @generic-entity
 * @stable [09.01.2020]
 */
export interface IGenericPlaceFieldEntity
  extends IDialogClassNameWrapper,
    IPlaceActionRenderedWrapper,
    IUseZipCodeWrapper {
}

/**
 * @props
 * @stable [09.01.2020]
 */
export interface IPlaceFieldProps
  extends IBaseSelectProps,
    IGenericPlaceFieldEntity {
}

/**
 * @generic-state
 * @stable [15.01.2020]
 */
export interface IGenericPlaceFieldState
  extends IDialogOpenedWrapper,
    IPlaceEntityWrapperEntity,
    IProgressWrapper {
}

/**
 * @state
 * @stable [09.01.2020]
 */
export interface IPlaceFieldState
  extends IBaseSelectState,
    IGenericPlaceFieldState {
}

/**
 * @entity
 * @stable [09.01.2020]
 */
export interface ISearchPlacesEntity
  extends ICountryWrapper,
    IQueryWrapper {
}

/**
 * @payload-entity
 * @stable [09.01.2020]
 */
export interface ISearchPlacesPayloadEntity
  extends IPayloadWrapper<ISearchPlacesEntity> {
}

/**
 * @stable [09.01.2020]
 */
export interface IPlaceGeoCodeRequestEntity
  extends ICountryWrapper,
    ILatLngEntity,
    IPlaceIdWrapper {
}

/**
 * @stable [10.01.2020]
 */
export interface ISearchPlaceEntity
  extends INamedEntity,
    IPlaceIdWrapper {
}

/**
 * @default-entity
 * @stable [29.01.2020]
 */
export const DEFAULT_PLACE_FIELD_ENTITY = Object.freeze<IPlaceFieldProps>({
  ...DEFAULT_QUICK_SEARCH_FIELD_ENTITY,
});

/**
 * @default-entity
 * @stable [15.01.2020]
 */
export const DEFAULT_ZIP_CODE_FIELD_ENTITY = Object.freeze<IPlaceFieldProps>({
  ...DEFAULT_PLACE_FIELD_ENTITY,
  menuConfiguration: {useFilter: false, heightRestricted: false},
  placeActionRendered: false,
  useZipCode: true,
});
