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
  cloneReactNodes,
  defValuesFilter,
  getFormFieldDisplayValue,
  getFormFieldOriginalValue,
  getFormFieldValue,
  ifNotNilThanValue,
  isActionsRendered,
  isCompact,
  isFn,
  isFormValid,
  isFormFieldReadOnly,
  isFormWrapperEntityInProgress,
  isString,
  isValidateOnMount,
  joinClassName,
  mapApiEntity,
  notNilValuesArrayFilter,
  orNull,
  orUndef,
  selectEditableEntityChanges,
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

export class Form extends BaseComponent<IFormProps> implements IForm {

  public static readonly defaultProps: IFormProps = {
    form: INITIAL_FORM_ENTITY,
  };

  @lazyInject(DI_TYPES.FieldsOptions) private fieldsOptions: IFieldsConfigurations;

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

  /**
   * @stable [30.01.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const nodes = this.formNodes;

    return (
      <form
        ref={this.selfRef}
        autoComplete='off'
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        className={this.formClassName}>
        {
          isCompact(props)
            ? nodes
            : (
              <div className='rac-form__body'>
                {nodes}
              </div>
            )
        }
        {
          isActionsRendered(props) && (
            <div className='rac-form__actions'>
              {this.formActionsElement}
            </div>
          )
        }
      </form>
    );
  }

  /**
   * @stable [30.01.2020]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (isValidateOnMount(this.props)) {
      this.propsOnValid();
    }
  }

  /**
   * @stable [30.01.2020]
   * @param {IApiEntity} apiEntity
   */
  public submit(apiEntity: IApiEntity): void {
    const props = this.props;
    if (isFn(props.onSubmit)) {
      props.onSubmit(apiEntity);
    }
  }

  /**
   * @stable [30.01.2020]
   * @returns {IApiEntity}
   */
  public get apiEntity(): IApiEntity {
    const props = this.props;
    const {entity, originalEntity} = props;
    return mapApiEntity({changes: selectEditableEntityChanges(props), entity, originalEntity});
  }

  /**
   * @stable [30.01.2020]
   * @returns {HTMLFormElement}
   */
  public getSelf(): HTMLFormElement {
    return super.getSelf() as HTMLFormElement;
  }

  /**
   * @stable [25.02.2019]
   * @returns {string}
   */
  private get formClassName(): string {
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
      props.onValid(props.manualValidation || this.getSelf().checkValidity()); // TODO manualValidation -> valid
    }
  }

  /**
   * @stable [30.01.2020]
   */
  private doSubmit(): void {
    this.onSubmit();
  }

  private onSubmit(event?: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);

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

  /**
   * @stable [30.01.2020]
   * @param {IBaseEvent} event
   */
  private onReset(event: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);

    const onReset = this.props.onReset;
    if (isFn(onReset)) {
      onReset();
    }
  }

  /**
   * @stable [30.01.2020]
   * @returns {boolean}
   */
  private isFormValid(): boolean {
    return isFormValid(this.props);
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

  private get formNodes(): React.ReactNode[] {
    return (
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
  }
}
