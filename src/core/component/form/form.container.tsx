import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../definitions.interface';
import { BaseContainer } from '../base';
import { Form } from '../form';
import { IFieldChangeEntity, IApiEntity } from '../../entities-definitions.interface';
import {
  IForm,
  IFormContainer,
  IFormContainerProps,
  FORM_CHANGE_ACTION_TYPE,
  FORM_SUBMIT_ACTION_TYPE,
  FORM_VALID_ACTION_TYPE,
  FORM_RESET_ACTION_TYPE,
} from './form.interface';

export class FormContainer extends BaseContainer<IFormContainerProps>
    implements IFormContainer {

  constructor(props: IFormContainerProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onBeforeSubmit = this.onBeforeSubmit.bind(this);
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
              onBeforeSubmit={this.onBeforeSubmit}
              onReset={this.onReset}
              onValid={this.onValid}
              onEmptyDictionary={this.onEmptyDictionary}
              onLoadDictionary={this.onLoadDictionary}
              {...props.formConfiguration}>
          {props.children}
        </Form>
    );
  }

  /**
   * @stable - 11.04.2018
   */
  public submit(): void {
    this.form.submit(this.form.apiEntity);
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

  private onSubmit(apiEntity: IApiEntity): void {
    this.dispatch(FORM_SUBMIT_ACTION_TYPE, apiEntity);
  }

  /**
   * @stable - 11.04.2018
   * @param {IApiEntity} apiEntity
   * @returns {boolean}
   */
  private onBeforeSubmit(apiEntity: IApiEntity): boolean {
    const props = this.props;
    return props.onBeforeSubmit && props.onBeforeSubmit(apiEntity);
  }

  /**
   * @stable [04.08.2018]
   * @param {string} dictionary
   * @param {IApiEntity} apiEntity
   */
  private onEmptyDictionary(dictionary: string, apiEntity: IApiEntity): void {
    this.dispatchLoadDictionary(dictionary, apiEntity);
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
