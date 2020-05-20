import {
  IRefreshOnUpdateWrapper,
  ISelectedElementClassNameWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IPresetsStickyEntity } from './sticky-definition.interface';

/**
 * @presets-entity
 * @stable [20.05.2020]
 */
export interface IPresetsSelectedElementEntity
  extends ISelectedElementClassNameWrapper,
    IRefreshOnUpdateWrapper {
}

/**
 * @generic-entity
 * @stable [20.05.2020]
 */
export interface IGenericSelectedElementEntity
  extends IPresetsSelectedElementEntity,
    IPresetsStickyEntity {
}

/**
 * @props
 * @stable [20.05.2020]
 */
export interface ISelectedElementComponentProps
  extends IGenericComponentProps,
    IGenericSelectedElementEntity {
}
