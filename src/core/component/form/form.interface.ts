import { PureComponent } from 'react';
import { EffectsActionBuilder } from 'redux-effects-promise';

import { IApiEntity } from '../../api';
import {
  AnyT,
  IOnLoadDictionaryWrapper,
  IKeyValue,
  IEntity,
  IOnEmptyDictionaryWrapper,
  IFormWrapper,
  IApiEntityWrapper,
  IDefaultSubmitWrapper,
} from '../../definition.interface';
import {
  IBaseComponent,
  IBaseComponentInternalProps,
  IBaseContainer,
  IBaseContainerInternalProps,
} from '../base';
import { IFormEntity, IEntityWrapperEntity } from '../../entities-definitions.interface';
import { IFormConfigurationWrapper } from '../../configurations-definitions.interface';

export interface IFormAttributes<TChanges extends IKeyValue> extends IFormEntity<TChanges> {
}

export interface IFormProps<TEntity extends IEntity> extends IEntityWrapperEntity<TEntity>,
                                                             IFormConfigurationWrapper,
                                                             IFormWrapper<IFormAttributes<TEntity>> {
  onBeforeSubmit?(apiEntity: IApiEntity<TEntity>): void;
}

export interface IFormInternalProps<TEntity extends IEntity> extends IBaseComponentInternalProps,
                                                                     IOnEmptyDictionaryWrapper,
                                                                     IOnLoadDictionaryWrapper,
                                                                     IFormProps<TEntity> {
  onSubmit?: (apiEntity: IApiEntity<TEntity>) => void;
  onReset?: () => void;
  onValid?: (valid: boolean) => void;
  onChange?(name: string, value: AnyT): void;
}

export type FormInternalPropsT = IFormInternalProps<IEntity>;
export type FormContainerInternalPropsT = IFormContainerInternalProps<IEntity>;

export interface IFormContainerInternalProps<TEntity extends IEntity> extends IBaseContainerInternalProps,
                                                                              IFormProps<TEntity> {
}

export interface IBaseForm extends IApiEntityWrapper<IApiEntity<IEntity>>,
                                   IDefaultSubmitWrapper {
}

export interface IForm extends IBaseComponent<FormInternalPropsT, {}>,
                               IBaseForm {
}

export interface IFormContainer extends IBaseContainer<FormContainerInternalPropsT, {}>,
                                        IBaseForm {
}

export interface IFormPureComponent extends PureComponent<{}, {}> {
  checkValidity(): boolean;
}

export interface IApplicationFormState extends IFormAttributes<IEntity> {
}

export const INITIAL_APPLICATION_FORM_STATE: IApplicationFormState = {
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
