import { IBaseComponentInternalProps } from '../base';
import {
  IActiveable,
  IDisableable,
  IStringTypeWrapper,
  IErrorable,
  IIconable,
  IOnBaseClickWrapper,
  ILinkable,
} from '../../definition.interface';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              IActiveable,
                                              IDisableable,
                                              IIconable,
                                              IOnBaseClickWrapper,
                                              ILinkable,
                                              IErrorable<boolean>,
                                              IStringTypeWrapper {
  accent?: boolean;
  raised?: boolean;
}
