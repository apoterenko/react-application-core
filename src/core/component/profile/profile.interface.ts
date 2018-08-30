import {
  IEmailWrapper,
  INameWrapper,
  IStringPathWrapper,
  IOnClickWrapper,
} from '../../definitions.interface';
import { IComponentEntity, IMenuItemEntity } from '../../entities-definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

export interface IProfileInternalProps extends IComponentProps,
                                               IEmailWrapper,
                                               INameWrapper,
                                               IStringPathWrapper,
                                               IOnClickWrapper<IMenuItemEntity> {
  menuItems?: any; // TODO
  appVersion?: string; // TODO
}
