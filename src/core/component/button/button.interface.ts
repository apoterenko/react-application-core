import { IBaseComponentInternalProps } from '../base';
import {
  IActiveWrapper,
  IDisabledWrapper,
  IStringTypeWrapper,
  IErrorEntity,
  IIconWrapper,
  IOnBaseClickWrapper,
  IToWrapper,
  ISimpleWrapper,
} from '../../definition.interface';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              IActiveWrapper,
                                              IDisabledWrapper,
                                              IIconWrapper,
                                              IOnBaseClickWrapper,
                                              IToWrapper,
                                              ISimpleWrapper,
                                              IErrorEntity<boolean>,
                                              IStringTypeWrapper {
  accent?: boolean;
  raised?: boolean;
}
