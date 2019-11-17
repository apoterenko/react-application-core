import {
  ACTION_PREFIX,
  ILoginWrapper,
  IPasswordWrapper,
  IUrlWrapper,
  IUserWrapper,
} from '../definitions.interface';
import { INamedEntity } from './entity-definition.interface';
import { IEntityReducerFactoryConfigEntity } from './redux-definition.interface';

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

/**
 * @stable [13.11.2019]
 */
export const USER_DESTROY_ACTION_TYPE = `${ACTION_PREFIX}user.destroy`;
export const USER_REPLACE_ACTION_TYPE = `${ACTION_PREFIX}user.replace`;
export const USER_UPDATE_ACTION_TYPE = `${ACTION_PREFIX}user.update`;

/**
 * @stable [13.11.2019]
 */
export const USER_REDUCER_FACTORY_CONFIG_ENTITY = Object.freeze<IEntityReducerFactoryConfigEntity>({
  destroy: USER_DESTROY_ACTION_TYPE,
  replace: USER_REPLACE_ACTION_TYPE,
  update: USER_UPDATE_ACTION_TYPE,
});
