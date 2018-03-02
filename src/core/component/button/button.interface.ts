import { IBaseComponentInternalProps } from '../base';
import {
  IActiveable,
  IDisabledWrapper,
  IStringTypeWrapper,
  IErrorEntity,
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
                                              IErrorEntity<boolean>,
                                              IStringTypeWrapper {
  accent?: boolean;
  raised?: boolean;
}
