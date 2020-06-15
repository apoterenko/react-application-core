import * as R from 'ramda';

import {
  IPresetsTabEntity,
  IReduxHolderActiveValueEntity,
  ITabPanelEntity,
} from '../definition';
import { Selectors } from './select';

/**
 * @stable [17.05.2020]
 * @param {IReduxHolderActiveValueEntity} holderActiveValueEntity
 * @param {IPresetsTabEntity} tabEntity
 * @returns {boolean}
 */
const isTabActive = (holderActiveValueEntity: IReduxHolderActiveValueEntity,
                     tabEntity: IPresetsTabEntity): boolean =>
  R.isNil(holderActiveValueEntity)
    ? false
    : (
      R.isNil(holderActiveValueEntity.activeValue)
        ? !!tabEntity.active
        : holderActiveValueEntity.activeValue === tabEntity.value
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
