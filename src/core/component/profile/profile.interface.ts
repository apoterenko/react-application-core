import { IBaseComponentInternalProps } from '../base';
import {
  IEmailWrapper,
  INameWrapper,
  IStringPathWrapper,
  IPayloadOnClickWrapper,
  IAnyMenuActionEntity,
} from '../../definitions.interface';
import { IMenuActionsWrapper, MenuActionsWrapperT } from '../menu';

export interface IProfileInternalProps extends IBaseComponentInternalProps,
                                               IEmailWrapper,
                                               INameWrapper,
                                               IStringPathWrapper,
                                               IPayloadOnClickWrapper<IAnyMenuActionEntity>,
                                               MenuActionsWrapperT {
}
