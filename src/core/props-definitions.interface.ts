import {
  IUniversalFieldConfiguration,
  ITabPanelConfiguration,
} from './configurations-definitions.interface';
import { AnyT } from './definitions.interface';
import { ITabPanelEntity } from './definition';

/**
 * @stable [18.06.2018]
 */
export interface IUniversalFieldProps<TKeyboardEvent = AnyT,
                                      TFocusEvent = AnyT,
                                      TBasicEvent = AnyT>
  extends IUniversalFieldConfiguration<TKeyboardEvent, TFocusEvent, TBasicEvent> {
}

/**
 * @stable [30.08.2018]
 */
export interface ITabPanelProps extends ITabPanelConfiguration,
                                        ITabPanelEntity {
}
