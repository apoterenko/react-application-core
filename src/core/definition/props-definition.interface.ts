import {
  IUniversalComponentEntity,
  IUniversalStickyComponentEntity,
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
 * @react-native-compatible
 * @stable [27.09.2019]
 */
export interface IUniversalStickyComponentProps
  extends IUniversalStickyComponentEntity {
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
export interface IUniversalContainerProps
  extends IUniversalContainerEntity {
}

/**
 * @stable [27.09.2019]
 */
export interface IContainerProps<TDictionaries = {}, TPermissions = {}>
  extends IContainerEntity<TDictionaries, TPermissions>,
    IWebContainerEntity {
}
