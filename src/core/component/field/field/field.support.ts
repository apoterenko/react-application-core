import * as R from 'ramda';

import { isDef } from '../../../util';
import {
  FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE,
  IFieldActualChangedValueConfigEntity,
} from './field.interface';
import { IValueWrapper, AnyT } from '../../../definitions.interface';

/**
 * @stable [31.07.2018]
 * @param {IFieldActualChangedValueConfigEntity} config
 * @returns {AnyT}
 */
export const toActualChangedValue = (config: IFieldActualChangedValueConfigEntity): AnyT => {
  const hasOriginalValue = isDef(config.originalValue);

  if ((hasOriginalValue && R.equals(config.value, config.originalValue))
    || (!hasOriginalValue && R.equals(config.value, config.emptyValue))) {
    return FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE;
  }
  return config.value;
};
