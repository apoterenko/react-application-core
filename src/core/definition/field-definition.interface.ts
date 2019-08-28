import {
  IDisabledWrapper,
  INameWrapper,
  IPlaceholderWrapper,
  IProgressWrapper,
  IReadOnlyWrapper,
  IVisibleWrapper,
} from '../definitions.interface';

/**
 * @stable [28.05.2019]
 */
export const FIELD_DISPLAY_EMPTY_VALUE = '';

/**
 * @stable [27.05.2019]
 */
export interface IGenericFieldEntity
  extends IDisabledWrapper,
    INameWrapper,
    IPlaceholderWrapper,
    IProgressWrapper,
    IReadOnlyWrapper,
    IVisibleWrapper {
}
