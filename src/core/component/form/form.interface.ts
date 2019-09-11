import { EffectsActionBuilder } from 'redux-effects-promise';

import { IEntity, ISubmitWrapper, IApiEntityWrapper } from '../../definitions.interface';
import {
  IBasicFormWrapperEntity,
  IFormWrapperEntity,
  IComponent,
  IContainer,
} from '../../entities-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';
import { IFormConfigurationEntity } from '../../configurations-definitions.interface';
import { IFormConfigurationWrapperEntity, IApiEntity, IEditableEntity } from '../../definition';

/**
 * @stable [29.05.2018]
 */
export interface IFormProps extends IFormConfigurationEntity,
                                    IFormWrapperEntity {
}

/**
 * @stable [29.05.2018]
 */
export interface IFormContainerProps<TEntity = IEntity>
  extends IContainerProps,
          IBasicFormWrapperEntity<TEntity>,
          IFormConfigurationWrapperEntity {
}

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

/**
 * @stable [29.05.2018]
 */
export const INITIAL_APPLICATION_FORM_STATE: IEditableEntity = {
  changes: {},
};

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
