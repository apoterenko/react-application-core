import { IBaseComponentInternalProps } from '../base';
import {
  IEmailWrapper,
  INameWrapper,
  IPathWrapper,
  IPayloadOnClickWrapper,
  IAnyMenuActionEntity,
} from '../../definitions.interface';
import { IMenuActionsWrapper, MenuActionsWrapperT } from '../menu';

export interface IProfileInternalProps extends IBaseComponentInternalProps,
                                               IEmailWrapper,
                                               INameWrapper,
                                               IPathWrapper,
                                               IPayloadOnClickWrapper<IAnyMenuActionEntity>,
                                               MenuActionsWrapperT {
}
