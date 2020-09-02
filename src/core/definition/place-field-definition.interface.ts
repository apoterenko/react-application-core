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
  IPresetsBaseSelectEntity,
} from './select-definition.interface';
import { IGoogleMapsConfigurationEntity } from './google-maps-definition.interface';
import {
  DEFAULT_QUICK_SEARCH_FIELD_ENTITY,
  IPresetsSelectOptionEntity,
} from './select-definition.interface';
import { DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY } from './field-definition.interface';
import { DEFAULT_UNLIMITED_HEIGHT_MENU_ENTITY } from './menu-definition.interface';

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
 * @presets-entity
 * @stable [11.08.2020]
 */
export interface IPresetsPlaceFieldEntity
  extends IPresetsBaseSelectEntity,
    IPlaceActionRenderedWrapper,
    IUseZipCodeWrapper {
}

/**
 * @generic-entity
 * @stable [09.01.2020]
 */
export interface IGenericPlaceFieldEntity
  extends IPresetsPlaceFieldEntity,
    IDialogClassNameWrapper,
    IGoogleMapsConfigurationEntity {
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
  extends INamedEntity {
}

/**
 * @default-entity
 * @stable [11.08.2020]
 */
export const DEFAULT_PLACE_FIELD_ENTITY = Object.freeze<IPresetsPlaceFieldEntity>({
  ...DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY,
  ...DEFAULT_QUICK_SEARCH_FIELD_ENTITY,
  menuConfiguration: DEFAULT_UNLIMITED_HEIGHT_MENU_ENTITY,
});

/**
 * @default-entity
 * @stable [11.08.2020]
 */
export const DEFAULT_ZIP_CODE_FIELD_ENTITY = Object.freeze<IPlaceFieldProps>({
  ...DEFAULT_PLACE_FIELD_ENTITY,                                                       /* @stable [11.08.2020] */
  placeActionRendered: false,                                                          /* @stable [11.08.2020] */
  useZipCode: true,                                                                    /* @stable [11.08.2020] */
});