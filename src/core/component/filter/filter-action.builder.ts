import { EffectsAction } from 'redux-effects-promise';

import {
  FILTER_SECTION,
  FILTER_LOCK_ACTION_TYPE,
} from './filter.interface';

export class FilterActionBuilder {
  public static buildSectionActionType(section: string): string {
    return `${section}.${FILTER_SECTION}`;
  }

  public static buildLockActionType(section: string): string {
    return `${section}.${FILTER_LOCK_ACTION_TYPE}`;
  }

  public static buildLockAction(section: string): EffectsAction {
    return EffectsAction.create(this.buildLockActionType(section));
  }
}
