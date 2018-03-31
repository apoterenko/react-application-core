import {
  IUuidWrapper,
  IAnyDataWrapper,
  IStringCommandWrapper,
} from '../../definitions.interface';

export interface ICommandResult extends IUuidWrapper,
                                        IAnyDataWrapper,
                                        IStringCommandWrapper {
}
