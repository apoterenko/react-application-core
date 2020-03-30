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
 * @stable [20.09.2019]
 */
export const INITIAL_STACK_ENTITY = Object.freeze<IStackEntity>({
  destroySections: [],
  lock: false,
  stack: [],
});

/**
 * @entity
 * @stable [18.12.2019]
 */
export interface IStackItemEntity
  extends ILinkedSectionsWrapper,
    ISectionWrapper,
    IUrlWrapper {
}

/**
 * @entity
 * @stable [20.09.2019]
 */
export interface IStackEntity
  extends IDestroySectionsWrapper,
    ILockWrapper,
    IStackWrapper<IStackItemEntity[]> {
}

/**
 * @wrapper-entity
 * @stable [20.09.2019]
 */
export interface IStackWrapperEntity<TEntity = IStackEntity>
  extends IStackWrapper<TEntity> {
}

/**
 * @stable [18.12.2019]
 */
export interface IStackPayloadEntity
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
