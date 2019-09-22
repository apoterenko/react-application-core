import {
  IUniversalComponentEntity,
  IWebComponentEntity,
} from './component-definition.interface';

/**
 * @stable [22.09.2019]
 */
export interface IComponentProps
  extends IUniversalComponentEntity,
    IWebComponentEntity {
}
