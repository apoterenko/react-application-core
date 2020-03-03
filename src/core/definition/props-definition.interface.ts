import {
  IGenericComponentEntity,
  IUniversalComponentEntity,
  IWebComponentEntity,
} from './component-definition.interface';
import {
  IContainerEntity,
  IUniversalContainerEntity,
  IWebContainerEntity,
} from './container-definition.interface';

/**
 * @react-native-compatible
 * @stable [27.09.2019]
 */
export interface IGenericComponentProps
  extends IGenericComponentEntity {
}

/**
 * @react-native-compatible
 * @stable [27.09.2019]
 */
export interface IUniversalComponentProps
  extends IUniversalComponentEntity {
}

/**
 * @stable [22.09.2019]
 */
export interface IComponentProps
  extends IUniversalComponentEntity,
    IWebComponentEntity {
}

/**
 * @react-native-compatible
 * @stable [27.09.2019]
 */
export interface IUniversalContainerProps<TDictionaries = {}, TPermissions = {}>
  extends IUniversalContainerEntity<TDictionaries, TPermissions> {
}

/**
 * @stable [27.09.2019]
 */
export interface IContainerProps<TDictionaries = {}, TPermissions = {}>
  extends IContainerEntity<TDictionaries, TPermissions>,
    IWebContainerEntity {
}
