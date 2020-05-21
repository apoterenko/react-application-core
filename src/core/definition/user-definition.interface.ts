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
 * @redux-entity
 * @stable [21.05.2020]
 */
export interface IReduxUserEntity
  extends INamedEntity,
  ILoginWrapper,
  IPasswordWrapper,
  IUrlWrapper {
}

/**
 * @redux-holder-entity
 * @stable [21.05.2020]
 */
export interface IReduxHolderUserEntity<TEntity = IReduxUserEntity>
  extends IUserWrapper<TEntity> {
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
