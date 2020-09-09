import { IEffectsAction } from 'redux-effects-promise';
import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';
import * as R from 'ramda';

import { IEntity } from '../../definitions.interface';
import { TypeUtils } from '../../util';
import {
  EntityMergeStrategiesEnum,
  IApiEntity,
  IModifyEntityPayloadFactory,
  IFluxModifyEntityPayloadEntity,
} from '../../definition';

@injectable()
export class ModifyEntityPayloadFactory implements IModifyEntityPayloadFactory {

  private static readonly logger = LoggerFactory.makeLogger('ModifyEntityPayloadFactory');

  /**
   * @stable [09.10.2019]
   * @param {IEffectsAction} action
   * @returns {IFluxModifyEntityPayloadEntity}
   */
  public makeInstance(action: IEffectsAction): IFluxModifyEntityPayloadEntity {
    const {
      entityId,
      changes,
    } = action.initialData as IApiEntity;
    const responseData = action.data;
    const responseEntity = responseData as IEntity;
    const isResponseDataObject = !R.isNil(responseData) && !TypeUtils.isPrimitive(responseData);

    const result: IFluxModifyEntityPayloadEntity = {
      payload: {
        id: isResponseDataObject
          ? responseEntity.id
          : entityId,
        mergeStrategy: isResponseDataObject
          ? EntityMergeStrategiesEnum.OVERRIDE
          : EntityMergeStrategiesEnum.MERGE,
        changes: isResponseDataObject
          ? responseEntity
          : changes,
      },
    };

    ModifyEntityPayloadFactory.logger.debug(
      '[$ModifyEntityPayloadFactory][makeInstance] Payload wrapper:', result, ', action:', action
    );
    return result;
  }
}
