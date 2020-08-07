import * as React from 'react';

import { IKeyValue } from '../../definitions.interface';
import { GenericContainer } from '../base/generic.container';
import { Form } from '../form/form.component';
import {
  IApiEntity,
  IFormContainerProps,
  IFormProps,
} from '../../definition';
import {
  ConditionUtils,
  Mappers,
} from '../../util';

/**
 * @component-container-impl
 * @stable [01.08.2020]
 *
 * Please use the "Mappers.formContainerProps"
 */
export class FormContainer extends GenericContainer<IFormContainerProps> {

  /**
   * @stable [01.08.2020]
   * @param originalProps
   */
  constructor(originalProps: IFormContainerProps) {
    super(originalProps);

    this.onChange = this.onChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onValid = this.onValid.bind(this);
  }

  /**
   * @stable [01.08.2020]
   */
  public render(): JSX.Element {
    return (
      <Form
        {...Mappers.formContainerPropsAsFormProps(this.originalProps)}
        onChange={this.onChange}
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        onValid={this.onValid}
      >
        {this.originalChildren}
      </Form>
    );
  }

  /**
   * @stable [01.08.2020]
   * @param payload
   */
  private onChange(payload: IKeyValue): void {
    this.formStoreProxy.dispatchFormChanges(payload);
    ConditionUtils.ifNotNilThanValue(this.formConfiguration.onChange, (onChange) => onChange(payload));
  }

  /**
   * @stable [01.08.2020]
   * @param valid
   */
  private onValid(valid: boolean): void {
    this.formStoreProxy.dispatchFormValid(valid);
    ConditionUtils.ifNotNilThanValue(this.formConfiguration.onValid, (onValid) => onValid(valid));
  }

  /**
   * @stable [01.08.2020]
   */
  private onReset(): void {
    this.formStoreProxy.dispatchFormReset();
    ConditionUtils.ifNotNilThanValue(this.formConfiguration.onReset, (onReset) => onReset());
  }

  /**
   * @stable [01.08.2020]
   * @param apiEntity
   */
  private onSubmit(apiEntity: IApiEntity): void {
    this.formStoreProxy.dispatchFormSubmit(apiEntity);
    ConditionUtils.ifNotNilThanValue(this.formConfiguration.onSubmit, (onSubmit) => onSubmit(apiEntity));
  }

  /**
   * @stable [01.08.2020]
   */
  private get formConfiguration(): IFormProps {
    return this.originalProps.formConfiguration || {};
  }
}
