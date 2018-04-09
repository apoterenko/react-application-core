import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../definitions.interface';
import { BaseContainer } from '../base';
import { Form } from '../form';
import { IDefaultApiEntity, IFieldChangeEntity } from '../../entities-definitions.interface';
import {
  IForm,
  IFormContainer,
  IDefaultFormContainerInternalProps,
} from './form.interface';
import {
  FORM_CHANGE_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
} from './form-reducer.interface';

export class FormContainer extends BaseContainer<IDefaultFormContainerInternalProps, {}>
    implements IFormContainer {

  constructor(props: IDefaultFormContainerInternalProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onEmptyDictionary = this.onEmptyDictionary.bind(this);
    this.onLoadDictionary = this.onLoadDictionary.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <Form ref='form'
              form={props.form}
              entity={props.entity}
              originalEntity={props.originalEntity}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onReset={this.onReset}
              onValid={this.onValid}
              onEmptyDictionary={this.onEmptyDictionary}
              onLoadDictionary={this.onLoadDictionary}
              {...props.formConfiguration}>
          {props.children}
        </Form>
    );
  }

  public submit(): void {
    this.form.submit();
  }

  /**
   * @stable - 09.04.2018
   * @param {IFieldChangeEntity} payload
   */
  private onChange(payload: IFieldChangeEntity): void {
    if (payload.name) {
      this.dispatch(FORM_CHANGE_ACTION_TYPE, payload);
    }
  }

  private onValid(valid: boolean): void {
    this.dispatch(FORM_VALID_ACTION_TYPE, { valid });
  }

  private onReset(): void {
    this.dispatch(FORM_RESET_ACTION_TYPE);
  }

  private onSubmit(apiEntity: IDefaultApiEntity): void {
    this.dispatch(FORM_SUBMIT_ACTION_TYPE, apiEntity);
  }

  private onEmptyDictionary(dictionary: string): void {
    this.dispatchLoadDictionary(dictionary);
  }

  private onLoadDictionary(items: AnyT): void {
    const noAvailableItemsToSelect = this.settings.messages.noAvailableItemsToSelectMessage;
    if (noAvailableItemsToSelect && R.isEmpty(items)) {
      this.dispatchNotification(noAvailableItemsToSelect);
    }
  }

  private get form(): IForm {
    return this.refs.form as IForm;
  }
}
