import {
  IProgressWrapper,
  ITouchedWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';

/**
 * @stable [04.02.2019]
 */
export interface IUniversalLifeCycleEntity
  extends ITouchedWrapper,
    IProgressWrapper,
    IErrorEntity<string> {
}
