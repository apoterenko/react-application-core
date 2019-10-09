import { AnyAction } from 'redux';

import { IKeyValue } from '../definitions.interface';

/**
 * @stable [11.09.2019]
 */
export interface IDispatcher {
  dispatch<TChanges = IKeyValue>(type: string, data?: TChanges): void;
  dispatchAnyAction(action: AnyAction): void;
  dispatchCustomType<TData = IKeyValue>(type: string, data?: TData): void;
}
