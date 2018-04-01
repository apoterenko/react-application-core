import { IBaseComponentInternalProps } from '../base';
import {
  IBooleanActiveWrapper,
  IDisabledWrapper,
  IStringTypeWrapper,
  IStringIconWrapper,
  IOnBaseClickWrapper,
  IToWrapper,
  ISimpleWrapper,
  INotUseClassNameWrapper,
} from '../../definitions.interface';
import { IBooleanErrorEntity } from '../../entities-definitions.interface';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              INotUseClassNameWrapper,
                                              IBooleanActiveWrapper,
                                              IDisabledWrapper,
                                              IStringIconWrapper,
                                              IOnBaseClickWrapper,
                                              IToWrapper,
                                              ISimpleWrapper,
                                              IBooleanErrorEntity,
                                              IStringTypeWrapper {
  accent?: boolean;
  raised?: boolean;
}
