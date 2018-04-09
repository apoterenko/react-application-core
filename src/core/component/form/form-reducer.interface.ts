import { EffectsActionBuilder } from 'redux-effects-promise';

import { IDefaultFormEntity } from '../../entities-definitions.interface';

/* @stable - 09.04.2018 */
export const INITIAL_APPLICATION_FORM_STATE: IDefaultFormEntity = {
  changes: {},
};

export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_FINISHED_ACTION_TYPE = `${FORM_SUBMIT_ACTION_TYPE}.finished`;
export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
export const FORM_RESET_ACTION_TYPE = 'form.reset';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
