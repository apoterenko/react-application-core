import { IEffectsAction } from 'redux-effects-promise';
import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';

import { IEntity } from '../../definitions.interface';
import { isPrimitive, ifNotNilThanValue } from '../../util';
import {
  EntityMergeStrategiesEnum,
  IApiEntity,
  IModifyEntityPayloadFactory,
  IModifyEntityPayloadWrapperEntity,
} from '../../definition';

@injectable()
export class ModifyEntityPayloadFactory implements IModifyEntityPayloadFactory {

  private static readonly logger = LoggerFactory.makeLogger('ModifyEntityPayloadFactory');

  /**
   * @stable [09.10.2019]
   * @param {IEffectsAction} action
   * @returns {IModifyEntityPayloadWrapperEntity}
   */
  public makeInstance(action: IEffectsAction): IModifyEntityPayloadWrapperEntity {
    const apiEntity = action.initialData as IApiEntity;
    const responseData = action.data;
    const responseEntity = responseData as IEntity;
    const doesResponseDataNotPrimitiveAndExist = ifNotNilThanValue(responseData, () => !isPrimitive(responseData), false);

    const result: IModifyEntityPayloadWrapperEntity = {
      payload: {
        id: doesResponseDataNotPrimitiveAndExist
            ? responseEntity.id
            : apiEntity.entityId,
        mergeStrategy: doesResponseDataNotPrimitiveAndExist
            ? EntityMergeStrategiesEnum.OVERRIDE
            : EntityMergeStrategiesEnum.MERGE,
        changes: doesResponseDataNotPrimitiveAndExist
            ? responseEntity
            : apiEntity.changes,
      },
    };

    ModifyEntityPayloadFactory.logger.debug(
        '[$ModifyEntityPayloadFactory][makeInstance] Payload wrapper:', result, ', action:', action
    );
    return result;
  }
}
