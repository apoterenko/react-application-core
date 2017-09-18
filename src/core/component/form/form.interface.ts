import { PureComponent } from 'react';

import { FunctionT } from 'core/util';
import { AnyT, IKeyValue } from 'core/definition.interface';
import { IBaseComponentInternalProps, IBaseContainerInternalProps } from 'core/component/base';

export interface IFormChangeable {
  changes: IKeyValue;
}

export interface IFormEntity extends IKeyValue {
  id?: number | string;
}

export interface IFormAttributes extends IFormChangeable {
  valid?: boolean;
  dirty?: boolean;
  progress?: boolean;
}

export interface IFormPayload extends IFormChangeable {
  entity?: IFormEntity;
}

export interface IFormSettings {
  className?: string;
  actionText?: string;
}

export interface IFormProps {
  form?: IFormAttributes;
  settings?: IFormSettings;
}

export interface IFormInternalProps extends IFormProps, IBaseComponentInternalProps {
  onSubmit?: FunctionT;
  onValid?: FunctionT;
  onChange?(name: string, value: AnyT): void;
}

export interface IFormContainerInternalProps<TEntity extends IFormEntity>
    extends IFormProps, IBaseContainerInternalProps {
  entity?: TEntity;
}

export interface IFormPureComponent extends PureComponent<{}, {}> {
  checkValidity(): void;
}

export interface IApplicationFormState extends IFormAttributes {
}

export const INITIAL_APPLICATION_FORM_STATE: IApplicationFormState = {
  changes: {},
};

export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = 'form.submit.done';
export const FORM_SUBMIT_ERROR_ACTION_TYPE = 'form.submit.error';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
export const FORM_CREATED_ENTITY_ID = -1;
