import { injectable } from 'inversify';

import {
  INITIAL_APPLICATION_ENTITY,
  INITIAL_CHANNELS_ENTITY,
  INITIAL_NOTIFICATION_ENTITY,
  INITIAL_TRANSPORT_ENTITY,
  IStateSerializer,
  IStoreEntity,
} from '../../../definition';
import { ifNotNilThanValue } from '../../../util';

@injectable()
export class StateSerializer implements IStateSerializer {

  /**
   * @stable [24.09.2019]
   * @param {IStoreEntity} state
   * @returns {IStoreEntity}
   */
  public serialize(state: IStoreEntity): IStoreEntity {
    return {
      ...state,
      ...ifNotNilThanValue(
        state.application,
        () => ({application: INITIAL_APPLICATION_ENTITY})
      ),
      ...ifNotNilThanValue(
        state.notification,
        () => ({notification: INITIAL_NOTIFICATION_ENTITY})
      ),
      ...ifNotNilThanValue(
        state.transport,
        () => ({transport: INITIAL_TRANSPORT_ENTITY})
      ),
      ...ifNotNilThanValue(
        state.channel,
        () => ({channel: INITIAL_CHANNELS_ENTITY})
      ),
    };
  }
}
