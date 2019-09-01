import {
  IDisabledWrapper,
  INameWrapper,
  IPlaceholderWrapper,
  IProgressWrapper,
  IReadOnlyWrapper,
  IVisibleWrapper,
  UNDEF,
} from '../definitions.interface';

/**
 * @stable [28.05.2019]
 */
export const FIELD_DISPLAY_EMPTY_VALUE = '';
export const FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES = UNDEF;

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
