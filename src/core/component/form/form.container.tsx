import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../definitions.interface';
import { GenericContainer } from '../base';
import { Form } from '../form';
import {
  FieldChangeEntityT,
  IApiEntity,
  IFormContainerProps,
  IFormProps,
} from '../../definition';
import {
  ifNotNilThanValue,
  mapFormProps,
} from '../../util';

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
   * @stable [18.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <Form
        {...mapFormProps(props)}
        {...this.formConfiguration}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onReset={this.onReset}
        onValid={this.onValid}
        onEmptyDictionary={this.onEmptyDictionary}
        onLoadDictionary={this.onLoadDictionary}
      >
        {props.children}
      </Form>
    );
  }

  /**
   * @stable [18.04.2020]
   * @param {FieldChangeEntityT} payload
   */
  private onChange(payload: FieldChangeEntityT): void {
    this.formStoreProxy.dispatchFormChange(payload);
    ifNotNilThanValue(this.formConfiguration.onChange, (onChange) => onChange(payload));
  }

  /**
   * @stable [18.04.2020]
   * @param {boolean} valid
   */
  private onValid(valid: boolean): void {
    this.formStoreProxy.dispatchFormValid(valid);
    ifNotNilThanValue(this.formConfiguration.onValid, (onValid) => onValid(valid));
  }

  /**
   * @stable [18.04.2020]
   */
  private onReset(): void {
    this.formStoreProxy.dispatchFormReset();
    ifNotNilThanValue(this.formConfiguration.onReset, (onReset) => onReset());
  }

  /**
   * @stable [15.04.2020]
   * @param {IApiEntity} apiEntity
   */
  private onSubmit(apiEntity: IApiEntity): void {
    this.formStoreProxy.dispatchFormSubmit(apiEntity);
    ifNotNilThanValue(this.formConfiguration.onSubmit, (onSubmit) => onSubmit(apiEntity));
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

  /**
   * @stable [18.04.2020]
   * @returns {IFormProps}
   */
  private get formConfiguration(): IFormProps {
    return this.props.formConfiguration || {};
  }
}
