import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IOnClickWrapper,
  IToWrapper,
} from '../definitions.interface';

/**
 * @presets-entity
 * @stable [24.05.2020]
 */
export interface IPresetsLinkEntity
  extends IOnClickWrapper,
    IToWrapper {
}

/**
 * @generic-entity
 * @stable [24.05.2020]
 */
export interface IGenericLinkEntity
  extends IPresetsLinkEntity {
}

/**
 * @stable [24.05.2020]
 */
export interface ILinkProps
  extends IGenericComponentProps,
    IGenericLinkEntity {
}
