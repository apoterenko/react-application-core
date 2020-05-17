import * as R from 'ramda';

import {
  IPresetsTabEntity,
  IReduxActiveValueEntity,
} from '../definition';

/**
 * @stable [17.05.2020]
 * @param {IReduxActiveValueEntity} entity
 * @param {IPresetsTabEntity} tab
 * @returns {boolean}
 */
const isTabActive = (entity: IReduxActiveValueEntity,
                     tab: IPresetsTabEntity): boolean =>
  R.isNil(entity)
    ? false
    : (
      R.isNil(entity.activeValue)
        ? !!tab.active
        : entity.activeValue === tab.value
    );

/**
 * @stable [17.05.2020]
 */
export class TabUtils {
  public static isActive = isTabActive;                              /* @stable [17.05.2020] */
}
