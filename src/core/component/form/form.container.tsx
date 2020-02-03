import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../definitions.interface';
import { BasicContainer } from '../base';
import { Form } from '../form';
import {
  IApiEntity,
  IFieldChangeEntity,
  IForm,
  IFormContainer,
  IFormContainerProps,
} from '../../definition';
import {
  FORM_SUBMIT_ACTION_TYPE,
} from './form.interface';
import { isFn } from '../../util';

export class FormContainer extends BasicContainer<IFormContainerProps>
    implements IFormContainer {

  /**
   * @stable [03.02.2020]
   * @param {IFormContainerProps} props
   */
  constructor(props: IFormContainerProps) {
    super(props);

    this.onBeforeSubmit = this.onBeforeSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEmptyDictionary = this.onEmptyDictionary.bind(this);
    this.onLoadDictionary = this.onLoadDictionary.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onValid = this.onValid.bind(this);
  }

  /**
   * @stable [03.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <Form
        ref={this.selfRef}
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
        {...props.formConfiguration}
      >
        {props.children}
      </Form>
    );
  }

  /**
   * @stable [27.09.2019]
   */
  public submit(): void {
    this.form.submit(this.form.apiEntity);
  }

  /**
   * @stable [17.02.2019]
   * @param {IFieldChangeEntity} payload
   */
  private onChange(payload: IFieldChangeEntity): void {
    if (payload.name) {
      this.formStoreProxy.dispatchFormChange(payload);
    }
  }

  /**
   * @stable [03.02.2020]
   * @param {boolean} valid
   */
  private onValid(valid: boolean): void {
    this.formStoreProxy.dispatchFormValid(valid);
  }

  /**
   * @stable [03.02.2020]
   */
  private onReset(): void {
    this.formStoreProxy.dispatchFormReset();
  }

  /**
   * @stable [02.04.2019]
   * @param {IApiEntity} apiEntity
   */
  private onSubmit(apiEntity: IApiEntity): void {
    this.dispatchFrameworkAction(FORM_SUBMIT_ACTION_TYPE, apiEntity);
  }

  /**
   * @stable [03.02.2020]
   * @param {IApiEntity} apiEntity
   * @returns {boolean}
   */
  private onBeforeSubmit(apiEntity: IApiEntity): boolean {
    const {onBeforeSubmit} = this.props;
    return !isFn(onBeforeSubmit) || onBeforeSubmit(apiEntity);
  }

  private onEmptyDictionary(dictionary: string, apiEntity: IApiEntity): void {
    this.dispatchLoadDictionary(dictionary, apiEntity);
  }

  private onLoadDictionary(items: AnyT): void {
    const noAvailableItemsToSelect = this.settings.messages.noAvailableItemsToSelectMessage;
    if (noAvailableItemsToSelect && R.isEmpty(items)) {
      this.dispatchNotification(noAvailableItemsToSelect);
    }
  }

  /**
   * @stable [27.09.2019]
   * @returns {IForm}
   */
  private get form(): IForm {
    return this.selfRef.current;
  }
}
