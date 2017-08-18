import { EffectsAction } from 'redux-effects-promise';

import { FORM_SUBMIT_ACTION_TYPE, FORM_SUBMIT_DONE_ACTION_TYPE } from './form.interface';
import { IKeyValue } from '../../definition.interface';

export class FormActionBuilder {
  static buildFormSubmitActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_ACTION_TYPE}`;
  };

  static buildFormSubmitDoneActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_DONE_ACTION_TYPE}`;
  };
}

export class FormAction extends EffectsAction {

  static createFormSubmitAction(section: string, data?: IKeyValue): FormAction {
    return new FormAction(FormActionBuilder.buildFormSubmitActionType(section), data);
  }

  static createFormSubmitDoneAction(section: string, data?: IKeyValue): FormAction {
    return new FormAction(FormActionBuilder.buildFormSubmitDoneActionType(section), data);
  }
}
