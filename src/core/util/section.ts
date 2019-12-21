import { IEffectsAction } from 'redux-effects-promise';

import {
  ACTION_PREFIX,
  IKeyValue,
  ISectionWrapper,
} from '../definitions.interface';
import {
  ifNotEmptyThanValue,
  ifNotNilThanValue,
} from './cond';
import { ISectionDataEntity } from '../definition';
import { nvl } from './nvl';
import { toType } from './type';

/**
 * @stable [04.12.2019]
 * @param {string} section
 * @param {IKeyValue | IKeyValue[]} data
 * @returns {TResult}
 */
export const applySection =
  <TResult extends ISectionDataEntity = ISectionDataEntity>(section: string, data?: IKeyValue | IKeyValue[]): TResult =>
    ({
      section,
      ...(
        ifNotEmptyThanValue(
          data,
          () => (
            Array.isArray(data)
              ? toType<ISectionDataEntity>({data})
              : data
          )
        )
      ),
    }) as TResult;

/**
 * @stable [31.08.2018]
 * @param {string} section
 * @returns {string}
 */
export const toActionPrefix = (section: string): string => `${ACTION_PREFIX}${section}`;

/**
 * @stable [05.12.2019]
 * @param {IEffectsAction} action
 * @returns {string}
 */
export const toSection = (action: IEffectsAction): string =>
  nvl(
    ifNotNilThanValue(
      action.data,
      (data: ISectionWrapper) => data.section
    ),
    ifNotNilThanValue(
      action.initialData,
      (initialData: ISectionWrapper) => initialData.section
    )
  );
