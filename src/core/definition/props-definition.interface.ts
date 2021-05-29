import {
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
export interface IUniversalComponentProps
  extends IUniversalComponentEntity {
}

/**
 * @deprecated
 */
export interface IComponentProps
  extends IUniversalComponentEntity {
}

/**
 * @react-native-compatible
 * @stable [27.09.2019]
 */
export interface IUniversalContainerProps<TDictionaries = {}, TPermissions = {}>
  extends IUniversalContainerEntity<TDictionaries, TPermissions> {
}

/**
 * TODO
 * @deprecated Use IGenericContainerProps
 */
export interface IContainerProps<TDictionaries = {}, TPermissions = {}>
  extends IContainerEntity<TDictionaries, TPermissions>,
    IWebContainerEntity {
}
