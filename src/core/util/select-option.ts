import * as R from 'ramda';

import {
  EntityIdT,
  StringNumberT,
} from '../definitions.interface';
import { TypeUtils } from './type';
import {
  IPresetsRawDataLabeledValueEntity,
  SelectValueT,
} from '../definition';
import { DiServices } from '../di/di.services';

/**
 * @stable [18.05.2020]
 * @param {SelectValueT} option
 * @returns {EntityIdT}
 */
const fromSelectValueToId = (option: SelectValueT): EntityIdT => {
  if (R.isNil(option)) {
    return option;
  }
  if (TypeUtils.isPrimitive(option)) {
    return option as StringNumberT;
  }
  const optionAsObject = option as IPresetsRawDataLabeledValueEntity;
  return optionAsObject.value;
};

/**
 * @stable [18.05.2020]
 * @param {SelectValueT} option
 * @returns {StringNumberT}
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
 * @stable [18.05.2020]
 */
export class SelectOptionUtils {
  public static readonly fromSelectValueToDisplayValue = fromSelectValueToDisplayValue;                   /* @stable [08.07.2020] */
  public static readonly fromSelectValueToId = fromSelectValueToId;                                       /* @stable [08.07.2020] */
}
