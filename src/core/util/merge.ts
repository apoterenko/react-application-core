import * as R from 'ramda';

import { IEntity, IKeyValue } from '../definition.interface';

export const mergeDeepLeftAndGetChanges = <TChanges extends IKeyValue>(
    target: TChanges, source: TChanges
): TChanges => {
  const mergedEntity = R.mergeDeepLeft<TChanges, TChanges>(target, source);
  if (!R.equals<TChanges>(mergedEntity, target)) {
    return R.pickBy<TChanges, TChanges>((value, key) => Reflect.has(source, key), mergedEntity);
  }
  return null;
};

export const mergeDeepLeftAndGetEntity = <TEntity extends IEntity>(
    target: TEntity, source: TEntity
): TEntity => mergeDeepLeftAndGetChanges<TEntity>(target, source);
