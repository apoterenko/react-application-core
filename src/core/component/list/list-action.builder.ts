import { EffectsAction } from 'redux-effects-promise';

import {
  LIST_LOAD_ACTION_TYPE,
  LIST_LOCK_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
  LIST_LOAD_ERROR_ACTION_TYPE,
} from './list.interface';

export class ListActionBuilder {
  public static buildLoadActionType(section: string): string {
    return `${section}.${LIST_LOAD_ACTION_TYPE}`;
  }

  public static buildLoadErrorActionType(section: string): string {
    return `${section}.${LIST_LOAD_ERROR_ACTION_TYPE}`;
  }

  public static buildSelectActionType(section: string): string {
    return `${section}.${LIST_SELECT_ACTION_TYPE}`;
  }

  public static buildLockActionType(section: string): string {
    return `${section}.${LIST_LOCK_ACTION_TYPE}`;
  }

  public static buildLockAction(section: string): EffectsAction {
    return EffectsAction.create(this.buildLockActionType(section));
  }
}
