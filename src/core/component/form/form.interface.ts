import { EffectsActionBuilder } from 'redux-effects-promise';

export const FORM_PROGRESS_ACTION_TYPE = 'form.progress';
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_FINISHED_ACTION_TYPE = `${FORM_SUBMIT_ACTION_TYPE}.finished`;
export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
export const FORM_RESET_ACTION_TYPE = 'form.reset';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
export const FORM_DEFAULT_CHANGE_ACTION_TYPE = 'form.default.change';
export const FORM_CLEAR_ACTION_TYPE = 'form.clear';
export const FORM_ACTIVE_VALUE_ACTION_TYPE = 'form.active.value';
export const FORM_DEACTIVATED_VALUE_ACTION_TYPE = 'form.deactivated.value';
