import {
  IIdWrapper,
  IOperationWrapper,
} from '../definitions.interface';

/**
 * @entity
 * @stable [14.02.2021]
 */
export interface IOperationEntity
  extends IIdWrapper<string> {
}

/**
 * @wrapper-entity
 * @stable [14.02.2021]
 */
export interface IOperationWrapperEntity
  extends IOperationWrapper<IOperationEntity> {
}
