import { IBaseComponentInternalProps } from '../base';
import {
  IBooleanActiveWrapper,
  IOnBaseClickWrapper,
  IToWrapper,
  INotUseClassNameWrapper,
} from '../../definitions.interface';
import { IUniversalButtonEntity } from '../../entities-definitions.interface';
import { IButtonConfiguration } from '../../configurations-definitions.interface';

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              IButtonConfiguration,
                                              IUniversalButtonEntity,
                                              INotUseClassNameWrapper,
                                              IBooleanActiveWrapper,
                                              IOnBaseClickWrapper,
                                              IToWrapper {
  accent?: boolean;
  raised?: boolean;
}
