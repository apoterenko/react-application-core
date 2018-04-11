import * as R from 'ramda';

import { Operation } from '../../operation';
import { IEntity } from '../../definitions.interface';
import { IDefaultApiEntity } from '../../entities-definitions.interface';

/**
 * @stable - 11.04.2018
 * @param {IEntity} changes
 * @param {IEntity} entity
 * @param {string} operationId
 * @returns {IDefaultApiEntity}
 */
export const buildApiEntity = (changes: IEntity, entity?: IEntity, operationId?: string): IDefaultApiEntity => {
  const entityId = entity && entity.id;
  const merger = {
    ...entity,
    ...changes,
  };

  const apiEntity: IDefaultApiEntity = (
    R.isNil(entityId)
      // You should use formMapper at least (simple form)
      ? { isNew: true, changes: {...changes}, merger, }

      // You should use formMapper and entityMapper at least (editable entity)
      : { isNew: false, changes: {...changes}, entity: {...entity}, merger, id: entityId }
  );
  return {
    operation: Operation.create(operationId),
    ...apiEntity,
  };
};
