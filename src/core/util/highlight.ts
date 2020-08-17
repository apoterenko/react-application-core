import * as R from 'ramda';

import { IPresetsHighlightedEntity } from '../definition';
import { NumberUtils } from './number';
import { TypeUtils } from './type';

/**
 * @stable [17.08.2020]
 * @param entity
 */
const isOddHighlighted = (entity: IPresetsHighlightedEntity): boolean =>
  R.isNil(entity)
    ? false
    : (
      entity.highlightOdd !== false && (
        TypeUtils.isNumber(entity.index) ? NumberUtils.isOddNumber(entity.index) : false
      )
    );

/**
 * @stable [17.08.2020]
 */
export class HighlightUtils {
  public static readonly isOddHighlighted = isOddHighlighted;
}
