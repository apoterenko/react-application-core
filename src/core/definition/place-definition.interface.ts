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
  IProgressWrapper,
  IQueryWrapper,
  IRegionWrapper,
  IStreetNumberWrapper,
  IStreetWrapper,
  IUseZipCodeWrapper,
  IZipCodeWrapper,
} from '../definitions.interface';
import { INamedEntity } from './entity-definition.interface';
import {
  IBaseSelectProps,
  IBaseSelectState,
} from './select-definition.interface';
import { IGoogleMapsConfigurationEntity } from './google-maps-definition.interface';
import {
  DEFAULT_QUICK_SEARCH_FIELD_ENTITY,
  IPresetsSelectOptionEntity,
} from './select-definition.interface';

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
 * @stable [17.05.2020]
 */
export type PlaceEntityValueT = IPlaceEntity | string;

/**
 * @entity
 * @stable [09.01.2020]
 */
export interface IPlaceSelectOptionEntity
  extends IPresetsSelectOptionEntity<IPlaceEntity> {
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
    IGoogleMapsConfigurationEntity,
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
 * @stable [19.05.2020]
 */
export const DEFAULT_PLACE_FIELD_ENTITY = Object.freeze<IPlaceFieldProps>({
  ...DEFAULT_QUICK_SEARCH_FIELD_ENTITY,                                                /* @stable [19.05.2020] */
  menuConfiguration: {heightRestricted: false},                                        /* @stable [19.05.2020] */
});

/**
 * @default-entity
 * @stable [15.01.2020]
 */
export const DEFAULT_ZIP_CODE_FIELD_ENTITY = Object.freeze<IPlaceFieldProps>({
  ...DEFAULT_QUICK_SEARCH_FIELD_ENTITY,                                                /* @stable [17.05.2020] */
  menuConfiguration: {useFilter: false, heightRestricted: false},                      /* @stable [17.05.2020] */
  placeActionRendered: false,                                                          /* @stable [17.05.2020] */
  useZipCode: true,                                                                    /* @stable [17.05.2020] */
});
