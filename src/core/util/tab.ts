import {
  IPresetsTabEntity,
  IReduxActiveValueHolderEntity,
  IReduxTabPanelHolderEntity,
} from '../definition';
import { Selectors } from './select';
import { ConditionUtils } from './cond';

/**
 * @stable [29.07.2020]
 * @param activeValueHolderEntity
 * @param tabEntity
 */
const isTabActive = (activeValueHolderEntity: IReduxActiveValueHolderEntity,
                     tabEntity: IPresetsTabEntity): boolean =>
  ConditionUtils.ifNotNilThanValue(
    activeValueHolderEntity,
    () => (
      ConditionUtils.ifNotNilThanValue(
        activeValueHolderEntity.activeValue,
        (activeValue) => activeValue === tabEntity.value,
        !!tabEntity.active
      )
    ),
    false
  );

/**
 * @stable [29.07.2020]
 * @param tabPanelHolderEntity
 * @param tabEntity
 */
const isTabHolderActive = (tabPanelHolderEntity: IReduxTabPanelHolderEntity,
                           tabEntity: IPresetsTabEntity): boolean =>
  isTabActive(Selectors.tabPanel(tabPanelHolderEntity), tabEntity);

/**
 * @stable [17.05.2020]
 */
export class TabUtils {
  public static isActive = isTabActive;                              /* @stable [17.05.2020] */
  public static isHolderActive = isTabHolderActive;                  /* @stable [17.05.2020] */
}
