import {
  ILoginWrapper,
  IPasswordWrapper,
  IUrlWrapper,
  IUserWrapper,
} from '../definitions.interface';
import { INamedEntity } from './entity-definition.interface';

/**
 * @stable [27.09.2019]
 */
export interface IUserEntity
  extends INamedEntity,
  IUrlWrapper,
  IPasswordWrapper,
  ILoginWrapper {
}

/**
 * @stable [27.09.2019]
 */
export interface IUserWrapperEntity
  extends IUserWrapper<IUserEntity> {
}
