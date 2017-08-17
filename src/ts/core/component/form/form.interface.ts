import { IKeyValue } from '../../definition.interface';
import {
  IBaseContainer,
  IBaseContainerInternalProps,
  IBaseContainerInternalState
} from '../base/base.interface';
import { IApiIdentifiedEntity } from '../../api/api.interface';

export interface IFormEntity extends IApiIdentifiedEntity, IKeyValue {
}

export interface IFormAttributes<TEntity extends IFormEntity> {
  changes?: TEntity;
  entity?: TEntity;
  valid?: boolean;
  dirty?: boolean;
  progress?: boolean;
  error?: string;
  message?: string;
}

export interface IFormContainerInternalProps<TEntity extends IFormEntity>
    extends IBaseContainerInternalProps, IFormAttributes<TEntity> {
}

export interface IFormContainerState<TEntity extends IFormEntity> extends IFormAttributes<TEntity> {
}

export interface IFormContainer<TEntity extends IFormEntity,
                                TInternalProps extends IFormContainerInternalProps<TEntity>,
                                TInternalState extends IBaseContainerInternalState>
    extends IBaseContainer<TInternalProps, TInternalState> {
  dispatchFormEvent(actionType: string): void;
}

export const FORM_RESTORE_ACTION_TYPE = 'form.restore';
export const FORM_DESTROY_ACTION_TYPE = 'form.destroy';
export const FORM_SUBMIT_ACTION_TYPE = 'form.submit';
export const FORM_SUBMIT_DONE_ACTION_TYPE = 'form.submit.done';
export const FORM_VALID_ACTION_TYPE = 'form.valid';
export const FORM_CHANGE_ACTION_TYPE = 'form.change';
export const FORM_CLEAR_ERROR_ACTION_TYPE = 'form.clear.error';
export const FORM_SUBMIT_ERROR_ACTION_TYPE = 'form.submit.error';
export const FORM_MESSAGE_ACTION_TYPE = 'form.message';
export const FORM_CLEAR_MESSAGE_ACTION_TYPE = 'form.clear.message';
export const FORM_CREATED_ENTITY_ID = -1;
