import { IBaseComponentInternalProps } from '../base';
import {
  IActiveWrapper,
  IDisabledWrapper,
  IStringTypeWrapper,
  IErrorEntity,
  IStringIconWrapper,
  IOnBaseClickWrapper,
  IToWrapper,
  ISimpleWrapper,
} from '../../definition.interface';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              IActiveWrapper,
                                              IDisabledWrapper,
                                              IStringIconWrapper,
                                              IOnBaseClickWrapper,
                                              IToWrapper,
                                              ISimpleWrapper,
                                              IErrorEntity<boolean>,
                                              IStringTypeWrapper {
  accent?: boolean;
  raised?: boolean;
}
