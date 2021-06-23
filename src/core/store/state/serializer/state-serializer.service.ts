import { injectable } from 'inversify';

import {
  INITIAL_REDUX_ASYNC_LIBS_ENTITY,
  INITIAL_REDUX_CHANNELS_ENTITY,
  INITIAL_REDUX_NOTIFICATION_ENTITY,
  INITIAL_REDUX_TRANSPORT_ENTITY,
  INITIAL_UNIVERSAL_APPLICATION_ENTITY,
  IStateSerializer,
  IStoreEntity,
} from '../../../definition';
import { ConditionUtils } from '../../../util';

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
      ...ConditionUtils.ifNotNilThanValue(
        state.application,
        () => ({application: INITIAL_UNIVERSAL_APPLICATION_ENTITY})
      ),
      ...ConditionUtils.ifNotNilThanValue(
        state.notification,
        () => ({notification: INITIAL_REDUX_NOTIFICATION_ENTITY})
      ),
      ...ConditionUtils.ifNotNilThanValue(
        state.transport,
        () => ({transport: INITIAL_REDUX_TRANSPORT_ENTITY})
      ),
      ...ConditionUtils.ifNotNilThanValue(
        state.asyncLibs,
        () => ({asyncLibs: INITIAL_REDUX_ASYNC_LIBS_ENTITY})
      ),
      ...ConditionUtils.ifNotNilThanValue(
        state.channel,
        () => ({channel: INITIAL_REDUX_CHANNELS_ENTITY})
      ),
    };
  }
}
