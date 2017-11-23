import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { applySection } from '../../util';
import { AnyT } from '../../definition.interface';

import {
  LIST_LOAD_ACTION_TYPE,
  LIST_LOCK_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
  LIST_LOAD_ERROR_ACTION_TYPE,
  LIST_NEXT_PAGE_ACTION_TYPE,
  LIST_DESELECT_ACTION_TYPE,
  LIST_CREATE_ACTION_TYPE,
  LIST_PREVIOUS_PAGE_ACTION_TYPE,
  LIST_DESTROY_ACTION_TYPE,
  LIST_LOAD_DONE_ACTION_TYPE,
  LIST_INSERT_ACTION_TYPE,
  LIST_UPDATE_ACTION_TYPE,
  LIST_SEARCH_ACTION_TYPE,
  LIST_LAST_PAGE_ACTION_TYPE,
  LIST_FIRST_PAGE_ACTION_TYPE,
} from './list.interface';

export class ListActionBuilder {

  public static buildFirstPageActionType(section: string): string {
    return `${section}.${LIST_FIRST_PAGE_ACTION_TYPE}`;
  }

  public static buildLastPageActionType(section: string): string {
    return `${section}.${LIST_LAST_PAGE_ACTION_TYPE}`;
  }

  public static buildPreviousPageActionType(section: string): string {
    return `${section}.${LIST_PREVIOUS_PAGE_ACTION_TYPE}`;
  }

  public static buildNextPageActionType(section: string): string {
    return `${section}.${LIST_NEXT_PAGE_ACTION_TYPE}`;
  }

  public static buildLoadActionType(section: string): string {
    return `${section}.${LIST_LOAD_ACTION_TYPE}`;
  }

  public static buildLoadDoneActionType(section: string): string {
    return `${section}.${LIST_LOAD_DONE_ACTION_TYPE}`;
  }

  public static buildLoadErrorActionType(section: string): string {
    return `${section}.${LIST_LOAD_ERROR_ACTION_TYPE}`;
  }

  public static buildSelectActionType(section: string): string {
    return `${section}.${LIST_SELECT_ACTION_TYPE}`;
  }

  public static buildSearchActionType(section: string): string {
    return `${section}.${LIST_SEARCH_ACTION_TYPE}`;
  }

  public static buildInsertActionType(section: string): string {
    return `${section}.${LIST_INSERT_ACTION_TYPE}`;
  }

  public static buildUpdateActionType(section: string): string {
    return `${section}.${LIST_UPDATE_ACTION_TYPE}`;
  }

  public static buildCreateActionType(section: string): string {
    return `${section}.${LIST_CREATE_ACTION_TYPE}`;
  }

  public static buildDeselectActionType(section: string): string {
    return `${section}.${LIST_DESELECT_ACTION_TYPE}`;
  }

  public static buildLockActionType(section: string): string {
    return `${section}.${LIST_LOCK_ACTION_TYPE}`;
  }

  public static buildDestroyActionType(section: string): string {
    return `${section}.${LIST_DESTROY_ACTION_TYPE}`;
  }

  public static buildSearchAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildSearchActionType(section), applySection(section));
  }

  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), applySection(section));
  }

  public static buildLockAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildLockActionType(section), applySection(section));
  }

  public static buildInsertAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildInsertActionType(section), applySection(section, data));
  }

  public static buildUpdateAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildUpdateActionType(section), applySection(section, data));
  }

  public static buildLoadAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildLoadActionType(section), applySection(section, data));
  }

  public static buildNextPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildNextPageActionType(section), applySection(section, data));
  }

  public static buildPreviousPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildPreviousPageActionType(section), applySection(section, data));
  }

  public static buildFirstPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildFirstPageActionType(section), applySection(section, data));
  }

  public static buildLastPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildLastPageActionType(section), applySection(section, data));
  }
}
