import { FORM_SUBMIT_ACTION_TYPE, FORM_SUBMIT_DONE_ACTION_TYPE } from './form.interface';

export class FormActionBuilder {
  public static buildFormSubmitActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_ACTION_TYPE}`;
  }

  public static buildFormSubmitDoneActionType(section: string): string {
    return `${section}.${FORM_SUBMIT_DONE_ACTION_TYPE}`;
  }
}
