import { EffectsActionBuilder } from 'redux-effects-promise';

import {
  IApiEntityWrapper,
  ISubmitWrapper,
} from '../../definitions.interface';
import {
  IComponent,
  IContainer,
} from '../../entities-definitions.interface';
import {
  IApiEntity,
  IFormProps,
  IFormContainerProps,
} from '../../definition';

/* @stable - 11.04.2018 */
export interface IForm extends IComponent<IFormProps, {}>,
                               IApiEntityWrapper<IApiEntity>,
                               ISubmitWrapper<IApiEntity> {
  isFormValid?(): boolean; // TODO
}

/* @stable - 01.04.2018 */
export interface IFormContainer extends IContainer<IFormContainerProps>,
                                        ISubmitWrapper {
}

export const FORM_REF = 'form';
export const FORM_PROGRESS_ACTION_TYPE = 'form.progress';
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_FINISHED_ACTION_TYPE = `${FORM_SUBMIT_ACTION_TYPE}.finished`;
export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
export const FORM_RESET_ACTION_TYPE = 'form.reset';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
export const FORM_CLEAR_ACTION_TYPE = 'form.clear';
export const FORM_ACTIVE_VALUE_ACTION_TYPE = 'form.active.value';
export const FORM_DEACTIVATED_VALUE_ACTION_TYPE = 'form.deactivated.value';
