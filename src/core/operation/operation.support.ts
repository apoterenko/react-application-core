import {
  EntityIdT,
  IEntity,
} from '../definitions.interface';
import {
  IOperationEntity,
  VERSION_PROCESSOR_LOADING_INFO_OPERATION_UUID,
} from '../definition';
import { Operation } from './operation';
import { JoinUtils } from '../util';

/**
 * @stable [02.04.2020]
 * @param {string} uuid
 * @param {EntityIdT} entityId
 * @returns {IOperationEntity}
 */
export const makeEntityOperation =
  <TEntity extends IEntity>(uuid: string,
                            ...entityId: EntityIdT[]): IOperationEntity =>
    Operation.create(JoinUtils.join([uuid, ...entityId], '-'));

/**
 * @stable [12.05.2020]
 */
export const VERSION_PROCESSOR_LOADING_INFO_OPERATION = Operation.create(VERSION_PROCESSOR_LOADING_INFO_OPERATION_UUID);
