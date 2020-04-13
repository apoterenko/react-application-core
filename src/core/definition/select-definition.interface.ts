import {
  IAllowEmptyFilterValueWrapper,
  IAnchoredWrapper,
  IDelayTimeoutWrapper,
  IDictionaryWrapper,
  IExpandActionRenderedWrapper,
  IForceReloadWrapper,
  IForceUseLocalFilterWrapper,
  IMenuAnchorElementWrapper,
  IOptionsWrapper,
  IWaitingForOptionsWrapper,
  StringNumberT,
} from '../definitions.interface';
import {
  IMenuConfigurationEntity,
  IMenuItemEntity,
} from './menu-definition.interface';

/**
 * @generic-entity
 * @stable [24.01.2020]
 */
export interface IGenericBaseSelectEntity
  extends IAllowEmptyFilterValueWrapper,
    IAnchoredWrapper,
    IDelayTimeoutWrapper,
    IDictionaryWrapper,
    IExpandActionRenderedWrapper,
    IForceReloadWrapper,
    IForceUseLocalFilterWrapper,
    IMenuAnchorElementWrapper<HTMLElement | (() => HTMLElement)>,
    IMenuConfigurationEntity,
    IOptionsWrapper<ISelectOptionEntity[]>,
    IWaitingForOptionsWrapper {
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
