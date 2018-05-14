import {
  IEmailWrapper,
  INameWrapper,
  IStringPathWrapper,
  IPayloadOnClickWrapper,
} from '../../definitions.interface';
import { IComponentEntity, IMenuItemEntity } from '../../entities-definitions.interface';

export interface IProfileInternalProps extends IComponentEntity,
                                               IEmailWrapper,
                                               INameWrapper,
                                               IStringPathWrapper,
                                               IPayloadOnClickWrapper<IMenuItemEntity> {
  menuItems?: any; // TODO
}
