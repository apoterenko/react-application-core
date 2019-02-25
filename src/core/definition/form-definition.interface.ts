import {
  IFormConfigurationWrapper,
  IActionsRenderedWrapper,
  IActionTextWrapper,
  IResetTextWrapper,
} from '../definitions.interface';
import { IFormConfigurationEntity } from '../configurations-definitions.interface';

/**
 * @cross-platform
 * @stable [25.02.2019]
 */
export interface IGenericFormEntity
  extends IActionsRenderedWrapper,
    IActionTextWrapper,
    IResetTextWrapper {
}

/**
 * @stable [02.02.2019]
 */
export interface IFormConfigurationWrapperEntity
  extends IFormConfigurationWrapper<IFormConfigurationEntity> {
}
