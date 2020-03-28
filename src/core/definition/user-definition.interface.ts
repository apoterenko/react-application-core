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
 * @entity
 * @stable [27.09.2019]
 */
export interface IUserEntity
  extends INamedEntity,
  IUrlWrapper,
  IPasswordWrapper,
  ILoginWrapper {
}

/**
 * @wrapper-entity
 * @stable [27.09.2019]
 */
export interface IUserWrapperEntity<TUser = IUserEntity>
  extends IUserWrapper<TUser> {
}

/**
 * @stable [13.11.2019]
 */
export const $RAC_USER_DESTROY_ACTION_TYPE = `${ACTION_PREFIX}user.destroy`;
export const $RAC_USER_REPLACE_ACTION_TYPE = `${ACTION_PREFIX}user.replace`;
export const $RAC_USER_UPDATE_ACTION_TYPE = `${ACTION_PREFIX}user.update`;

/**
 * @stable [13.11.2019]
 */
export const $RAC_USER_REDUCER_FACTORY_CONFIG_ENTITY = Object.freeze<IEntityReducerFactoryConfigEntity>({
  destroy: $RAC_USER_DESTROY_ACTION_TYPE,
  replace: $RAC_USER_REPLACE_ACTION_TYPE,
  update: $RAC_USER_UPDATE_ACTION_TYPE,
});
