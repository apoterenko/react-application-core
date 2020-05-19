import {
  IAllowEmptyFilterValueWrapper,
  IAnchoredWrapper,
  IDictionaryWrapper,
  IExpandActionRenderedWrapper,
  IForceReloadWrapper,
  IForciblyApplyLocalFilterWrapper,
  IMenuAnchorElementWrapper,
  IOnDictionaryFilterChangeWrapper,
  IOptionsWrapper,
  IWaitingForOptionsWrapper,
  StringNumberT,
} from '../definitions.interface';
import {
  IMenuConfigurationEntity,
  IMenuItemEntity,
} from './menu-definition.interface';
import {
  IPresetsBaseTextFieldEntity,
  IReduxBaseTextFieldEntity,
} from './field-definition.interface';
import { IFluxPayloadQueryEntity } from './query-definition.interface';

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
    IMenuAnchorElementWrapper<HTMLElement | (() => HTMLElement)>,
    IMenuConfigurationEntity,
    IOnDictionaryFilterChangeWrapper<string, IFluxPayloadQueryEntity> {
}

/**
 * @redux-entity
 * @stable [19.05.2020]
 */
export interface IReduxBaseSelectEntity
  extends IReduxBaseTextFieldEntity,
    IOptionsWrapper<ISelectOptionEntity[]>,
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
 * @entity
 * @stable [25.01.2020]
 */
export interface ISelectOptionEntity<TRawData = {}>
  extends IMenuItemEntity<TRawData> {
}

/**
 * @stable [12.04.2020]
 */
export type SelectValueT = ISelectOptionEntity | StringNumberT;
