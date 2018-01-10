import { IBaseComponentInternalProps } from '../../component/base';
import {
  IActiveable,
  IDisableable,
  ITypeable,
  IErrorable,
  IIconable,
  IClickable,
  ILinkable,
} from '../../definition.interface';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              IActiveable,
                                              IDisableable,
                                              IIconable,
                                              IClickable,
                                              ILinkable,
                                              IErrorable<boolean>,
                                              ITypeable<string> {
  accent?: boolean;
  raised?: boolean;
}
