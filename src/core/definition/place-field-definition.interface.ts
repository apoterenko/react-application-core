import {
  IDialogClassNameWrapper,
  IDialogOpenedWrapper,
  IPlaceActionRenderedWrapper,
  IProgressWrapper,
  IUseZipCodeWrapper,
} from '../definitions.interface';
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
import {
  IPlaceEntity,
  IPlaceEntityWrapperEntity,
} from './place-definition.interface';

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
export interface IPlaceSelectOptionEntity
  extends IPresetsSelectOptionEntity<IPlaceEntity> {
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
