import { IBaseComponentInternalProps } from '../base';
import {
  IBooleanActiveWrapper,
  IStringIconWrapper,
  IOnBaseClickWrapper,
  IToWrapper,
  INotUseClassNameWrapper,
} from '../../definitions.interface';
import { IBooleanErrorEntity, IButtonEntity } from '../../entities-definitions.interface';
import { IButtonConfiguration } from '../../configurations-definitions.interface';

export interface IButtonInternalProps extends IBaseComponentInternalProps,
                                              IButtonConfiguration,
                                              IButtonEntity,
                                              INotUseClassNameWrapper,
                                              IBooleanActiveWrapper,
                                              IStringIconWrapper,
                                              IOnBaseClickWrapper,
                                              IToWrapper,
                                              IBooleanErrorEntity {
  accent?: boolean;
  raised?: boolean;
}
