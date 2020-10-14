import {
  IDelayTimeoutWrapper,
  IIgnoreEnterKeyWrapper,
  IOnSelectWrapper,
  IRobotDetectionMinSymbolsCountWrapper,
} from '../../definitions.interface';
import { IGenericComponentProps } from '../../definition';

/**
 * @stable [08.10.2019]
 */
export interface IKeyInterceptorProps
  extends IGenericComponentProps,
    IDelayTimeoutWrapper,
    IIgnoreEnterKeyWrapper,
    IOnSelectWrapper<string>,
    IRobotDetectionMinSymbolsCountWrapper {
}
