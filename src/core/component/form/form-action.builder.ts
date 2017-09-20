import { EffectsAction } from 'redux-effects-promise';

import { AnyT } from 'core/definition.interface';

import {
  FORM_SUBMIT_ACTION_TYPE,
  FORM_SUBMIT_DONE_ACTION_TYPE,
  FORM_SUBMIT_ERROR_ACTION_TYPE,
  FORM_LOCK_ACTION_TYPE,
  FORM_SUBMIT_FINISHED_ACTION_TYPE,
} from './form.interface';

export class FormActionBuilder {
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

  public static buildSubmitDoneAction(section: string, data?: AnyT): EffectsAction {
    return EffectsAction.create(this.buildSubmitDoneActionType(section), data);
  }

  public static buildSubmitFinishedAction(section: string, data?: AnyT): EffectsAction {
    return EffectsAction.create(this.buildSubmitFinishedActionType(section), data);
  }

  public static buildLockAction(section: string): EffectsAction {
    return EffectsAction.create(this.buildLockActionType(section));
  }
}
