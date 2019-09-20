import {
  ILinkedSectionsWrapper,
  ILockWrapper,
  IDestroySectionsWrapper,
  ISectionWrapper,
  IStackWrapper,
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
 * @stable [20.09.2019]
 */
export interface IStackItemEntity
  extends ISectionWrapper,
    ILinkedSectionsWrapper {
}

/**
 * @stable [20.09.2019]
 */
export interface IStackEntity
  extends IStackWrapper<IStackItemEntity[]>,
    ILockWrapper,
    IDestroySectionsWrapper {
}

/**
 * @stable [20.09.2019]
 */
export interface IStackWrapperEntity
  extends IStackWrapper<IStackEntity> {
}
