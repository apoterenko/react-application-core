import * as React from 'react';
import * as R from 'ramda';

import {
  IApiEntity,
  IBaseEvent,
  IButtonProps,
  IEditableEntity,
  IForm,
  IFormProps,
  INITIAL_FORM_ENTITY,
} from '../../definition';
import {
  cancelEvent,
  cloneReactNodes,
  defValuesFilter,
  getFormFieldDisplayValue,
  getFormFieldOriginalValue,
  getFormFieldValue,
  ifNotFalseThanValue,
  ifNotNilThanValue,
  isFn,
  isFormEntityValid,
  isFormFieldReadOnly,
  isFormWrapperEntityInProgress,
  isString,
  joinClassName,
  mapApiEntity,
  notNilValuesArrayFilter,
  orNull,
  orUndef,
} from '../../util';
import { AnyT, IEntity } from '../../definitions.interface';
import { BaseComponent } from '../base';
import { Button } from '../button';
import { Field, IField } from '../field';
import { IFieldProps, IFieldsConfigurations } from '../../configurations-definitions.interface';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  isFormFieldChangeable,
  isFormFieldDisabled,
  isFormOfNewEntity,
  isFormResettable,
  isFormSubmittable,
} from './form.support';
import { FlexLayout } from '../layout/flex';

export class Form extends BaseComponent<IFormProps> implements IForm {

  public static defaultProps: IFormProps = {
    form: INITIAL_FORM_ENTITY,
    validateOnMount: true,
  };

  @lazyInject(DI_TYPES.FieldsOptions) private fieldsOptions: IFieldsConfigurations;
  private readonly formRef = React.createRef<HTMLFormElement>();

  /**
   * @stable [29.05.2018]
   * @param {IFormProps} props
   */
  constructor(props: IFormProps) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;

    const nodes = (
      cloneReactNodes<IFieldProps>(
        this,
        (field: IField) => {
          const fieldProps = field.props;
          const predefinedOptions = this.getPredefinedFieldProps(field);

          return defValuesFilter<IFieldProps, IFieldProps>(
            {
              value: this.getFieldValue(field),
              originalValue: this.getFieldOriginalValue(field),
              displayValue: this.getFieldDisplayValue(field, predefinedOptions),
              readOnly: this.isFieldReadOnly(field),
              disabled: this.isFieldDisabled(field),
              changeable: this.isFieldChangeable(field),
              changeForm: this.onChange,

              // Dynamic linked dictionary callbacks
              onEmptyDictionary: orUndef<() => void>(
                fieldProps.bindDictionary || fieldProps.onEmptyDictionary,
                () => fieldProps.onEmptyDictionary || (() => this.onEmptyDictionary(field))
              ),
              onLoadDictionary: orUndef<(items: AnyT) => void>(
                fieldProps.bindDictionary || fieldProps.onLoadDictionary,
                () => fieldProps.onLoadDictionary || ((items0) => this.onLoadDictionary(field, items0))
              ),

              // Predefined options
              ...predefinedOptions,

              // The fields props have a higher priority
              ...defValuesFilter<IFieldProps, IFieldProps>({
                label: fieldProps.label,
                type: fieldProps.type,
                placeholder: fieldProps.placeholder,
                prefixLabel: fieldProps.prefixLabel,
              }),
            }
          );
        },
        (child) => Field.isPrototypeOf(child.type),
        (child) => (child.props as IFieldProps).rendered,
      )
    );

    return (
      <form
        ref={this.formRef}
        autoComplete='off'
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        className={this.getFormClassName()}>
        {
          props.compact
            ? nodes
            : (
              <div className='rac-form-body-wrapper'>
                <div className='rac-form-body'>
                  {nodes}
                </div>
              </div>
            )
        }
        {this.formActionsWrapperElement}
      </form>
    );
  }

  /**
   * @stable [12.09.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (this.props.validateOnMount) {
      this.propsOnValid();
    }
  }

  /**
   * @stable - 11.04.2018
   * @param {IApiEntity} apiEntity
   */
  public submit(apiEntity: IApiEntity): void {
    const props = this.props;
    if (props.onSubmit) {
      props.onSubmit(apiEntity);
    }
  }

  /**
   * @stable [23.12.2019]
   * @returns {IApiEntity}
   */
  public get apiEntity(): IApiEntity {
    const props = this.props;
    const {entity, originalEntity} = props;
    return mapApiEntity({changes: props.form.changes, entity, originalEntity});
  }

  /**
   * @stable [25.02.2019]
   * @returns {string}
   */
  private getFormClassName(): string {
    const props = this.props;
    return joinClassName(
      'rac-form',
      'rac-flex',
      'rac-flex-column',
      'rac-flex-no-shrink',
      props.full !== false && 'rac-flex-full',
      props.className
    );
  }

  private onChange(name: string, value: AnyT): void {

    if (this.props.onChange) {
      this.props.onChange({name, value});
    }
    this.propsOnValid();
  }

  /**
   * @stable [04.08.2018]
   * @param {IField} field
   */
  private onEmptyDictionary(field: IField): void {
    const props = this.props;

    if (props.onEmptyDictionary) {
      props.onEmptyDictionary(field.props.bindDictionary, this.apiEntity);
    }
  }

  private onLoadDictionary(field: IField, items: AnyT): void {
    const props = this.props;

    if (props.onLoadDictionary) {
      props.onLoadDictionary(items, field.props.bindDictionary);
    }
  }

  /**
   * @stable [03.12.2019]
   */
  private propsOnValid(): void {
    const props = this.props;
    if (isFn(props.onValid)) {
      props.onValid(props.manualValidation || this.formRef.current.checkValidity());
    }
  }

  private doSubmit(): void {
    this.onSubmit();
  }

  private onSubmit(event?: IBaseEvent): void {
    cancelEvent(event);

    const props = this.props;
    const apiEntity = this.apiEntity;
    if (props.onBeforeSubmit) {
      if (props.onBeforeSubmit(apiEntity) !== false) {
        this.submit(apiEntity);
      }
    } else {
      this.submit(apiEntity);
    }
  }

  private onReset(event: IBaseEvent): void {
    cancelEvent(event);

    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  private isFormValid(): boolean {
    return isFormEntityValid(this.props);
  }

  /**
   * @stable [03.08.2018]
   * @returns {boolean}
   */
  private isFormSubmittable(): boolean {
    return isFormSubmittable(this.props);
  }

  /**
   * @stable [15.02.2019]
   * @returns {boolean}
   */
  private isFormResettable(): boolean {
    return isFormResettable(this.props);
  }

  /**
   * @stable [25.02.2019]
   * @returns {boolean}
   */
  private isFormOfNewEntity(): boolean {
    return isFormOfNewEntity(this.props);
  }

  /**
   * @stable [25.09.2019]
   * @returns {boolean}
   */
  private isFormBusy(): boolean {
    return isFormWrapperEntityInProgress(this.props);
  }

  /**
   * @stable [25.09.2019]
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldReadOnly(field: IField): boolean {
    return isFormFieldReadOnly(this.props, field.props);
  }

  /**
   * @stable - 11.04.2018
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldDisabled(field: IField): boolean {
    return isFormFieldDisabled(this.props, field.props);
  }

  /**
   * @stable [16.11.2018]
   * @param {IField} field
   * @returns {boolean}
   */
  private isFieldChangeable(field: IField): boolean {
    return isFormFieldChangeable(this.props, field.props);
  }

  /**
   * @stable [16.11.2019]
   * @param {IField} field
   * @returns {AnyT}
   */
  private getFieldValue(field: IField): AnyT {
    return getFormFieldValue(this.props, field.props);
  }

  /**
   * @stable [16.11.2019]
   * @param {IField} field
   * @returns {AnyT}
   */
  private getFieldOriginalValue(field: IField): AnyT {
    return getFormFieldOriginalValue(this.props, field.props);
  }

  /**
   * @stable [24.12.2019]
   * @param {IFieldProps} props
   * @param {IFieldProps} defaultProps
   * @returns {AnyT}
   */
  private getFieldDisplayValue(props: IFieldProps, defaultProps: IFieldProps): AnyT {
    return getFormFieldDisplayValue(this.props, props, defaultProps);
  }

  /**
   * @stable [11.09.2019]
   * @param {IField} field
   * @returns {IFieldProps}
   */
  private getPredefinedFieldProps(field: IField): IFieldProps {
    const props = this.fieldsOptions[field.props.name];

    let resultProps: IFieldProps;
    if (isString(props)) {
      resultProps = {label: props as string};
    } else if (isFn(props)) {
      resultProps = (props as (field) => IFieldProps)(field);
    } else {
      resultProps = props as IFieldProps;
    }
    return resultProps;
  }

  /**
   * @stable - 01.04.2018
   * @returns {IEntity}
   */
  private get form(): IEditableEntity<IEntity> {
    return this.props.form;
  }

  /**
   * @stable [25.02.2019]
   * @returns {JSX.Element}
   */
  private get formActionsWrapperElement(): JSX.Element {
    const props = this.props;
    return ifNotFalseThanValue<JSX.Element>(
      props.actionsRendered,
      () => (
        <FlexLayout
          full={false}
          row={true}
          justifyContentCenter={true}
          className='rac-form-actions'>
          {this.formActionsElement}
        </FlexLayout>
      )
    );
  }

  /**
   * @stable [25.02.2019]
   * @returns {JSX.Element}
   */
  private get formActionsElement(): JSX.Element {
    const props = this.props;
    const submitConfiguration = props.submitConfiguration || {};
    const messages = this.settings.messages;
    const actions = notNilValuesArrayFilter<IButtonProps>(
      orNull(
        props.resetActionRendered,
        (): IButtonProps => ({
          type: 'reset',
          icon: props.resetIcon || 'close',
          disabled: !this.isFormResettable(),
          text: props.resetText || messages.reset,
          ...props.buttonConfiguration,
          ...props.resetConfiguration,
          onClick: null,
        })
      ),
      {
        type: 'submit',
        icon: this.isFormValid() ? (props.submitIcon || 'ok-filled') : 'exclamation',
        raised: true,
        disabled: !this.isFormSubmittable(),
        progress: this.isFormBusy(),
        error: !R.isNil(this.form.error),
        text: props.submitText || (this.isFormOfNewEntity() ? messages.create : messages.save),
        ...props.buttonConfiguration,
        ...submitConfiguration,
        onClick: orNull(submitConfiguration.type === 'button', () => this.doSubmit),
      }
    );
    return (
      <React.Fragment>
        {(isFn(props.actionsFactory) ? props.actionsFactory(actions) : actions)
          .map(
            (action, index) => (
              <Button
                key={`form-action-${action.text || index}`}
                {...action}
                onClick={ifNotNilThanValue(action.onClick, () => () => action.onClick(this.apiEntity))}/>
            )
          )}
      </React.Fragment>
    );
  }
}
