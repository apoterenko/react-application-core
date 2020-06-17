import {
  EntityIdT,
  IAllowEmptyFilterValueWrapper,
  IAnchoredWrapper,
  IDictionaryWrapper,
  IExpandActionRenderedWrapper,
  IForceReloadWrapper,
  IForciblyApplyLocalFilterWrapper,
  IInlineOptionClassNameClassName,
  IInlineOptionsWrapper,
  IMenuAnchorElementWrapper,
  IOnDictionaryFilterChangeWrapper,
  IOnSelectWrapper,
  IOptionsWrapper,
  IWaitingForOptionsWrapper,
  StringNumberT,
} from '../definitions.interface';
import {
  IMenuConfigurationEntity,
  IPresetsMenuItemEntity,
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
    IInlineOptionClassNameClassName,
    IInlineOptionsWrapper,
    IMenuAnchorElementWrapper<HTMLElement | (() => HTMLElement)>,
    IMenuConfigurationEntity,
    IOnDictionaryFilterChangeWrapper<string, IFluxPayloadQueryEntity>,
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
export type SelectValueT = IPresetsSelectOptionEntity | StringNumberT;

/**
 * @classes
 * @stable [16.06.2020]
 */
export enum SelectClassesEnum {
  BASE_SELECT = 'rac-base-select',
  BASE_SELECT_INLINE_OPTION = 'rac-base-select__inline-option',
}
