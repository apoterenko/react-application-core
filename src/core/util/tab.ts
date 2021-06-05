import {
  IPresetsTabEntity,
  IReduxActiveValueHolderEntity,
  IReduxTabPanelHolderEntity,
} from '../definition';
import { Selectors } from './select';
import { ConditionUtils } from './cond';

/**
 * @stable [05.06.2021]
 * @param holderEntity
 * @param tabEntity
 */
const isTabActive = (holderEntity: IReduxActiveValueHolderEntity,
                     tabEntity: IPresetsTabEntity): boolean =>
  ConditionUtils.ifNotNilThanValue(
    holderEntity?.activeValue,
    (activeValue) => activeValue === tabEntity?.value,
    !!tabEntity?.active
  );

/**
 * @stable [30.03.2021]
 * @param tabPanelHolderEntity
 * @param tabEntity
 */
const isTabHolderActive = (tabPanelHolderEntity: IReduxTabPanelHolderEntity,
                           tabEntity: IPresetsTabEntity): boolean =>
  isTabActive(Selectors.tabPanel(tabPanelHolderEntity), tabEntity);

/**
 * @utils
 * @stable [30.03.2021]
 */
export class TabUtils {
  public static isActive = isTabActive;                              /* @stable [30.03.2021] */
  public static isHolderActive = isTabHolderActive;                  /* @stable [30.03.2021] */
}
