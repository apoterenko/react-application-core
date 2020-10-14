import {
  AnyT,
  IPluginsWrapper,
} from '../definitions.interface';
import { IGenericComponentEntity } from './generic-component-definition.interface';
import { GenericPluginCtorT } from './plugin-definition.interface';

/**
 * @presets-entity
 * @stable [14.10.2020]
 */
export interface IEnhancedPresetsComponentEntity
  extends IPluginsWrapper<GenericPluginCtorT | GenericPluginCtorT[]> {
}

/**
 * @generic-entity
 * @stable [10.04.2020]
 */
export interface IEnhancedGenericComponentEntity<TComponent = AnyT>
  extends IGenericComponentEntity<TComponent>,
    IEnhancedPresetsComponentEntity {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IEnhancedGenericComponentProps
  extends IEnhancedGenericComponentEntity {
}
