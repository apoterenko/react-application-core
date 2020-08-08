import {
  AnyT,
  EntityIdT,
  I$$cachedValueWrapper,
  IAllowEmptyFilterValueWrapper,
  IAnchoredWrapper,
  IDictionaryWrapper,
  IExpandActionRenderedWrapper,
  IForceReloadWrapper,
  IForciblyApplyLocalFilterWrapper,
  IInlineOptionClassNameClassName,
  IInlineOptionsWrapper,
  IMenuAnchorElementWrapper,
  IMenuRenderedWrapper,
  IOnDictionaryChangeWrapper,
  IOnDictionaryEmptyWrapper,
  IOnSelectWrapper,
  IOptionsWrapper,
  IProgressWrapper,
  IWaitingForOptionsWrapper,
  StringNumberT,
} from '../definitions.interface';
import {
  IMenuConfigurationEntity,
  IPresetsMenuItemEntity,
} from './menu-definition.interface';
import {
  IBaseTextFieldProps,
  IPresetsBaseTextFieldEntity,
  IReduxBaseTextFieldEntity,
} from './text-field-definition.interface';
import { IFieldState } from './field-definition.interface';
import { IFluxPayloadQueryEntity } from './query-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IFluxPayloadEntity,
  IPresetsRawDataLabeledValueEntity,
} from './entity-definition.interface';

/**
 * @presets-entity
 * @stable [19.05.2020]
 */
export interface IPresetsBaseSelectEntity
  extends IPresetsBaseTextFieldEntity,
    IAllowEmptyFilterValueWrapper,
    IAnchoredWrapper,
    IDictionaryWrapper,
    IExpandActionRenderedWrapper,
    IForceReloadWrapper,
    IForciblyApplyLocalFilterWrapper,
    IInlineOptionClassNameClassName,
    IInlineOptionsWrapper,
    IMenuAnchorElementWrapper<HTMLElement | (() => HTMLElement)>,
    IMenuConfigurationEntity,
    IOnDictionaryEmptyWrapper<string, IFluxPayloadEntity>,
    IOnDictionaryChangeWrapper<string, IFluxPayloadQueryEntity>,
    IOnSelectWrapper<IPresetsSelectOptionEntity> {
}

/**
 * @redux-entity
 * @stable [19.05.2020]
 */
export interface IReduxBaseSelectEntity
  extends IReduxBaseTextFieldEntity,
    IOptionsWrapper<IPresetsSelectOptionEntity[]>,
    IWaitingForOptionsWrapper {
}

/**
 * @generic-entity
 * @stable [19.05.2020]
 */
export interface IGenericBaseSelectEntity
  extends IReduxBaseSelectEntity,
    IPresetsBaseSelectEntity {
}

/**
 * @presets-entity
 * @stable [16.06.2020]
 */
export interface IPresetsSelectOptionEntity<TRawData = {}, TValue = EntityIdT>
  extends IPresetsMenuItemEntity<TRawData> {
}

/**
 * @stable [12.04.2020]
 */
export type SelectValueT = IPresetsRawDataLabeledValueEntity | StringNumberT;

/**
 * @generic-state
 * @stable [11.01.2020]
 */
export interface IGenericBaseSelectState
  extends IMenuRenderedWrapper,
    IProgressWrapper {
}

/**
 * @stable [06.10.2018]
 */
export interface IBaseSelectState
  extends IFieldState,
    IGenericBaseSelectState,
    I$$cachedValueWrapper<IPresetsSelectOptionEntity> {
}

// TODO
export interface IBaseSelectProps
  extends IGenericBaseSelectEntity,
    IBaseTextFieldProps {
  icon?: string; // TODO
}

// TODO
export interface ISelectState
  extends IBaseSelectState {
}

/**
 * @generic-entity
 * @stable [17.06.2020]
 */
export interface IGenericSelectEntity
  extends IGenericBaseSelectEntity {
}

/**
 * @props
 * @stable [17.06.2020]
 */
export interface ISelectProps
  extends IGenericComponentProps,
    IGenericSelectEntity {
}

/**
 * @default-entity
 * @stable [19.05.2020]
 */
export const DEFAULT_QUICK_SEARCH_FIELD_ENTITY = Object.freeze<IPresetsBaseSelectEntity>({
  allowEmptyFilterValue: false,                                                             /* @stable [17.05.2020] */
  anchored: true,                                                                           /* @stable [17.05.2020] */
  expandActionRendered: false,                                                              /* @stable [17.05.2020] */
  preventFocus: false,                                                                      /* @stable [17.05.2020] */
});

/**
 * @classes
 * @stable [16.06.2020]
 */
export enum SelectClassesEnum {
  BASE_SELECT = 'rac-base-select',
  BASE_SELECT_INLINE_OPTION = 'rac-base-select__inline-option',
  SELECT = 'rac-select',
}
