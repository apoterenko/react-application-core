import * as R from 'ramda';

import { AnyT, IKeyValue } from '../definition.interface';

export function filterBy(source: IKeyValue,
                         predicate: (key: string, value: AnyT) => boolean): IKeyValue {
  return {
    ...R.pickBy((value, key) => {
      if (typeof value === 'object' && !R.isNil(value) && !Array.isArray(value)) {
        source[key] = filterBy(value, predicate);
      }
      return predicate(key, value);
    }, source),
  };
}
