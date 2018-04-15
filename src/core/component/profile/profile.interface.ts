import { IBaseComponentInternalProps } from '../base';
import {
  IStringEmailWrapper,
  INameWrapper,
  IStringPathWrapper,
  IPayloadOnClickWrapper,
  IAnyMenuActionEntity,
} from '../../definitions.interface';
import { IMenuActionsWrapper, MenuActionsWrapperT } from '../menu';

export interface IProfileInternalProps extends IBaseComponentInternalProps,
                                               IStringEmailWrapper,
                                               INameWrapper,
                                               IStringPathWrapper,
                                               IPayloadOnClickWrapper<IAnyMenuActionEntity>,
                                               MenuActionsWrapperT {
}
