import { Operation } from './operation';
import { IOperationEntity } from '../definition';
import { IEntity, EntityIdT } from '../definitions.interface';

/**
 * @stable [04.09.2019]
 * @param {string} uuid
 * @param {EntityIdT} entityId
 * @returns {IOperationEntity}
 */
export const makeEntityOperation = <TEntity extends IEntity>(uuid: string,
                                                             entityId: EntityIdT): IOperationEntity =>
    Operation.create(`${uuid}-${entityId}`);
