import * as R from 'ramda';

import { isDef } from '../../../util';
import { AnyT, UNDEF } from '../../../definitions.interface';

export const toActualChangedValue = (config: { value: AnyT, emptyValue: AnyT, originalValue: AnyT, error?: string }) => {
  const hasOriginalValue = isDef(config.originalValue);

  if ((hasOriginalValue && R.equals(config.value, config.originalValue))
    || (!hasOriginalValue && R.equals(config.value, config.emptyValue))) {
    return {
      value: UNDEF, // Clear dirty changes
      error: null,
    };
  }
  return {
    value: config.value,
    error: config.error,
  };
};
