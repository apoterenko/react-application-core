import * as React from 'react';

import { IApiEntity, ApiEntityT } from '../../api';
import { AnyT } from '../../definition.interface';
import { BaseContainer } from '../../component/base';
import { Form } from '../../component/form';

import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_DESTROY_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
  IForm,
  IFormContainer,
  FormContainerInternalPropsT,
} from './form.interface';

export class FormContainer extends BaseContainer<FormContainerInternalPropsT, {}>
    implements IFormContainer {

  constructor(props: FormContainerInternalPropsT) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  public componentWillUnmount(): void {
    this.dispatch(FORM_DESTROY_ACTION_TYPE);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <Form ref='form'
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onReset={this.onReset}
              onValid={this.onValid}
              {...props}>
          {props.children}
        </Form>
    );
  }

  public submit(): void {
    this.form.submit();
  }

  public get apiEntity(): ApiEntityT {
    return this.form.apiEntity;
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

  private onReset(): void {
    this.dispatch(FORM_RESET_ACTION_TYPE);
  }

  private onSubmit(apiEntity: ApiEntityT): void {
    this.dispatch(FORM_SUBMIT_ACTION_TYPE, apiEntity);
  }

  private get form(): IForm {
    return this.refs.form as IForm;
  }
}
