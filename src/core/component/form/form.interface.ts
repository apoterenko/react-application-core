import { EffectsActionBuilder } from 'redux-effects-promise';

import { IEntity, ISubmitWrapper, IApiEntityWrapper } from '../../definitions.interface';
import {
  IBasicFormWrapperEntity,
  IFormWrapperEntity,
  IApiEntity,
  IComponent,
  IContainer,
  IEditableEntity,
  IContainerEntity,
} from '../../entities-definitions.interface';
import {
  IFormConfigurationWrapper,
  IFormConfiguration,
  IContainerConfiguration,
} from '../../configurations-definitions.interface';

/**
 * @stable [29.05.2018]
 */
export interface IFormProps extends IFormConfiguration,
                                    IFormWrapperEntity {
}

/**
 * @stable [29.05.2018]
 */
export interface IFormContainerEntity<TEntity extends IEntity> extends IContainerEntity,
                                                                       IBasicFormWrapperEntity<TEntity> {
}

/**
 * @stable [29.05.2018]
 */
export interface IFormContainerConfiguration extends IContainerConfiguration,
                                                     IFormConfigurationWrapper {
}

/**
 * @stable [29.05.2018]
 */
export interface IFormContainerProps<TEntity extends IEntity = IEntity> extends IFormContainerEntity<TEntity>,
                                                                                IFormContainerConfiguration {
}

/* @stable - 11.04.2018 */
export interface IForm extends IComponent<IFormProps, {}>,
                               IApiEntityWrapper<IApiEntity>,
                               ISubmitWrapper<IApiEntity> {
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
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(FORM_SUBMIT_ACTION_TYPE);
export const FORM_SUBMIT_FINISHED_ACTION_TYPE = `${FORM_SUBMIT_ACTION_TYPE}.finished`;
export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
export const FORM_RESET_ACTION_TYPE = 'form.reset';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
