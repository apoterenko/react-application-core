import * as React from 'react';

import { IApiPayload } from 'core/api';
import { Operation } from 'core/operation';
import { AnyT, EntityIdT } from 'core/definition.interface';
import { BaseContainer } from 'core/component/base';
import { Form, IFormContainerInternalProps } from 'core/component/form';

import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_CREATED_ENTITY_ID,
  FORM_DESTROY_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  IFormPayload,
} from './form.interface';

export class FormContainer extends BaseContainer<IFormContainerInternalProps, {}> {

  constructor(props: IFormContainerInternalProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public componentWillUnmount(): void {
    this.dispatch(FORM_DESTROY_ACTION_TYPE);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <Form onChange={this.onChange}
              onSubmit={this.onSubmit}
              onValid={this.onValid}
              {...props}>
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
    const { changes } = props.form;

    this.dispatch(FORM_SUBMIT_ACTION_TYPE, {
      id: this.formEntityId,
      data: { changes, entity } as IFormPayload,
      operation: Operation.create(FORM_SUBMIT_ACTION_TYPE),
    } as IApiPayload<IFormPayload>);
  }

  private get formEntityId(): EntityIdT {
    return this.props.entity && this.props.entity.id || FORM_CREATED_ENTITY_ID;
  }
}
