import {
  I$$formStoreProxyWrapper,
  IKeyValue,
} from '../../../../definitions.interface';
import { IDispatcher } from '../../../../definition';

/**
 * @stable [09.10.2019]
 */
export interface IFormStoreProxy
  extends IDispatcher {
  dispatchFormReset(otherSection?: string): void;
  dispatchFormChanges?<TChanges extends IKeyValue = IKeyValue>(changes: TChanges, otherSection?: string): void;
}

/**
 * @stable [11.09.2019]
 */
export interface IFormStoreProxyWrapperEntity
  extends I$$formStoreProxyWrapper<IFormStoreProxy> {
}
