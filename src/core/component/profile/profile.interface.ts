import { IBaseComponentInternalProps } from '../base';
import {
  IEmailWrapper,
  INameWrapper,
  IPathWrapper,
  IOnClickWrapper,
  IAnyMenuActionEntity,
} from '../../definition.interface';
import { IMenuActionsWrapper, MenuActionsWrapperT } from '../menu';

export interface IProfileInternalProps extends IBaseComponentInternalProps,
                                               IEmailWrapper,
                                               INameWrapper,
                                               IPathWrapper,
                                               IOnClickWrapper<IAnyMenuActionEntity>,
                                               MenuActionsWrapperT {
}
