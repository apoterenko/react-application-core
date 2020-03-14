import {
  EffectsAction,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  $RAC_STORAGE_SYNC_APP_STATE_ACTION_TYPE,
} from '../definition';

export class StorageActionBuilder {

  /**
   * @stable [17.11.2019]
   * @returns {IEffectsAction}
   */
  public static buildSyncAppStateAction(): IEffectsAction {
    return EffectsAction.create($RAC_STORAGE_SYNC_APP_STATE_ACTION_TYPE);
  }
}
