import {
  IDisabledWrapper,
  INameWrapper,
  IPlaceholderWrapper,
  IProgressWrapper,
  IReadOnlyWrapper,
  IVisibleWrapper,
} from '../definitions.interface';

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
