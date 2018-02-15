import { IBaseComponentInternalProps } from '../base';
import {
  IActiveable,
  IDisableable,
  IStringTypeWrapper,
  IErrorable,
  IIconable,
  IOnClickWrapper,
  ILinkable,
} from '../../definition.interface';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              IActiveable,
                                              IDisableable,
                                              IIconable,
                                              IOnClickWrapper,
                                              ILinkable,
                                              IErrorable<boolean>,
                                              IStringTypeWrapper {
  accent?: boolean;
  raised?: boolean;
}
