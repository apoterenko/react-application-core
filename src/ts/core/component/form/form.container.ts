import * as ramda from 'ramda';

import { IApiRequest } from 'core/api';
import { Operation } from 'core/operation';
import { IApplicationPermissionState } from 'core/permission';
import { IApplicationState } from 'core/store';
import { AnyT } from 'core/definition.interface';
import { BaseContainer, IBaseContainerInternalState } from 'core/component/base';

import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_CREATED_ENTITY_ID,
  FORM_DESTROY_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_VALIDATION_ERRORS_ACTION_TYPE,
  IFormContainer,
  IFormContainerInternalProps,
  IFormEntity,
  IFormPayload,
} from './form.interface';

export class FormContainer<TContainer extends IFormContainer<TEntity, TInternalProps, TInternalState>,
                           TAppState extends IApplicationState<TPermissionState, TPermissions>,
                           TEntity extends IFormEntity,
                           TInternalProps extends IFormContainerInternalProps<TEntity>,
                           TInternalState extends IBaseContainerInternalState,
                           TPermissionState extends IApplicationPermissionState<TPermissions>,
                           TPermissions>
    extends BaseContainer<TContainer,
                          TAppState,
                          TInternalProps,
                          TInternalState,
                          TPermissionState,
                          TPermissions>
    implements IFormContainer<TEntity, TInternalProps, TInternalState> {

  constructor(props: TInternalProps, sectionName: string) {
    super(props, sectionName);

    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: any): void {
    const props = this.props;
    if (props.validateForm && !ramda.equals(nextProps.changes, props.changes)) {
      // TODO Complex validation
      this.dispatch(FORM_VALIDATION_ERRORS_ACTION_TYPE, {
        validationErrors: props.validateForm(Object.assign({}, props.entity, nextProps.changes)),
      });
    }
  }

  public componentWillUnmount(): void {
    this.dispatch(FORM_DESTROY_ACTION_TYPE);
  }

  protected onChange(name: string, value: AnyT): void {
    if (name) {
      this.dispatchFormChangeEvent(name, value);
    }
  }

  protected dispatchFormChangeEvent(field: string, value: any): void {
    this.dispatch(FORM_CHANGE_ACTION_TYPE, { field, value });
  }

  protected onValid(valid: boolean): void {
    this.dispatch(FORM_VALID_ACTION_TYPE, { valid });
  }

  protected onSubmit(): void {
    const props = this.props;
    this.dispatch(FORM_SUBMIT_ACTION_TYPE, {
      id: this.formEntityId,
      data: { changes: props.changes, entity: props.entity } as IFormPayload<TEntity>,
      operation: Operation.create(FORM_SUBMIT_ACTION_TYPE),
    } as IApiRequest<IFormPayload<TEntity>>);
  }

  protected get formEntityId(): number | string {
    return this.props.entity && this.props.entity.id || FORM_CREATED_ENTITY_ID;
  }
}
