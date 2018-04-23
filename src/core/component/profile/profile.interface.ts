import {
  IStringEmailWrapper,
  INameWrapper,
  IStringPathWrapper,
  IPayloadOnClickWrapper,
  IAnyMenuActionEntity,
} from '../../definitions.interface';
import { IMenuActionsWrapper, MenuActionsWrapperT } from '../menu';
import { IComponentEntity } from '../../entities-definitions.interface';

export interface IProfileInternalProps extends IComponentEntity,
                                               IStringEmailWrapper,
                                               INameWrapper,
                                               IStringPathWrapper,
                                               IPayloadOnClickWrapper<IAnyMenuActionEntity>,
                                               MenuActionsWrapperT {
}
