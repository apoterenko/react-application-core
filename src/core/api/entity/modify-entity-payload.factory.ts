import * as R from 'ramda';
import { IEffectsAction } from 'redux-effects-promise';
import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';

import { IEntity } from '../../definitions.interface';
import { isPrimitive } from '../../util';
import {
  IApplicationModifyEntityPayloadFactory,
  IModifyEntityPayloadWrapper,
  EntityOnSaveMergeStrategyEnum,
} from './modify-entity-payload-factory.interface';
import { IApiEntity } from '../../entities-definitions.interface';

@injectable()
export class ModifyEntityPayloadFactory implements IApplicationModifyEntityPayloadFactory {

  private static logger = LoggerFactory.makeLogger('ModifyEntityPayloadFactory');

  public makeInstance(action: IEffectsAction): IModifyEntityPayloadWrapper {
    const apiEntity = action.initialData as IApiEntity;
    const requestChanges = apiEntity.changes;
    const responseData = action.data;
    const responseEntity = responseData as IEntity;
    const isResponseDataNotPrimitiveAndExists = !R.isNil(responseData) && !isPrimitive(responseData);

    const result: IModifyEntityPayloadWrapper = {
      payload: {
        id: isResponseDataNotPrimitiveAndExists
            ? responseEntity.id
            : apiEntity.id,
        mergeStrategy: isResponseDataNotPrimitiveAndExists
            ? EntityOnSaveMergeStrategyEnum.OVERRIDE
            : EntityOnSaveMergeStrategyEnum.MERGE,
        changes: isResponseDataNotPrimitiveAndExists
            ? responseEntity
            : requestChanges,
      },
    };

    ModifyEntityPayloadFactory.logger.debug(
        '[$ModifyEntityPayloadFactory][makeInstance] Payload wrapper is', result, ', action is', action
    );
    return result;
  }
}
