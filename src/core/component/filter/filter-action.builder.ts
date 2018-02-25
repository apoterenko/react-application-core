import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { applySection } from '../../util';
import {
  FILTER_OPEN_ACTION_TYPE,
  FILTER_APPLY_ACTION_TYPE,
  FILTER_ACTIVATE_ACTION_TYPE,
  FILTER_DESTROY_ACTION_TYPE,
} from './filter.interface';

export class FilterActionBuilder {
  public static buildApplyActionType(section: string): string {
    return `${section}.${FILTER_APPLY_ACTION_TYPE}`;
  }

  public static buildOpenActionType(section: string): string {
    return `${section}.${FILTER_OPEN_ACTION_TYPE}`;
  }

  public static buildActivateActionType(section: string): string {
    return `${section}.${FILTER_ACTIVATE_ACTION_TYPE}`;
  }

  public static buildDestroyActionType(section: string): string {
    return `${section}.${FILTER_DESTROY_ACTION_TYPE}`;
  }

  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), applySection(section));
  }

  public static buildActivateAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildActivateActionType(section), applySection(section));
  }
}
