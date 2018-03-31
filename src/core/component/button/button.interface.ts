import { IBaseComponentInternalProps } from '../base';
import {
  IActiveWrapper,
  IDisabledWrapper,
  IStringTypeWrapper,
  IStringIconWrapper,
  IOnBaseClickWrapper,
  IToWrapper,
  ISimpleWrapper,
} from '../../definition.interface';
import { IErrorEntity } from '../../entities-definitions.interface';

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
