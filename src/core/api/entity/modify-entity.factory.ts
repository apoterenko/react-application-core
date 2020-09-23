import { IEffectsAction } from 'redux-effects-promise';
import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';

import { IEntity } from '../../definitions.interface';
import { TypeUtils } from '../../util';
import {
  EntityMergeStrategiesEnum,
  IApiEntity,
  IModifyEntity,
  IModifyEntityFactory,
} from '../../definition';

@injectable()
export class ModifyEntityFactory implements IModifyEntityFactory {
  private static readonly logger = LoggerFactory.makeLogger('ModifyEntityFactory');

  /**
   * @stable [23.09.2020]
   * @param action
   */
  public makeInstance(action: IEffectsAction): IModifyEntity {
    const {
      entityId,
      changes,
    } = action.initialData as IApiEntity;
    const responseEntity = action.data as IEntity;
    const isResponseDataObject = TypeUtils.isObject(responseEntity);

    const result: IModifyEntity = {
      id: isResponseDataObject
        ? responseEntity.id
        : entityId,
      mergeStrategy: isResponseDataObject
        ? EntityMergeStrategiesEnum.OVERRIDE
        : EntityMergeStrategiesEnum.MERGE,
      changes: isResponseDataObject
        ? responseEntity
        : changes,
    };

    ModifyEntityFactory.logger.debug(
      '[$ModifyEntityFactory][makeInstance] Entity:', result, ', action:', action
    );
    return result;
  }
}
