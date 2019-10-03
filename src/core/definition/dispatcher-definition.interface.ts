import { IKeyValue } from '../definitions.interface';

/**
 * @stable [11.09.2019]
 */
export interface IDispatcher {
  dispatch<TChanges = IKeyValue>(type: string, data?: TChanges): void;
  dispatchCustomType<TData = IKeyValue>(type: string, data?: TData): void;
}

/**
 * @stable [11.09.2019]
 */
export interface IFormDispatcher extends IDispatcher {
  dispatchFormReset(otherSection?: string): void;
}
