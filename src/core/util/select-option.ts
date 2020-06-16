import * as R from 'ramda';

import {
  EntityIdT,
  StringNumberT,
} from '../definitions.interface';
import { TypeUtils } from './type';
import {
  IPresetsSelectOptionEntity,
  SelectValueT,
} from '../definition';
import { getTranslator } from '../di/di.services';

/**
 * @stable [18.05.2020]
 * @param {SelectValueT} option
 * @returns {EntityIdT}
 */
const fromSelectOptionEntityToId = (option: SelectValueT): EntityIdT => {
  if (R.isNil(option)) {
    return option;
  }
  if (TypeUtils.isPrimitive(option)) {
    return option as StringNumberT;
  }
  const optionAsObject = option as IPresetsSelectOptionEntity;
  return optionAsObject.value;
};

/**
 * @stable [18.05.2020]
 * @param {SelectValueT} option
 * @returns {StringNumberT}
 */
const fromSelectOptionEntityToDisplayValue = (option: SelectValueT): StringNumberT => {
  if (R.isNil(option)) {
    return option;
  }
  if (TypeUtils.isPrimitive(option)) {
    return option as StringNumberT;
  }
  const optionAsObject = option as IPresetsSelectOptionEntity;
  const {label} = optionAsObject;

  return R.isNil(label)
    ? fromSelectOptionEntityToId(option)
    : getTranslator()(label, option);
};

/**
 * @stable [18.05.2020]
 */
export class SelectOptionUtils {
  public static readonly fromSelectOptionEntityToDisplayValue = fromSelectOptionEntityToDisplayValue;     /* @stable [18.05.2020] */
  public static readonly fromSelectOptionEntityToId = fromSelectOptionEntityToId;                         /* @stable [18.05.2020] */
}
