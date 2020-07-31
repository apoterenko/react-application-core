import {
  ACTION_PREFIX,
  IDestroySectionsWrapper,
  ILinkedSectionsWrapper,
  ILockWrapper,
  ISectionWrapper,
  IStackWrapper,
  IUrlWrapper,
} from '../definitions.interface';

/**
 * @initial-redux-entity
 * @stable [21.05.2020]
 */
export const INITIAL_REDUX_STACK_ENTITY = Object.freeze<IReduxStackEntity>({
  destroySections: [],
  lock: false,
  stack: [],
});

/**
 * @redux-entity
 * @stable [21.05.2020]
 */
export interface IReduxStackItemEntity
  extends ILinkedSectionsWrapper,
    ISectionWrapper,
    IUrlWrapper {
}

/**
 * @redux-entity
 * @stable [21.05.2020]
 */
export interface IReduxStackEntity
  extends IDestroySectionsWrapper,
    ILockWrapper,
    IStackWrapper<IReduxStackItemEntity[]> {
}

/**
 * @redux-holder-entity
 * @stable [21.05.2020]
 */
export interface IReduxStackHolderEntity<TEntity = IReduxStackEntity>
  extends IStackWrapper<TEntity> {
}

/**
 * @flux-entity
 * @stable [21.05.2020]
 */
export interface IFluxStackEntity
  extends ISectionWrapper,
    IUrlWrapper {
}

/**
 * @stable [19.12.2019]
 */
export const $RAC_STACK_LOCK_ACTION_TYPE = `${ACTION_PREFIX}stack.lock`;
export const $RAC_STACK_POP_ACTION_TYPE = `${ACTION_PREFIX}stack.pop`;
export const $RAC_STACK_PUSH_ACTION_TYPE = `${ACTION_PREFIX}stack.push`;
export const $RAC_STACK_REMOVE_ACTION_TYPE = `${ACTION_PREFIX}stack.remove`;
