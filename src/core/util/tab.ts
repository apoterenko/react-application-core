import * as R from 'ramda';

import {
  IPresetsTabEntity,
  IReduxActiveValueEntity,
  ITabPanelEntity,
} from '../definition';
import { Selectors } from './select';

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
 * @param {ITabPanelEntity} wrapper
 * @param {IPresetsTabEntity} tab
 * @returns {boolean}
 */
const isTabEntityActive = (wrapper: ITabPanelEntity,
                           tab: IPresetsTabEntity): boolean => isTabActive(Selectors.tabPanel(wrapper), tab);

/**
 * @stable [17.05.2020]
 */
export class TabUtils {
  public static isActive = isTabActive;                              /* @stable [17.05.2020] */
  public static isEntityActive = isTabEntityActive;                  /* @stable [17.05.2020] */
}
