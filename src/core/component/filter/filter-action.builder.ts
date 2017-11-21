import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import {
  FILTER_OPEN_ACTION_TYPE,
  FILTER_LOCK_ACTION_TYPE,
  FILTER_APPLY_ACTION_TYPE,
  FILTER_ACTIVATE_ACTION_TYPE,
} from './filter.interface';

export class FilterActionBuilder {
  public static buildApplyActionType(section: string): string {
    return `${section}.${FILTER_APPLY_ACTION_TYPE}`;
  }

  public static buildOpenActionType(section: string): string {
    return `${section}.${FILTER_OPEN_ACTION_TYPE}`;
  }

  public static buildLockActionType(section: string): string {
    return `${section}.${FILTER_LOCK_ACTION_TYPE}`;
  }

  public static buildActivateActionType(section: string): string {
    return `${section}.${FILTER_ACTIVATE_ACTION_TYPE}`;
  }

  public static buildLockAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildLockActionType(section));
  }

  public static buildActivateAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildActivateActionType(section));
  }
}
