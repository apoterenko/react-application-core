import { Operation } from './operation';
import { IOperationEntity } from '../definition';
import { IEntity } from '../definitions.interface';

/**
 * @stable [25.08.2019]
 * @param {string} uuid
 * @param {TEntity} entity
 * @returns {IOperationEntity}
 */
export const makeEntityOperation = <TEntity extends IEntity>(uuid: string,
                                                             entity: TEntity): IOperationEntity =>
    Operation.create(`${uuid}-${entity.id}`);
