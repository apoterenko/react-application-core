import { IBaseComponentInternalProps } from '../base';
import {
  IActiveWrapper,
  IDisabledWrapper,
  IStringTypeWrapper,
  IStringIconWrapper,
  IOnBaseClickWrapper,
  IToWrapper,
  ISimpleWrapper,
  INotUseClassNameWrapper,
} from '../../definition.interface';
import { IBooleanErrorEntity } from '../../entities-definitions.interface';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              INotUseClassNameWrapper,
                                              IActiveWrapper,
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
