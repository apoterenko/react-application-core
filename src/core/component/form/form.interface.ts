import { EffectsActionBuilder } from 'redux-effects-promise';

import { IEntity, IDefaultSubmitWrapper } from '../../definitions.interface';
import {
  IBaseFormWrapperEntity,
  IFormWrapperEntity,
  IDefaultApiEntity,
  IComponent,
  IContainer,
  IEditableEntity,
} from '../../entities-definitions.interface';
import { IFormConfigurationWrapper, IFormConfiguration } from '../../configurations-definitions.interface';
import { ISubmitWrapper, IApiEntityWrapper } from '../../definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';

/* @stable - 10.04.2018 */
export interface IFormInternalProps extends IFormConfiguration,
                                            IFormWrapperEntity {
}

/* @stable - 01.04.2018 */
export interface IFormContainerInternalProps<TEntity extends IEntity> extends IContainerProps,
                                                                              IFormConfigurationWrapper,
                                                                              IBaseFormWrapperEntity<TEntity> {
}

/* @stable - 01.04.2018 */
export interface IDefaultFormContainerInternalProps extends IFormContainerInternalProps<IEntity> {
}

/* @stable - 11.04.2018 */
export interface IForm extends IComponent<IFormInternalProps, {}>,
                               IApiEntityWrapper<IDefaultApiEntity>,
                               ISubmitWrapper<(apiEntity: IDefaultApiEntity) => void> {
}

/* @stable - 01.04.2018 */
export interface IFormContainer extends IContainer<IDefaultFormContainerInternalProps, {}>,
                                        IDefaultSubmitWrapper {
}

/**
 * @stable [29.05.2018]
 */
export const INITIAL_APPLICATION_FORM_STATE: IEditableEntity = {
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
