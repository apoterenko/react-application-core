import {
  IUuidWrapper,
  IAnyDataWrapper,
  IStringCommandWrapper,
} from '../../definition.interface';

export interface ICommandResult extends IUuidWrapper,
                                        IAnyDataWrapper,
                                        IStringCommandWrapper {
}
