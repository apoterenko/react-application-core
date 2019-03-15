import {
  IActiveValueWrapper,
  ITabPanelWrapper,
} from '../definitions.interface';

/**
 * @stable [15.03.2019]
 */
export interface ITabPanelEntity
  extends IActiveValueWrapper {
}

/**
 * @stable [15.03.2019]
 */
export interface ITabPanelWrapperEntity
  extends ITabPanelWrapper<ITabPanelEntity> {
}
