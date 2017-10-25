import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { AnyT, IKeyValue } from '../../definition.interface';
import { applySection } from '../../util';

import {
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_LOCK_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_SUBMIT_FINISHED_ACTION_TYPE,
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_CHANGES_ACTION_TYPE,
} from './form.interface';

export class FormActionBuilder {

  public static buildDestroyActionType(section: string): string {
    return `${section}.${FORM_DESTROY_ACTION_TYPE}`;
  }

  public static buildChangeActionType(section: string): string {
    return `${section}.${FORM_CHANGE_ACTION_TYPE}`;
  }

  public static buildChangesActionType(section: string): string {
    return `${section}.${FORM_CHANGES_ACTION_TYPE}`;
  }

  public static buildValidActionType(section: string): string {
    return `${section}.${FORM_VALID_ACTION_TYPE}`;
  }

  public static buildLockActionType(section: string): string {
    return `${section}.${FORM_LOCK_ACTION_TYPE}`;
  }

  public static buildSubmitActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_ACTION_TYPE}`;
  }

  public static buildSubmitDoneActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_DONE_ACTION_TYPE}`;
  }

  public static buildSubmitFinishedActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_FINISHED_ACTION_TYPE}`;
  }

  public static buildSubmitErrorActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_ERROR_ACTION_TYPE}`;
  }

  public static buildSubmitDoneAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildSubmitDoneActionType(section), data);
  }

  public static buildSubmitFinishedAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildSubmitFinishedActionType(section), applySection(section));
  }

  public static buildLockAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildLockActionType(section));
  }

  public static buildChangeAction(section: string, data: IKeyValue): IEffectsAction {
    return EffectsAction.create(this.buildChangeActionType(section), data);
  }

  public static buildChangesAction(section: string, data: IKeyValue): IEffectsAction {
    return EffectsAction.create(this.buildChangesActionType(section), data);
  }
}
