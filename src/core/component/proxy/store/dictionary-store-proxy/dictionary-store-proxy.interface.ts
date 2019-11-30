import { IKeyValue } from '../../../../definitions.interface';
import { IDispatcher } from '../../../../definition';

/**
 * @stable [09.10.2019]
 */
export interface IDictionaryStoreProxy
  extends IDispatcher {
  dispatchLoadDictionary<TData = IKeyValue>(dictionary: string, data?: TData);
}
