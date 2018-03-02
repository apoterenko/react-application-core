import { PureComponent } from 'react';
import { EffectsActionBuilder } from 'redux-effects-promise';

import { IApiEntity, IApiEntityWrapper } from '../../api';
import {
  AnyT,
  IOnLoadDictionaryWrapper,
  IFormEntity,
  IStylizable,
  ISaveable,
  IKeyValue,
  IEntity,
  IEntityWrapper,
  ISubmittable,
  IReadonlyable,
  IDisabledWrapper,
  IOnEmptyDictionaryWrapper,
  IFormWrapper,
} from '../../definition.interface';
import {
  IBaseComponent,
  IBaseComponentInternalProps,
  IBaseContainer,
  IBaseContainerInternalProps,
} from '../base';

export interface IFormAttributes<TChanges extends IKeyValue> extends IFormEntity<TChanges>,
                                                                     ISaveable {
}

export interface IFormOptions extends IStylizable,
                                      IDisabledWrapper,
                                      IReadonlyable {
  actionText?: string;
  actionIcon?: string;
  resetText?: string;
  resetButton?: boolean;
  noActions?: boolean;
}

export interface IFormProps<TEntity extends IEntity> extends IEntityWrapper<TEntity>,
                                                             IFormWrapper<IFormAttributes<TEntity>> {
  formOptions?: IFormOptions;
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

export interface IBaseForm extends IApiEntityWrapper<IEntity>,
                                   ISubmittable {
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
