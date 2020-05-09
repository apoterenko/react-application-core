import * as React from 'react';
import * as R from 'ramda';

import { IKeyValue } from '../../definitions.interface';
import { GenericContainer } from '../base';
import { Form } from '../form';
import {
  IApiEntity,
  IFormContainerProps,
  IFormProps,
} from '../../definition';
import {
  ifNotNilThanValue,
  Mappers,
} from '../../util';

/**
 * @component-container-impl
 * @stable [09.05.2020]
 *
 * Please use the "Mappers.formContainerProps"
 */
export class FormContainer extends GenericContainer<IFormContainerProps> {

  /**
   * @stable [09.05.2020]
   * @param {IFormContainerProps} props
   */
  constructor(props: IFormContainerProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onDictionaryEmpty = this.onDictionaryEmpty.bind(this);
    this.onDictionaryLoad = this.onDictionaryLoad.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onValid = this.onValid.bind(this);
  }

  /**
   * @stable [09.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <Form
        {...Mappers.formContainerPropsAsFormProps(props)}
        onChange={this.onChange}
        onDictionaryEmpty={this.onDictionaryEmpty}
        onDictionaryLoad={this.onDictionaryLoad}
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        onValid={this.onValid}
      >
        {props.children}
      </Form>
    );
  }

  /**
   * @stable [23.04.2020]
   * @param {IKeyValue} payload
   */
  private onChange(payload: IKeyValue): void {
    this.formStoreProxy.dispatchFormChanges(payload);
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

  /**
   * @stable [09.05.2020]
   * @param {string} dictionary
   * @param {IApiEntity} apiEntity
   */
  private onDictionaryEmpty(dictionary: string, apiEntity: IApiEntity): void {
    this.dictionaryStoreProxy.dispatchLoadDictionary(dictionary, apiEntity);
  }

  /**
   * @stable [09.05.2020]
   * @param {{}} items
   */
  private onDictionaryLoad(items: {}): void {
    const noAvailableItemsToSelect = this.settings.messages.NO_AVAILABLE_ITEMS_TO_SELECT;

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
