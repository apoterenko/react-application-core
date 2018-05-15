import {
  IEmailWrapper,
  INameWrapper,
  IStringPathWrapper,
  IOnClickWrapper,
} from '../../definitions.interface';
import { IComponentEntity, IMenuItemEntity } from '../../entities-definitions.interface';

export interface IProfileInternalProps extends IComponentEntity,
                                               IEmailWrapper,
                                               INameWrapper,
                                               IStringPathWrapper,
                                               IOnClickWrapper<IMenuItemEntity> {
  menuItems?: any; // TODO
}
