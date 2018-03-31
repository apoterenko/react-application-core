import { PureComponent } from 'react';
import { EffectsActionBuilder } from 'redux-effects-promise';

import {
  IOnLoadDictionaryWrapper,
  IEntity,
  IOnEmptyDictionaryWrapper,
  IDefaultSubmitWrapper,
  IFieldValueOnChangeWrapper,
} from '../../definitions.interface';
import {
  IBaseComponent,
  IBaseComponentInternalProps,
  IBaseContainer,
  IBaseContainerInternalProps,
} from '../base';
import { IFormWrapperEntity, IApiEntity, IDefaultFormEntity } from '../../entities-definitions.interface';
import { IFormConfigurationWrapper, IFormConfiguration } from '../../configurations-definitions.interface';

export interface IFormInternalProps extends IBaseComponentInternalProps,
                                            IFormConfiguration,
                                            IFormWrapperEntity<IEntity>,
                                            IFieldValueOnChangeWrapper,
                                            IOnEmptyDictionaryWrapper,
                                            IOnLoadDictionaryWrapper {
  onSubmit?: (apiEntity: IApiEntity<IEntity>) => void;
  onReset?: () => void;
  onValid?: (valid: boolean) => void;
}

export interface IFormContainerInternalProps<TEntity extends IEntity> extends IBaseContainerInternalProps,
                                                                              IFormConfigurationWrapper,
                                                                              IFormWrapperEntity<TEntity> {
}

export interface IDefaultFormContainerInternalProps extends IFormContainerInternalProps<IEntity> {
}

export interface IForm extends IBaseComponent<IFormInternalProps, {}>,
                               IDefaultSubmitWrapper {
}

export interface IFormContainer extends IBaseContainer<IDefaultFormContainerInternalProps, {}>,
                                        IDefaultSubmitWrapper {
}

export interface IFormPureComponent extends PureComponent<{}, {}> {
  checkValidity(): boolean;
}

export const INITIAL_APPLICATION_FORM_STATE: IDefaultFormEntity = {
  changes: {},
};

export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType('form.submit');
export const FORM_SUBMIT_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType('form.submit');
export const FORM_SUBMIT_FINISHED_ACTION_TYPE = 'form.submit.finished';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
export const FORM_RESET_ACTION_TYPE = 'form.reset';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
