import {
  AnyT,
  IPluginsWrapper,
} from '../definitions.interface';
import { IGenericComponentEntity } from './generic-component-definition.interface';
import { GenericPluginCtorT } from './plugin-definition.interface';

/**
 * @generic-entity
 * @stable [10.04.2020]
 */
export interface IEnhancedGenericComponentEntity<TComponent = AnyT>
  extends IGenericComponentEntity<TComponent>,
    IPluginsWrapper<GenericPluginCtorT | GenericPluginCtorT[]> {
}

/**
 * @props
 * @stable [30.03.2020]
 */
export interface IEnhancedGenericComponentProps
  extends IEnhancedGenericComponentEntity {
}
