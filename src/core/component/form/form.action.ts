import { EffectsAction } from 'redux-effects-promise';

import { IKeyValue } from 'core/definition.interface';

import { FormActionBuilder } from './form-action.builder';

export class FormAction extends EffectsAction {

  public static createFormSubmitAction(section: string, data?: IKeyValue): FormAction {
    return new FormAction(FormActionBuilder.buildFormSubmitActionType(section), data);
  }

  public static createFormSubmitDoneAction(section: string, data?: IKeyValue): FormAction {
    return new FormAction(FormActionBuilder.buildFormSubmitDoneActionType(section), data);
  }
}
