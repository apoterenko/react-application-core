import { IKeyValue } from '../definitions.interface';

/**
 * @stable [12.09.2018]
 * @param {TResult} props
 * @returns {*}
 */
export const singleton = <TResult extends IKeyValue>(props: TResult): TResult  =>
  Object.assign(Object.create(null), props);
