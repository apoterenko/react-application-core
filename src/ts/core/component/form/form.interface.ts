import { IKeyValue, INotificationAttributes } from 'core/definition.interface';
import {
  IBaseComponent,
  IBaseContainer,
  IBaseContainerInternalProps,
  IBaseContainerInternalState,
} from 'core/component';

export interface IFormEntity extends IKeyValue {
  id?: number | string;
}

export interface IFormEntityAttributes<TEntity extends IFormEntity> {
  changes: IKeyValue;
  entity?: TEntity;
}

export interface IFormStateAttributes {
  valid?: boolean;
  validationErrors?: string[];
  dirty?: boolean;
  progress?: boolean;
}

export interface IFormAttributes<TEntity extends IFormEntity>
    extends IFormEntityAttributes<TEntity>, INotificationAttributes, IFormStateAttributes {
}

export interface IFormPayload<TEntity extends IFormEntity> extends IFormEntityAttributes<TEntity> {
}

export interface IFormContainerInternalProps<TEntity extends IFormEntity>
    extends IBaseContainerInternalProps, IFormAttributes<TEntity> {
  validateForm?(entity: IKeyValue): string[];
  extraProps?: IKeyValue;
}

export interface IFormContainerState<TEntity extends IFormEntity>
    extends IFormAttributes<TEntity> {
}

export const INITIAL_FORM_STATE: IFormContainerState<any> = {
  changes: {}
};

export interface IFormContainer<TEntity extends IFormEntity,
                                TInternalProps extends IFormContainerInternalProps<TEntity>,
                                TInternalState extends IBaseContainerInternalState>
    extends IBaseContainer<TInternalProps, TInternalState> {
}

export interface IForm<TInternalProps extends IFormInternalProps, TInternalState>
    extends IBaseComponent<TInternalProps, TInternalState> {
  checkValidity(): void;
}

export interface IFormInternalProps extends IFormStateAttributes, INotificationAttributes {
  className?: string;
  onSubmit?: Function;
  onChange?: Function;
  onValid?: Function;
  actionText?: string;
}

export const FORM_RESTORE_ACTION_TYPE = 'form.restore';
export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = 'form.submit.done';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
export const FORM_VALIDATION_ERRORS_ACTION_TYPE = 'form.validation.errors';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
export const FORM_SUBMIT_ERROR_ACTION_TYPE = 'form.submit.error';
export const FORM_INFO_ACTION_TYPE = 'form.info';
export const FORM_CREATED_ENTITY_ID = -1;
