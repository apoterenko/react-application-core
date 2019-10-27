import {
  IDelayTimeoutWrapper,
  IIgnoreEnterKeyWrapper,
  IOnSelectWrapper,
  IRobotDetectionMinSymbolsCountWrapper,
} from '../../definitions.interface';
import { IUniversalComponentProps } from '../../definition';

/**
 * @stable [08.10.2019]
 */
export interface IKeyInterceptorProps
  extends IUniversalComponentProps,
    IDelayTimeoutWrapper,
    IIgnoreEnterKeyWrapper,
    IOnSelectWrapper<string>,
    IRobotDetectionMinSymbolsCountWrapper {
}
