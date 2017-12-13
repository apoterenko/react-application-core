import * as R from 'ramda';

import { IKeyValue } from '../definition.interface';

export const mergeDeepLeftAndGetChanges = (target: IKeyValue, source: IKeyValue): IKeyValue => {
  const mergedEntity = R.mergeDeepLeft(target, source);
  if (!R.equals(mergedEntity, target)) {
    return R.pickBy((value, key) => Reflect.has(source, key), mergedEntity);
  }
  return null;
};
