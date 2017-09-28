import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { AnyT } from '../../definition.interface';

import {
  LIST_LOAD_ACTION_TYPE,
  LIST_LOCK_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
  LIST_LOAD_ERROR_ACTION_TYPE,
  LIST_DESELECT_ACTION_TYPE,
  LIST_ADD_ITEM_ACTION_TYPE,
  LIST_INSERT_ACTION_TYPE,
  LIST_UPDATE_ACTION_TYPE,
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

  public static buildInsertActionType(section: string): string {
    return `${section}.${LIST_INSERT_ACTION_TYPE}`;
  }

  public static buildUpdateActionType(section: string): string {
    return `${section}.${LIST_UPDATE_ACTION_TYPE}`;
  }

  public static buildAddItemActionType(section: string): string {
    return `${section}.${LIST_ADD_ITEM_ACTION_TYPE}`;
  }

  public static buildDeselectActionType(section: string): string {
    return `${section}.${LIST_DESELECT_ACTION_TYPE}`;
  }

  public static buildLockActionType(section: string): string {
    return `${section}.${LIST_LOCK_ACTION_TYPE}`;
  }

  public static buildLockAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildLockActionType(section));
  }

  public static buildInsertAction(section: string, data: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildInsertActionType(section), data);
  }

  public static buildUpdateAction(section: string, data: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildUpdateActionType(section), data);
  }
}
