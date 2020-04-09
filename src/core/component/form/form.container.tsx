import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../definitions.interface';
import { GenericContainer } from '../base';
import { Form } from '../form';
import {
  IApiEntity,
  IFieldChangeEntity,
  IFormContainerProps,
} from '../../definition';

export class FormContainer extends GenericContainer<IFormContainerProps> {

  /**
   * @stable [03.02.2020]
   * @param {IFormContainerProps} props
   */
  constructor(props: IFormContainerProps) {
    super(props);

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
        form={props.form}
        entity={props.entity}
        originalEntity={props.originalEntity}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onBeforeSubmit={props.onBeforeSubmit}
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
    this.formStoreProxy.dispatchFormSubmit(apiEntity);
  }

  private onEmptyDictionary(dictionary: string, apiEntity: IApiEntity): void {
    this.dictionaryStoreProxy.dispatchLoadDictionary(dictionary, apiEntity);
  }

  private onLoadDictionary(items: AnyT): void {
    const noAvailableItemsToSelect = this.settings.messages.noAvailableItemsToSelectMessage;
    if (noAvailableItemsToSelect && R.isEmpty(items)) {
      this.notificationStoreProxy.dispatchNotification(noAvailableItemsToSelect);
    }
  }
}
