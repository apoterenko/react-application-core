import { IBaseComponentInternalProps } from '../../component/base';
import { IActiveable, IDisableable, ITypeable, IErrorable, IIconable } from '../../definition.interface';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              IActiveable,
                                              IDisableable,
                                              IIconable,
                                              IErrorable<boolean>,
                                              ITypeable<string> {
  isAccent?: boolean;
  isRaised?: boolean;
  onClick?(): void;
}
