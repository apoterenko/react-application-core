import {
  IUniversalComponentEntity,
  IWebComponentEntity,
} from './component-definition.interface';
import {
  IUniversalContainerEntity,
  IWebContainerEntity,
} from './container-definition.interface';

/**
 * @stable [22.09.2019]
 */
export interface IComponentProps
  extends IUniversalComponentEntity,
    IWebComponentEntity {
}

/**
 * @stable [27.09.2019]
 */
export interface IContainerProps
  extends IUniversalContainerEntity,
    IWebContainerEntity {
}
