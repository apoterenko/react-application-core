import * as R from 'ramda';

import { isDef, calc } from '../../../util';
import {
  FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE,
  IFieldActualChangedValueConfigEntity,
} from './field.interface';
import { AnyT } from '../../../definitions.interface';
import { IUniversalFieldProps } from '../../../props-definitions.interface';

/**
 * @stable [31.07.2018]
 * @param {IFieldActualChangedValueConfigEntity} config
 * @returns {AnyT}
 */
export const toActualChangedValue = (config: IFieldActualChangedValueConfigEntity): AnyT => {
  const hasOriginalValue = isDef(config.originalValue);

  if (
    ((hasOriginalValue && R.equals(config.value, config.originalValue))
      || (!hasOriginalValue && R.equals(config.value, config.emptyValue)))
    && config.canReturnClearDirtyChangesValue !== false
  ) {
    return FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE;
  }
  return config.value;
};

/**
 * @stable [05.10.2018]
 * @param {IUniversalFieldProps} props
 * @returns {boolean}
 */
export const isFieldRequired = (props: IUniversalFieldProps): boolean => calc<boolean>(props.required);

/**
 * @stable [06.10.2018]
 * @param {IUniversalFieldProps} props
 * @returns {boolean}
 */
export const isFieldInactive = (props: IUniversalFieldProps): boolean => props.disabled || props.readOnly;

/**
 * @stable [06.10.2018]
 * @param {IUniversalFieldProps} props
 * @returns {boolean}
 */
export const isFieldInProgress = (props: IUniversalFieldProps): boolean => props.progress;

/**
 * @stable [06.10.2018]
 * @param {IUniversalFieldProps} props
 * @returns {boolean}
 */
export const isFieldChangeable = (props: IUniversalFieldProps): boolean => R.isNil(props.changeable) || props.changeable === true;
