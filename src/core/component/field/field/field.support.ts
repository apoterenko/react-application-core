import * as R from 'ramda';

import { isDef } from '../../../util';
import {
  FIELD_EMPTY_ERROR_VALUE,
  FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE,
  IFieldActualChangedValueConfigEntity,
  IFieldActualChangedValueResultEntity,
} from './field.interface';

/**
 * @stable [17.06.2018]
 * @param {IFieldActualChangedValueConfigEntity} config
 * @returns {IFieldActualChangedValueResultEntity}
 */
export const toActualChangedValue =
  (config: IFieldActualChangedValueConfigEntity): IFieldActualChangedValueResultEntity => {
  const hasOriginalValue = isDef(config.originalValue);

  if ((hasOriginalValue && R.equals(config.value, config.originalValue))
    || (!hasOriginalValue && R.equals(config.value, config.emptyValue))) {
    return {
      value: FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE,
      error: FIELD_EMPTY_ERROR_VALUE,
    };
  }
  return {
    value: config.value,
    error: config.error,
  };
};
