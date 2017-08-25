import { EffectsAction } from 'redux-effects-promise';

import { IKeyValue } from 'core/definition.interface';

import { FORM_SUBMIT_ACTION_TYPE, FORM_SUBMIT_DONE_ACTION_TYPE } from './form.interface';

export class FormActionBuilder {
  public static buildFormSubmitActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_ACTION_TYPE}`;
  }

  public static buildFormSubmitDoneActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_DONE_ACTION_TYPE}`;
  }
}

export class FormAction extends EffectsAction {

  public static createFormSubmitAction(section: string, data?: IKeyValue): FormAction {
    return new FormAction(FormActionBuilder.buildFormSubmitActionType(section), data);
  }

  public static createFormSubmitDoneAction(section: string, data?: IKeyValue): FormAction {
    return new FormAction(FormActionBuilder.buildFormSubmitDoneActionType(section), data);
  }
}
