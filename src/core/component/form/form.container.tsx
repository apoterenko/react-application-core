import * as React from 'react';
import * as ramda from 'ramda';

import { IApiPayload } from 'core/api';
import { Operation } from 'core/operation';
import { IApplicationPermissionState } from 'core/permission';
import { IApplicationState } from 'core/store';
import { AnyT } from 'core/definition.interface';
import { BaseContainer } from 'core/component/base';
import { Form, IFormContainerInternalProps } from 'core/component/form';

import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_CREATED_ENTITY_ID,
  FORM_DESTROY_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_VALIDATION_ERRORS_ACTION_TYPE,
  IFormEntity,
  IFormPayload,
} from './form.interface';

export class FormContainer<TAppState extends IApplicationState<TPermissionState, TPermissions>,
                           TPermissionState extends IApplicationPermissionState<TPermissions>,
                           TPermissions>
    extends BaseContainer<TAppState,
                          IFormContainerInternalProps<IFormEntity>,
                          {},
                          TPermissionState,
                          TPermissions> {

  constructor(props: IFormContainerInternalProps<IFormEntity>) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentWillReceiveProps(nextProps: Readonly<IFormContainerInternalProps<IFormEntity>>, nextContext: AnyT): void {
    const props = this.props;
    if (props.validateForm && !ramda.equals(nextProps.attributes.changes, props.attributes.changes)) {
      // TODO Complex validation
      this.dispatch(FORM_VALIDATION_ERRORS_ACTION_TYPE, {
        validationErrors: props.validateForm({...props.entity, ...nextProps.attributes.changes}),
      });
    }
  }

  public componentWillUnmount(): void {
    this.dispatch(FORM_DESTROY_ACTION_TYPE);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <Form settings={props.settings}
              attributes={props.attributes}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onValid={this.onValid}>
          {props.children}
        </Form>
    );
  }

  private onChange(name: string, value: AnyT): void {
    if (name) {
      this.dispatchFormChangeEvent(name, value);
    }
  }

  private dispatchFormChangeEvent(field: string, value: AnyT): void {
    this.dispatch(FORM_CHANGE_ACTION_TYPE, { field, value });
  }

  private onValid(valid: boolean): void {
    this.dispatch(FORM_VALID_ACTION_TYPE, { valid });
  }

  private onSubmit(): void {
    const { props } = this;
    const { entity } = props;
    const { changes } = props.attributes;

    this.dispatch(FORM_SUBMIT_ACTION_TYPE, {
      id: this.formEntityId,
      data: { changes, entity } as IFormPayload,
      operation: Operation.create(FORM_SUBMIT_ACTION_TYPE),
    } as IApiPayload<IFormPayload>);
  }

  private get formEntityId(): number | string {
    return this.props.entity && this.props.entity.id || FORM_CREATED_ENTITY_ID;
  }
}
