import {
  IDisabledWrapper,
  IMiniWrapper,
  IProgressWrapper,
  IRippledWrapper,
  IErrorMessageWrapper,
  IProgressMessageWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';

/**
 * @stable [04.02.2019]
 */
export interface IUniversalButtonEntity extends IErrorEntity,
  IProgressWrapper,
  IDisabledWrapper,
  IRippledWrapper,
  IProgressMessageWrapper,
  IErrorMessageWrapper,
  IMiniWrapper {
}
