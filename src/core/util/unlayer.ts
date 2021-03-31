import * as R from 'ramda';

import { ConditionUtils } from './cond';
import { IUnlayerEditorMergeTagsEntity } from '../definition';

/**
 * @stable [31.03.2021]
 * @param mergeTagEntity
 */
const getMergeTagsValues = (mergeTagEntity: IUnlayerEditorMergeTagsEntity): string[] => {
  let tags = [];
  ConditionUtils.ifNotEmptyThanValue(
    mergeTagEntity,
    () => {
      R.forEachObjIndexed((item) => {
        if (item.mergeTags) {
          tags = tags.concat(getMergeTagsValues(item.mergeTags));
        } else {
          tags.push(item.value);
        }
      }, mergeTagEntity);
    }
  );
  return tags;
};

/**
 * @utils
 * @stable [31.03.2021]
 */
export class UnlayerUtils {
  public static readonly getMergeTagsValues = getMergeTagsValues;
}
