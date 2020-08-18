import * as R from 'ramda';

import { EntityUtils } from './entity';
import { IPresetsRowEntity } from '../definition';
import { NumberUtils } from './number';
import { TypeUtils } from './type';

/**
 * @stable [17.08.2020]
 * @param row
 */
const isOddHighlighted = (row: IPresetsRowEntity): boolean =>
  row.highlightOdd !== false && (
    TypeUtils.isNumber(row.index)
      ? NumberUtils.isOddNumber(row.index)
      : false
  );

/**
 * @stable [18.08.2020]
 * @param row
 */
const isHovered = (row: IPresetsRowEntity): boolean =>
  row.hovered && !row.disabled;

/**
 * @stable [18.08.2020]
 * @param row
 */
const isSelectable = (row: IPresetsRowEntity): boolean =>
  row.selectable
  && !row.disabled
  && TypeUtils.isFn(row.onClick)
  && !EntityUtils.isPhantomEntity(row.entity);

/**
 * @stable [18.08.2020]
 * @param row
 */
const isIndexed = (row: IPresetsRowEntity): boolean =>
  row.indexed && !R.isNil(row.entity);

/**
 * @stable [17.08.2020]
 */
export class RowUtils {
  public static readonly isHovered = isHovered;
  public static readonly isIndexed = isIndexed;
  public static readonly isOddHighlighted = isOddHighlighted;
  public static readonly isSelectable = isSelectable;
}
