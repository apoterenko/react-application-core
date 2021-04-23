import * as R from 'ramda';

import {
  EntityIdT,
  IEntity,
  StringNumberT,
  UNDEF,
} from '../definitions.interface';
import { TypeUtils } from './type';
import {
  IPresetsRawDataLabeledValueEntity,
  SelectValueT,
} from '../definition';
import { DiServices } from '../di/di.services';

/**
 * 02.11.2020
 * @param value
 */
const fromSelectValueToId = (value: SelectValueT): EntityIdT => {
  if (R.isNil(value)) {
    return value;
  }
  if (TypeUtils.isPrimitive(value)) {
    return value as StringNumberT;
  }
  const optionAsObject = value as IPresetsRawDataLabeledValueEntity;
  return optionAsObject.value;
};

/**
 * 02.11.2020
 * @param option
 */
const fromSelectValueToRawValue = <TEntity = IEntity>(option: SelectValueT): TEntity => {
  if (R.isNil(option)) {
    return option;
  }
  if (TypeUtils.isPrimitive(option)) {
    return UNDEF;
  }
  const {
    rawData,
  } = option as IPresetsRawDataLabeledValueEntity;

  return rawData as TEntity;
};

/**
 * 02.11.2020
 * @param option
 */
const fromSelectValueToDisplayValue = (option: SelectValueT): StringNumberT => {
  if (R.isNil(option)) {
    return option;
  }
  if (TypeUtils.isPrimitive(option)) {
    return option as StringNumberT;
  }
  const {
    label,
  } = option as IPresetsRawDataLabeledValueEntity;

  return R.isNil(label)
    ? fromSelectValueToId(option)
    : DiServices.translator()(label, option);
};

/**
 * @stable [02.11.2020]
 */
export class SelectOptionUtils {
  public static readonly fromSelectValueToDisplayValue = fromSelectValueToDisplayValue;                   /* @stable [02.11.2020] */
  public static readonly fromSelectValueToId = fromSelectValueToId;                                       /* @stable [02.11.2020] */
  public static readonly fromSelectValueToRawValue = fromSelectValueToRawValue;                           /* @stable [02.11.2020] */
}
