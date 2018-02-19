import { IBaseComponentInternalProps } from '../base';
import {
  IActiveable,
  IDisabledWrapper,
  IStringTypeWrapper,
  IErrorable,
  IIconWrapper,
  IOnBaseClickWrapper,
  ILinkable,
} from '../../definition.interface';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              IActiveable,
                                              IDisabledWrapper,
                                              IIconWrapper,
                                              IOnBaseClickWrapper,
                                              ILinkable,
                                              IErrorable<boolean>,
                                              IStringTypeWrapper {
  accent?: boolean;
  raised?: boolean;
}
