import { PureComponent } from 'react';

import { FunctionT } from '../../util';
import {
  AnyT,
  ILockable,
  IChangeable,
  IProgressable,
  IStylizable,
  ISaveable,
  IKeyValue,
  IEntity,
} from '../../definition.interface';
import { IBaseComponentInternalProps, IBaseContainerInternalProps } from '../../component/base';

export interface IFormAttributes<TChanges extends IKeyValue> extends IChangeable<TChanges>,
                                                                     ILockable,
                                                                     IProgressable,
                                                                     ISaveable {
  valid?: boolean;
  dirty?: boolean;
  error?: string;
}

export interface IFormOptions extends IStylizable {
  actionText?: string;
  resetText?: string;
  resetButton?: boolean;
}

export interface IFormProps<TEntity extends IEntity> {
  form: IFormAttributes<TEntity>;
  entity?: TEntity;
  formOptions?: IFormOptions;
}

export interface IFormInternalProps<TEntity extends IEntity> extends IBaseComponentInternalProps,
                                                                     IFormProps<TEntity> {
  onSubmit?: FunctionT;
  onReset?: FunctionT;
  onValid?: FunctionT;
  onChange?(name: string, value: AnyT): void;
}

export interface IFormContainerInternalProps<TEntity extends IEntity> extends IBaseContainerInternalProps,
                                                                              IFormProps<TEntity> {
}

export interface IFormPureComponent extends PureComponent<{}, {}> {
  checkValidity(): void;
}

export interface IApplicationFormState extends IFormAttributes<IEntity> {
}

export const INITIAL_APPLICATION_FORM_STATE: IApplicationFormState = {
  changes: {},
};

export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_LOCK_ACTION_TYPE = 'form.lock';
export const FORM_SUBMIT_DONE_ACTION_TYPE = 'form.submit.done';
export const FORM_SUBMIT_ERROR_ACTION_TYPE = 'form.submit.error';
export const FORM_SUBMIT_FINISHED_ACTION_TYPE = 'form.submit.finished';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
export const FORM_RESET_ACTION_TYPE = 'form.reset';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
export const FORM_CHANGES_ACTION_TYPE = 'form.changes';
